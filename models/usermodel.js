const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");




// Define the schema and plugin
const userschema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    }
});

// Apply the passport-local-mongoose plugin
userschema.plugin(plm);

// Create and export the model
const UserModel = mongoose.model("user", userschema);
module.exports = UserModel;

// Call the function to connect to the database

