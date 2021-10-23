const Discord = require(`discord.js`);
const { MessageEmbed } = require('discord.js');

/**
 * @param {Discord.Client} client
 */
module.exports = (client) => {
    client.on(`ready`, () => {
        const embed = new MessageEmbed()
        .setTitle('BOT STATUS')
        .setDescription(`**Status**: ${client.user.tag} is now online!\n**Ping**: ${client.ws.ping}`)
        .setFooter('Owner: Aditya')
        .setColor('RANDOM')
        client.channels.cache.get(`900664688768057385`).send({embeds: [embed]});
        console.log(`${client.user.tag} is now online!✅`)

        setInterval(() => {
            client.user.setPresence({ activities: [{ name: `in ${client.guilds.cache.size} servers! | ${client.prefix}help` }] });
        }, 10000)

        const { inspect } = require("util")
        process.on(`unhandledRejection`, (reason, promise) => {
            client.channels.cache.get(`899160781147496499`).send(`**UnhandledRejection**\n**Reason:**\n\`\`\`\n${inspect(reason, { depth: 0 })}\n\`\`\` Promise:\n\`\`\`\n${inspect(promise, { depth: 0 })}\n\`\`\``)
        })
        process.on(`uncaughtException`, (err, origin) => {
            client.channels.cache.get(`899160781147496499`).send(`**UncaughtException**\n**Error:**\n\`\`\`\n${inspect(err, { depth: 0 })}\n\`\`\`\nType: ${inspect(origin, { depth: 0 })}`)
        })
        process.on(`warning`, (warn) => {
            client.channels.cache.get(`899160781147496499`).send(`**Warning\n**Warn:**\n\`\`\`\n${warn.name}\n${warn.message}\n\n${warn.stack}\n\`\`\``)
        })

    })
}

