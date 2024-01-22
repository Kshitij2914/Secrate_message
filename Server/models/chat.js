const mongoose = require("mongoose")

const chatSchema =  new mongoose.Schema({
    name:{type:String, required:1},
    id:{type:String, required:1},
    message:{type:String, required:1}
})

const chatModel = mongoose.model("chat",chatSchema)

module.exports = chatModel