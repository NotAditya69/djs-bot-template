const { MessageEmbed, Message, Client, MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
    name: "help",
    aliases: [`h`, `Help`],
    description: "more kek with help",
     /*
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
     run: async (client, message, args) => {
         const emojis = {
             info: 'ℹ️',
             moderation: '🔨',
             utility: '⚙️'
         }
         const directories = [
             ...new Set(client.commands.map((cmd) => cmd.directory)),
         ];
         
         const formatString = (str) =>
         `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

         const categories = directories.map((dir) => {
             const getCommands = client.commands.filter(
                 (cmd) => cmd.directory === dir
             ).map(cmd => {
                 return {
                     name: cmd.name || 'Undefined',
                     description: cmd.description || 'No Description'
                 }
             });

             return {
                 directory: formatString(dir),
                 commands: getCommands,
             };
         });

         const embed = new MessageEmbed()
         .setDescription('Please choose a category in the dropdown menu')

         const components = (state) => [
             new MessageActionRow().addComponents(
                 new MessageSelectMenu()
                 .setCustomId('help-menu')
                 .setPlaceholder('Select a cetegory')
                 .setDisabled(state)
                 .addOptions(
                     categories.map((cmd) => {
                         return {
                             label: cmd.directory,
                             value: cmd.directory.toLowerCase(),
                             description: `Commands from ${cmd.directory} category`,
                             emoji: emojis[cmd.directory.toLowerCase()] || null,
                         }
                     })
                 )
             )
        ]

         const initialMessage = await message.channel.send({
             embeds: [embed],
             components: components(false),
         });

         const filter = (interaction) => 
         interaction.user.id === message.author.id;

         const collector = message.channel.createMessageComponentCollector({
             filter,
             componentType: "SELECT_MENU",
             //time: 5000,
         });

         collector.on('collect', (interaction) => {
             const [ directory ] = interaction.values;
             const category = categories.find(x => x.directory.toLowerCase() === directory)

             const catEmbed = new MessageEmbed()
             .setTitle(`${directory}`)
             .setDescription(`Here are the list of commands`)
             .addFields(
                 category.commands.map((cmd) => {
                     return {
                         name: `** **`,
                         value: `<:arrow:905012469070696498> \`${cmd.name}\` - ${cmd.description}`,
                         inline: false
                     };
                 })
             );

             interaction.update({ embeds: [catEmbed] });
         });
         
         collector.on('end', () => {
              initialMessage.edit({ components: components(true) });
         });
    },
}
