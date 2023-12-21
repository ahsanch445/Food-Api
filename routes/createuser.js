const express = require("express")
const passport = require("passport")
const router = express.Router()
const localpass= require("passport-local")
const usermodel = require("../models/usermodel")
const fetchDataFromMongoDB= require("../models/data")

const   Order = require ("../models/Order")
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


passport.use(new localpass({
    usernameField: 'email',
    usernameQueryFields: ['email']
  }, usermodel.authenticate()));


// Updated registration route
router.post("/register", async (req, res) => {
  try {
      const { fullname, username,email, password } = req.body;
      console.log(req.body); 
    

      const newUser = new usermodel({
        username:username,
          email: email,
          fullname: fullname,
         
      });

      usermodel.register(newUser, password, async (err, user) => {
          if (err) {
              console.error('Registration failed:', err);
              return res.status(500).json({ message: 'Registration failed' });
          }

          passport.authenticate("local")(req, res, function () {
              return res.status(200).json({ message: 'Registration successful' });
          });
      });
  } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
});

// Updated login route
router.post("/login", passport.authenticate('local'), (req, res) => {
  res.status(200).json({ message: 'Login successful' });
});

router.post('/foodData', async (req, res) => {


    try {
    
        await fetchDataFromMongoDB();

        const foodData = global.fooddata;
        const categoryData = global.categorydata;

        res.send([ foodData, categoryData ]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server Error" });
    }
});

router.post('/orderData', async (req, res) => {
  try {
     let data = req.body.order_data;
      data.splice(0, 0, { Order_date: req.body.order_date });

  
      let existingUser = await Order.findOne({ 'email': req.body.email });

      if (!existingUser) {
        
          await Order.create({
              email: req.body.email,
              order_data: [data]
          });
          res.json({ success: true, message: 'New user created' });
      } else {
      
          await Order.findOneAndUpdate(
              { email: req.body.email},
              { $push: { order_data: data } }
          );
          res.json({ success: true, message: 'Data updated for existing user' });
      }
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});


router.post('/myOrderData', async (req, res) => {
    try {
    
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
      
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});







  module.exports = router;





    