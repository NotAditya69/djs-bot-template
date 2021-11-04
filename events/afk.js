const db = require('../models/afk');

const { MessageEmbed } = require('discord.js');
const client = require('../index')

client.on('messageCreate', async(message) => {
  if(message.author.bot) return;
  db.findOne({ Guild: message.guild.id, Member: message.author.id }, async(err, data) => {// abhi ye wapas aya to haam abhi iska server id and user id dhundenge
    if(err) throw err; //then isse error ke hisab se log karenge bcuz hamne async ke baad err and data dala simple bhasa mai bolu to ye error hai and isse haam atche kam ke liye use karenge
    if(data) {// dekho aab data { means agar data dhund ke iska id and server id mile to haam embed bhej denge ki tera afk haat gaya
      
      const afk = new MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`Your AFK has been removed \n${data.Content} - ${moment(parseInt(data.TimeAgo)).fromNow()}`) // abhi isme ${moment(parseInt(data.TimeAgo)).fromNow()} means is kitne der ke baad aya moment ki site dekhlena bohot hai codes aise
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
     
      message.channel.send({ embeds: [afk]})
data.delete() // then ye mongodb se data uda dega you can check user id and guild id jo afk command use kar raha mongodb compass kholke usme data then afk pa jake dekh sakte
    } else return; // else return pakad lo abhi jo upar ka hua ye saab hua hi nahi wo banda aya hi nahi and chat nahi kiya ulta uss bande ko kisine tag mara then
  })
  
  if(message.mentions.members.first()) { //this means koi bhi jaab afk wale bande ko tag karenge then
    db.findOne({ Guild: message.guild.id, Member: message.mentions.members.first().id }, async(err, data) => { // ye uski id and server id wapas dhundega
      if(err) throw err; // agar dhund nahi paya to error throw kardega
      if(data) { // agar dhund liya then ye embed bhejega
        const member = message.guild.members.cache.get(data.Member);// hamne ek variable banaya idhar member ke andar ek function dal diya jisse haam jo banda ne afk command chalaya tha khudko afk banane ke liye uska name hoga
        const afk = new MessageEmbed() 
        .setColor('RANDOM')
        .setDescription(`${member.user.tag} is currently AFK\n**Reason:** ${data.Content} - ${moment(parseInt(data.TimeAgo)).fromNow()}`) // as you can see we used member.user.tag member samjha diya kiya hai usme then data.content mtlb reason jo reason mongoose pa store hoga jo uss bande ne diya hoga wo show hoga 
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        
        message.channel.send({ embeds: [afk]})
      } else return; // and bss 
    })
  }
