const mongoose = require("mongoose")

const userSchema =  new mongoose.Schema({
    name:{type:String, required:1},
    email:{type:String, required:1},
    password:{type:String, required:1},
    chance:{type:Boolean, default:true}
})

const userModel = mongoose.model("register",userSchema)

module.exports = userModel