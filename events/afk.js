const db = require('../models/afk');
const { MessageEmbed } = require('discord.js');
const client = require('../index')

client.on('messageCreate', async(message) => {
  if(message.author.bot) return;
  db.findOne({ Guild: message.guild.id, Member: message.author.id }, async(err, data) => {
    if(err) throw err; 
    if(data) {
      
      const afk = new MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`Your AFK has been removed \n${data.Content} - ${moment(parseInt(data.TimeAgo)).fromNow()}`) 
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
     
      message.channel.send({ embeds: [afk]})
data.delete() 
    } else return; 
  })
  
  if(message.mentions.members.first()) { 

    db.findOne({ Guild: message.guild.id, Member: message.mentions.members.first().id }, async(err, data) => { 
      if(err) throw err; 
      if(data) { 
        const member = message.guild.members.cache.get(data.Member);
        const afk = new MessageEmbed() 
        .setColor('RANDOM')
        .setDescription(`${member.user.tag} is currently AFK\n**Reason:** ${data.Content} - ${moment(parseInt(data.TimeAgo)).fromNow()}`)
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))  
        .setTimestamp()
        
        message.channel.send({ embeds: [afk]})
      } else return; 
    })
  }
