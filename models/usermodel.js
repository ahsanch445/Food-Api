const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");



const uri = "mongodb://ahsan:1pL6d3IIA0QLVV1l@ac-txmjddb-shard-00-00.izszlxx.mongodb.net:27017,ac-txmjddb-shard-00-01.izszlxx.mongodb.net:27017,ac-txmjddb-shard-00-02.izszlxx.mongodb.net:27017/foodi?ssl=true&replicaSet=atlas-b3wpp9-shard-0&authSource=admin&retryWrites=true&w=majority";

async function connectDB() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });




        console.log("Database connected successfully");




        
        const fooddata = await mongoose.connection.db.collection("fooddata").find({}).toArray()
        const categorydata = await mongoose.connection.db.collection("CategoryData").find({}).toArray()

        global.fooddata = fooddata
        global.categorydata = categorydata
    } catch (error) {
        console.error("Error connecting to database:", error);
        console.error("Database connection failed");
    }
}

connectDB();




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

