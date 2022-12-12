require("dotenv").config()
const express = require("express")
const {connect} = require("./config/db")
const { autheticate } = require("./Middlewares/authenticate")
const { todosRouter } = require("./Router/todo.router")
const {userRouter} = require("./Router/user.router")

const app = express()

app.use(express.json())

app.use("/users",userRouter)

app.get("/",(req,res) => {
    res.send(" Welcome Home")
})

app.use(autheticate)
app.use("/todos",todosRouter)


app.listen(process.env.PORT,async() => {
    try{
        await connect()
        console.log("Connection to Sucess to DB")

    }catch(e){
        console.log(e);
        console.log("Connection failed Database");
    }
    console.log(`http:localhost:${process.env.PORT}`)
})