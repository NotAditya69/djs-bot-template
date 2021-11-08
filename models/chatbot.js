const mongoose = require('mongoose')

const chatbot = new mongoose.Schema({
    guild: String,
    channel: String
})

module.exports = mongoose.model("chatbot", chatbot)
