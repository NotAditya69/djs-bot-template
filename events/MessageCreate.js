const client = require('../index')

client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild) return 
    if (!message.content.startsWith(client.prefix)) return;
    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(" ");
    const Discord = require('discord.js')
    let command = client.commands.get(cmd)

    if (!command) command = client.commands.get(client.aliases.get(cmd)) // I have already added it, then add
    if (command) {
        //User Perms hoti
        if (!message.member.permissions.has(command.UserPerms || [])) return message.channel.send(`You need \`${command.UserPerms || []}\` Permissions`) // Added this

        //Bot Perms hoti
        if (!message.guild.me.permissions.has(command.BotPerms || [])) return message.channel.send(`I need \`${command.BotPerms || []}\` Permissions`)

        await command.run(client, message, args, Discord)
    } 
}) 