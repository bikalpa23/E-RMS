const mongoose = require("mongoose")


exports.connectDatabase = async()=>{
    // connecting to database 


//  await mongoose.connect("mongodb+srv://bikalpa:bikalpa@cluster0.jampnhi.mongodb.net/?retryWrites=true&w=majority")
 await mongoose.connect(process.env.MONGO_URI)
 console.log("Database connected successfully")
}