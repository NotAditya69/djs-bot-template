const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
} = require('discord.js')

module.exports = {
    name: 'button',
    description: 'test',
     /*
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const row = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId('rickroll')
            .setLabel('RICKROLL')
            .setStyle('DANGER'),

            new MessageButton()
            .setCustomId('bomb')
            .setLabel('BOMB')
            .setStyle('DANGER')
        )
        message.channel.send({ content: 'RICKROLL OR BOMB', components: [row]})

        const filter = (interaction) => {
            if (interaction.user.id === message.author.id) return true;
            return interaction.reply({ content: "DON'T TOUCH OTHERS BUTTONS OR I BOMB YOU"});
        }
        
        const collector = message.channel.createMessageComponentCollector({
            filter,
            max: 1,
        })

        collector.on('end', (ButtonInteraction) => {
            const id = ButtonInteraction.first().customId;

            if(id === 'rickroll') return ButtonInteraction.first().reply('https://media.discordapp.net/attachments/897512926288695347/902064184865484860/rickroll-roll.gif')
            if(id === 'bomb') return ButtonInteraction.first().reply('https://images-ext-1.discordapp.net/external/9_ePILUUZ6oukzSsXamq2X9utudcw892_5nL5TktaLw/https/images-ext-1.discordapp.net/external/1OlJFJz13TakYvEUhWHWCkLudfAN3tyJC4xUUg1WLjg/https/c.tenor.com/RegpKvUKWgMAAAAS/boom-explosion.gif')
        })
    }
}
