require("dotenv").config()
const express = require("express")
const { TodoModel } = require("../models/todo.model")
const todosRouter = express.Router()


todosRouter.get("/",async(req,res) => {
    const {userID} = req.body;
    const status = req.body
    console.log(userID)
    try{
        if(status){
            
        const allTodos = await TodoModel.find({userID:userID,status:status})
        res.send(allTodos)
        }else{
            
        const allTodos = await TodoModel.find({userID:userID})
        res.send(allTodos)
        }
    }catch(e){
        res.send(e.message)
    }
})

todosRouter.post("/create",async (req,res) =>{
    try{
        const payload = req.body
        await TodoModel.create(payload)
        res.send({res:"Your Todos created"})
    }catch(e){
        console.log(e.message);
    }
})


todosRouter.patch("/update/:todoID", async (req,res) => {
    const todoID = req.params.todoID
    const payload = req.body;
    try{
        const todo = await TodoModel.findOne({_id:todoID})
        if(todo.userID === req.body.userID){
            await TodoModel.findByIdAndUpdate({_id:todoID},payload)
            res.send({"MSG":"Todo Updated Sucessfully"})

        }else{
            res.send({"Msg":"Not Authorized"})
        }

   
    }
catch(e){
    res.send(e.message)
}
    
})

todosRouter.delete("/delete/:todoID",async (req,res) => {
    const todoID = req.params.todoID
    try{
        const todo = await TodoModel.findOne({_id:todoID})
        const userID = req.body.userID
        console.log("userID",userID)
        if(userID !== todo.userID){
            res.send({"MSG":"Not Authorized"})
        }else{
            await TodoModel.findByIdAndDelete({_id:todoID})
            res.send({"MSG":"Deleted Sccessfully"})
        }

    }catch(e){
        console.log(e)
    res.send("NOT Updated values")
        
    }
})

module.exports = {todosRouter}