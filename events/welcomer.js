const client = require('../index');
const Schema = require('../models/welcomeChannel');
const canvas = require('discord-canvas');
const { MessageAttachment } = require('discord.js')

client.on('guildMemberAdd', async(member) => {
    Schema.findOne({ Guild: member.guild.id }, async(e, data) => {  
        if(!data) return;
        const user = member.user;
        const image = new canvas.Welcome() 
        .setUsername(user.username)// username for the member who joins
        .setDiscriminator(user.discriminator)
        .setMemberCount(member.guild.memberCount)
        .setGuildName(member.guild.name)
        .setAvatar(user.displayAvatarURL({ format: "png" }))
        .setColor("border", "#5F28F4")
        .setColor("username-box", "#5F28F4")
        .setColor("discriminator-box", "#5F28F4")
        .setColor("message-box", "#5F28F4")
        .setColor("title", "#5F28F4")
        .setColor("avatar", "#5F28F4")
        .setBackground("https://media.discordapp.net/attachments/896820933183037492/901818684044087347/SPOILER_5am-train-19201080.jpg")
        .toAttachment();

        const attachment = new MessageAttachment((await image).toBuffer(), "welcome-image.png");

        const channel = member.guild.channels.cache.get(data.Channel);
        channel.send({ files: [attachment] })
    })
})
