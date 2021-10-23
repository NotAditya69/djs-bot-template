const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'ping',
    description: 'returns websocket ping',
    aliases: [],
    /*
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        const hoti = new MessageEmbed()
        .setTitle('PING')
        .setDescription(`${client.ws.ping}`)
        .setColor('RANDOM')
        message.channel.send({ embeds: [hoti] })
    }
}