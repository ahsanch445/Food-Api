const mongoose = require("mongoose")



const plm = require("passport-local-mongoose")


async function connectDB() {
    try {
  
            await mongoose.connect("mongodb+srv://ahsanch445:<ahsanchrr>@cluster0.lgme4dm.mongodb.net/mernstack?retryWrites=true&w=majority")
    
            console.log("Database connected successfully");
    
            // Any additional code that depends on the database connection goes here...
    
 
   

        const fooddata = await mongoose.connection.db.collection("fooddata").find({}).toArray()
        const categorydata = await mongoose.connection.db.collection("CategoryData").find({}).toArray()

        global.fooddata = fooddata
        global.categorydata = categorydata
    }
       
 catch (error) {
        console.error("Error connecting to database:", error)
    }
}

connectDB()




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

