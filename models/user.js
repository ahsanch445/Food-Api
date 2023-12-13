const mongoose = require("mongoose")
const plm = require("passport-local-mongoose")
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
})

userschema.plugin(plm)

module.exports = mongoose.model("user", userschema)