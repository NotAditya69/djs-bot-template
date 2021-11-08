const fetch = require('node-fetch');
const client = require('../index');
const {
    findOne
} = require('../models/chatbot');
const Schema = require('../models/chatbot');

client.on('messageCreate', async (message) => {
    try{
    if (message.author.bot) return
    await Schema.findOne({
        guild: message.guild.id
    }, async (err, data) => {
        if (!data) return;
        if (err) throw err;
        const Epikchannel = data.channel


        if (message.channel.id === Epikchannel) {
            fetch(`https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.author.id}&yr0n57JXpCy7aXlzFmMchuas`)
                .then(response => response.json())
                .then(data => {
                    message.reply(`${data.response}`)
                })
        }
    })
} catch (e) {
    console.log(e)
  };
})
