const client = require('../index');
const Schema = require('../models/welcomeChannel');
const canvas = require('discord-canvas');
const { MessageAttachment } = require('discord.js')

client.on('guildMemberAdd', async(member) => { // guildMemberAdd means member join karna and ye pure example se tum goodbye khud bana sakte guildMemberRemove replace kardo bss
    Schema.findOne({ Guild: member.guild.id }, async(e, data) => { // Schema.findOne ka mtlb mongoose dhundega ki konse channel pa dalna hai and then dhund ke dal dega 
        if(!data) return;// dhund liya data so abhi ye apna welcome image bhej dega
        const user = member.user;// define kiya hai user ko
        const image = new canvas.Welcome()// abhi hamne install kiya na discord-canvas to const image hamne choose kiya discord canvas ka format and ye canvas.Welcome ko canvas.Goodbye kardega to ye goodbye msg dalega 
        .setUsername(user.username)// username for the member who joins
        .setDiscriminator(user.discriminator)//id
        .setMemberCount(member.guild.memberCount)// mtlb jo bhi join karega uska join number konsa ha pata chal jayega 
        .setGuildName(member.guild.name)// name hoga user ka
        .setAvatar(user.displayAvatarURL({ format: "png" }))// this is the format for the welcome img png jpeg dono kar sakte but png rehne dena 
        .setColor("border", "#5F28F4")//border colour change karlena
        .setColor("username-box", "#5F28F4")//usernamebox colour change karlena
        .setColor("discriminator-box", "#5F28F4")//discriminate box colour change karlena
        .setColor("message-box", "#5F28F4")//message box colour change karlena
        .setColor("title", "#5F28F4")// title colour
        .setColor("avatar", "#5F28F4")//avatar circle colour change karlena
        .setBackground("https://media.discordapp.net/attachments/896820933183037492/901818684044087347/SPOILER_5am-train-19201080.jpg")// background image
        .toAttachment();// isse change na karna

        const attachment = new MessageAttachment((await image).toBuffer(), "goodbye-image.png");// don't change

        const channel = member.guild.channels.cache.get(data.Channel);// ye channel dhund raha kaha bhejna hai ye chutiyapa
        channel.send({ files: [attachment] })// bhej diya..
    })
})
