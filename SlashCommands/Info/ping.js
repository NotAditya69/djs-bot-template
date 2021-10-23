const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "returns websocket ping",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const hoti = new MessageEmbed()
        .setTitle('PING')
        .setDescription(`${client.ws.ping}`)
        .setColor('RANDOM')
        interaction.followUp({embeds: [hoti] })
    },
};