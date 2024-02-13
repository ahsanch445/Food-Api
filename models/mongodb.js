const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = "mongodb://ch:Dx1UdK4BFB8xazJd@ac-yis9rym-shard-00-00.u6xbqf1.mongodb.net:27017,ac-yis9rym-shard-00-01.u6xbqf1.mongodb.net:27017,ac-yis9rym-shard-00-02.u6xbqf1.mongodb.net:27017/ffood?ssl=true&replicaSet=atlas-13hypp-shard-0&authSource=admin&retryWrites=true&w=majority";
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
