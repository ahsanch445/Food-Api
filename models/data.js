const mongoose = require('mongoose');

const fetchDataFromMongoDB = async () => {
    const fooddata = await mongoose.connection.db.collection("fooddata").find({}).toArray()
    const categorydata = await mongoose.connection.db.collection("CategoryData").find({}).toArray()

    global.fooddata =fooddata
    global.categorydata = categorydata
};

module.exports = fetchDataFromMongoDB;
