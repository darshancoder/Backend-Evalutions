const jwt = require("jsonwebtoken")
require("dotenv").config()

const autheticate = (req,res, next) => {
    const token = req.headers?.authorization?.split(" ")[1]
    if(token){
        const decoded = jwt.verify(token,process.env.key)
        if(decoded){
            const userID = decoded.userID
            req.body.userID = userID
            next()
        }else{
            res.send("Please Login")
        }

    }else{
        res.send("Login First")

    }
}


module.exports = {autheticate}