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
    const afkreason = args.join(" ") || 'No reason!';// abhi slash ka alag hai ye iska mtlb hai reason dhund na always remember if kuch content import karoge to use this
    db.findOne({ Guild: message.guildId, Member: message.author.id }, async(err, data) => { //ye guild id and author id dhundega so data store kare 
      if(data) { //and once data is stored
        return;// wapas ayega
      } else {// and then
        Data = new db({//new data banega and uspe iska server id and user id store hoga also afk reason jo hamne var banaya tha udhar se reason leke store karega so banda wapas ana pa afk hata de
          Guild: message.guildId,
          Member: message.author.id,
          Content: afkreason,
          TimeAgo: Date.now()// date/time yaad rakhega
        })
        Data.save()// and then data save kardega and embed send kardega
        const afksave = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`You have been set to AFK\n**Reason:** ${afkreason}`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        
        message.channel.send({ embeds: [afksave]})
      }
    })

}}
