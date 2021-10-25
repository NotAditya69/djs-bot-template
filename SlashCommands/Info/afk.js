const {
    MessageEmbed
} = require('discord.js')
const db = require('../../models/afk');
module.exports = {
    name: 'afk',
    description: 'Set Yourself in AFK',
    options: [{
            name: 'reason',
            type: 'STRING',
            description: 'Reason for AFK',
            required: false,
        },
    ],
    run: async (client, interaction, options) => {
const afkreason = interaction.options.getString('reason') || 'No reason';
    db.findOne({ Guild: interaction.guildId, Member: interaction.user.id }, async(err, data) => {
      if(data) {
        return;
      } else {
        Data = new db({
          Guild: interaction.guildId,
          Member: interaction.user.id,
          Content: afkreason,
          TimeAgo: Date.now()
        })
        Data.save()
        const afksave = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`You have been set to AFK\n**Reason:** ${afkreason}`)
        .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        
        interaction.followUp({ embeds: [afksave]})
      }
    })

}}
