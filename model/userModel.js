const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    userEmail: {
        type: String,
        // required: true
        //alternative Method
        required: [true, 'UserEmail must be provided']
    },
    userPhoneNumber: {
        type: String,
        required: [true, 'PhoneNumber must be provided']
    },
    userName:{
        type: String,
        required: [true, 'UserName must be provided']
    },
    userPassword: {
        type: String,
        required: [true, 'UserPass must be provided']
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    }
})

const User = mongoose.model("User",userSchema)
module.exports = User