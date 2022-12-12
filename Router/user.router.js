require("dotenv").config()
const express = require("express")
const {UserModel} = require("../models/user.model")
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

userRouter.get("/",async (req,res) =>{
    const userData = await UserModel.find()
    res.send(userData)

});

userRouter.post("/signup",async(req,res) => {
    const {email,password} = req.body;
    const users = await UserModel.find({email})
    if(users.length > 0){
        res.send({"res":"User alreday Exits"})
    }else{
        try{
            bcrypt.hash(password, 8,async (e,hash) => {
                const newUser = new UserModel({
                    email:email,
                    password:hash
                })
                await newUser.save()
            })
            res.send({"Res":"users Created"})
        }catch(e){
            res.send({"res":e.message})
        }
    }
})

userRouter.post("/login",async (req,res) => {
    const {email,password} = req.body
    try{
        const user = await UserModel.findOne({email})
    if(user){
        const id = user._id;
        const hasPassword = user.password
        bcrypt.compare(password,hasPassword, function(e,decoded) {
            if(decoded == true){
                const token = jwt.sign({userID:id},process.env.key,{
                    expiresIn:"1h",
                })
                res.send({"res":"login Success",token:token})
            }
        })
    }else{
        res.send({res:"Please try again!"})
    }
    }catch(e){
        res.send({"MSG":"Something is Error"})
    }
})


module.exports = {userRouter}