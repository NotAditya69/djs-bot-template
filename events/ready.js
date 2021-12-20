const Discord = require("discord.js") // discord imported ez 
const client = require("../index") // client ko index so import karliya cuz client is defined as client constructor

client.on("ready", () => {
    console.log(`${client.user.username} Is Now Online MFS!`)
const activity = [
    "Your mom",
    "Your dad",
    "Anurag's PP",
]
const type = [
    "WATCHING",
    "LISTENING",
    "COMPETING"
]
setInterval(() => client.user.setPresence({
    activities: [{
        name: activity[Math.floor(Math.random * activity.length)]
        type: type[Math.floor(Math.random * type.length)]
}],
                                          status: 'dnd'
}), 5000)
})

/* Your Mom */
