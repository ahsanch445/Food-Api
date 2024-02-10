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


passport.use(new localpass(usermodel.authenticate()));


router.post("/register", async (req, res) => {
    try {
      const { fullname, username, email, password } = req.body;
      console.log(req.body);
  
      const existingUser = await usermodel.findOne({ 'username': username });
  
      if (existingUser) {
        // Handle duplicate username
        return res.status(409).json({ "code": 409, "message": "Username already exists" });
      }
  
      const newUser = new usermodel({
        username: username,
        email: email,
        fullname: fullname,
      });
  
      usermodel.register(newUser, password, async (err, user) => {
        if (err) {
          console.error('Registration failed:', err);
  
          // Check if the error is due to a duplicate key (username)
          if (err.name === 'UserExistsError') {
            return res.status(409).json({ "code": 409, "message": "Username already exists" });
          }
  
          return res.status(500).json({ message: 'Registration failed', error: err.message });
        }
  
        passport.authenticate("local")(req, res, function () {
          return res.status(200).json({ message: 'Registration successful' });
        });
      });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
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

  
      let existingUser = await Order.findOne({ 'username': req.body.username });

      if (!existingUser) {
        
          await Order.create({
            username: req.body.username,
              order_data: [data]
          });
          res.json({ success: true, message: 'New user created' });
      } else {
      
          await Order.findOneAndUpdate(
              { username: req.body.username},
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
        let eId = await Order.findOne({ 'username': req.body.username})
      
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});







  module.exports = router;





    