const mongoose = require('mongoose');

const fetchDataFromMongoDB = async () => {
    try {
        const fooddata = await mongoose.connection.db.collection("fooddata").find({}).toArray();
        const categorydata = await mongoose.connection.db.collection("CategoryData").find({}).toArray();

        return { fooddata, categorydata };
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw new Error("Database connection failed");
    }
};

module.exports = fetchDataFromMongoDB;
