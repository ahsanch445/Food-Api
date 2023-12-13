const mongoose = require("mongoose")
var express = require('express');
var router = express.Router();



async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://ahsanch445:ahsanchrr@cluster0.lgme4dm.mongodb.net/?retryWrites=true&w=majority")
        console.log("Database connected successfully")

        const fooddata = await mongoose.connection.db.collection("fooddata").find({}).toArray()
        const categorydata = await mongoose.connection.db.collection("CategoryData").find({}).toArray()

        global.fooddata = fooddata
        global.categorydata = categorydata

       
    } catch (error) {
        console.error("Error connecting to database:", error)
    }
}

connectDB()

module.exports = router