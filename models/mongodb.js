const mongoose = require('mongoose');

const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected successfully");
          
   
        // Additional logic after database connection if needed
    } catch (error) {
        console.error("Error connecting to database:", error);
        console.error("Database connection failed");
    }
};

module.exports = {connectDB};
