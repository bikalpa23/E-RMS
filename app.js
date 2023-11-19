const express = require("express")
const { connectDatabase } = require("./database/database")
const User = require("./model/userModel")
const app = express()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//Node to use DOTENV
require("dotenv").config()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Database connect
connectDatabase()
//test api to check if server is live or not
app.get("/", (req, res) => {
    res.status(200).json({
        status: 200,
        message: "I am Here"
    })
})

//register User API
app.post("/register", async (req, res) => {
    const { email, password, phoneNumber, username } = req.body
    if (!email || !password || !phoneNumber || !username) {
        return res.status(400).json({
            message: "Please provide the required information"
        })
    }

    //Check if the user alresdy exists or not

    const userFound = await User.find({ userEmail: email })
    if (userFound.length > 0) {
        return res.status(400).json({
            message: "User with the same email exists"
        })
    }

    //else
    await User.create({
        userName: username,
        userPhoneNumber: phoneNumber,
        userEmail: email,
        userPassword: bcrypt.hashSync(password, 12)
    })
    res.status(201).json({
        message: "User created sucessfully"
    })
})


//Login User API
app.post(".login", async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        message: "Please provide email and password"
    }


    // Check if that email user exixts or not
    const userFound = await User.find({ userEmail: email })
    if (userFound.length == 0) {
        return res.status(404).json({
            message: "User with that mail already exists"
        })
    }
    //Password check
    const isMatched = bcrypt.compareSync(password, userFound[0], userPassword)
    if (isMatched) {

        //generate Token
       const token = jwt.sign({id:userFound[0]._id},"process.env.SECRET_KEY",{
        expiresIn:"30d"
       })



        res.status(200).json({
            message: "User logged in Sucessfully"
        })
    } else {
        res.status(404).json({
            message: "Invalid Password"
        })
    }
})


const PORT = process.env.PORT
//listen server
app.listen(PORT, () => {
    console.log("Server started at Port 3000")
})