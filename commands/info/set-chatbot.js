const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const Rambo = require('../../models/chatbot')

module.exports = {
    name: 'set-chatbot',
    desciption: 'Sets chatbot which interact with users and chat',
    aliases: ['chatbot'],
    /*
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        const Rambochannel = message.mentions.channels.first()
        if (!Rambochannel) return message.reply('Please tell me a channel!');

        Rambo.findOne({
            guild: message.guild.id
        }, async (err, data) => {
            if (data) data.delete()
            new Rambo({
                guild: message.guild.id,
                channel: Rambochannel.id,
            }).save();
            message.channel.send(`Chatbot channel set as ${RamboChannel}`)
        })
    }
}
