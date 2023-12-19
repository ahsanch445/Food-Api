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


passport.use(new localpass(usermodel.authenticate()))


// Updated registration route
router.post("/register", async (req, res) => {
  try {
      const { fullname, username,email, password } = req.body;
      console.log(req.body); 
      // Check if the 'email' field is provided

      const newUser = new usermodel({
        username:username,
          email: email,
          fullname: fullname,
          
          // You may add other necessary fields here
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
        // Call the function to fetch data from MongoDB
        await fetchDataFromMongoDB();

        // Access the fetched data from global variables or modify as needed
        const foodData = global.fooddata;
        const categoryData = global.categorydata;

        // Respond with the fetched data or perform further operations
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

  
      let existingUser = await Order.findOne({ 'username': req.body.username });

      if (!existingUser) {
        
          await Order.create({
              username: req.body.username,
              order_data: [data]
          });
          res.json({ success: true, message: 'New user created' });
      } else {
      
          await Order.findOneAndUpdate(
              { username: req.body.username },
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
    
        console.log(req.body.username)
        let eId = await Order.findOne({ 'username': req.body.username })
      
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});







  module.exports = router;





    