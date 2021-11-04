const {
    MessageEmbed
} = require('discord.js')
const db = require('../../models/afk');
module.exports = {
    name: 'afk',
    description: 'Set Yourself in AFK',
     /*
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
    const afkreason = args.join(" ") || 'No reason!';
    db.findOne({ Guild: message.guildId, Member: message.author.id }, async(err, data) => { 
      if(data) { 
        return;
      } else {
        Data = new db({
          Guild: message.guildId,
          Member: message.author.id,
          Content: afkreason,
          TimeAgo: Date.now()
        })
        Data.save()
        const afksave = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`You have been set to AFK\n**Reason:** ${afkreason}`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        
        message.channel.send({ embeds: [afksave]})
      }
    })

}}
