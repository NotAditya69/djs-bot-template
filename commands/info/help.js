const { MessageEmbed, Message, Client, MessageActionRow, MessageButton } = require("discord.js");
const Discord = require('discord.js')
const {readdirSync} = require("fs");
const ms = require('ms')


module.exports = {
    name: "help",
    aliases: [`h`, `Help`],
    description: "more kek with help",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args 
     * @returns 
     */
    run: async (client, message, args) => {

        if (!args[0]) {

            const emo = { // so hmm emo is a variable as you can see it contains emoji so we can use it for buttons so hamne store karliya emojis then
                Economy: "💵",
                Fun: "🎈",
                Utility: "⚙️",
                Moderation: "🛡️",
                Image: "📷",
                Info: "🧾",
                Games: "🎮",
                Misc: "💿"
            }
            const categories = [] // now categories is also a variable and isme ham files path store karenge
            readdirSync("./commands/").forEach((dir) => { // jisne nodeJS start se sikha hai usko pata hai what is readdirSync iss chiz se haam read karte hai files ko for getting this we require fs const readdirSync = require('fs') inbuilt module samjhe
                const editedname = `${dir}` //now this means the command name dir abhi upar forEach((dir) this means file name you can check node js docs for more 
                if (dir.toLowerCase() === 'owner') return; //and konsi file ko ignore karna hai mtlb dikhana nahi so mene owner dal diya tum daldo jo dalna
                let data = new Object(); //data var ke andar new object store kiya mene
                data = { // and data ke andar wo upar ke chiz dal denge
                    name: editedname, // upar wala editedname wala variable dal diya dekho
                    value: `Click on the **${dir}** Button`, // and value means description 
                    inline: true // inline false karoge to haar ek command ek line mai ana lagenge agar true karoge then ye sidha nahi jayega kese bolu khud dekh lena
                };
                categories.push(data);// abhi categories ke sath hamne data bhi push kardiya mtlb bahar show kardiya
            });

            let disabled = null // disabled variable ke hamne null kardiya mtlb nothing ye hamne isliye kiya so buttons disabled na ho
            disabled = false; // ye dekho false kardiya
            
            const economyBtn = new MessageButton() // buttons banana ata hi hoga aab button file dekh li hogi 
                .setCustomId('help-economy') // so this is the custom id for the button jaab ye buttons haam bhejenge and isko click karne pa reply iski madat se ayega
                .setLabel('Economy')// label mtlb jaab koi bahar se button dekhega uska name label hoga so iske andar kek daloge to kek dikhega
                .setEmoji(emo.Economy) // this means emo.Economy yaad aya hamne emo var ke andar emojis dale tha wohi hai
                .setDisabled(disabled) // disabled wala var
                .setStyle('SUCCESS') // success means green colour pakad lo danger daloge to red ho jayega wohi hai ez shit
            
            const funBtn = new MessageButton()
                .setCustomId('help-fun')
                .setLabel('Fun')
                .setEmoji(emo.Fun)
                .setDisabled(disabled)
                .setStyle('SUCCESS')
            
            const utilityBtn = new MessageButton()
                .setCustomId('help-utility')
                .setLabel('Utility')
                .setEmoji(emo.Utility)
                .setDisabled(disabled)
                .setStyle('SUCCESS')
            
            const gamesBtn = new MessageButton()
                .setCustomId('help-games')
                .setLabel('Games')
                .setEmoji(emo.Games)
                .setDisabled(disabled)
                .setStyle('SUCCESS')
            
            const imageBtn = new MessageButton()
                .setCustomId('help-image')
                .setLabel('Image')
                .setEmoji(emo.Image)
                .setDisabled(disabled)
                .setStyle('SUCCESS')
            
            const modBtn = new MessageButton()
                .setCustomId('help-mod')
                .setLabel('Moderation')
                .setEmoji(emo.Moderation)
                .setDisabled(disabled)
                .setStyle('SUCCESS')
            
            const infoBtn = new MessageButton()
                .setCustomId('help-info')
                .setLabel('Info')
                .setEmoji(emo.Info)
                .setDisabled(disabled)
                .setStyle('SUCCESS')
            const miscBtn = new MessageButton()
                .setCustomId('help-misc')
                .setLabel('Misc')
                .setEmoji(emo.Misc)
                .setDisabled(disabled)
                .setStyle('SUCCESS')
            
            const row1 = new MessageActionRow()
                .addComponents(economyBtn)
                .addComponents(funBtn)
                .addComponents(utilityBtn)
                .addComponents(gamesBtn)
                .addComponents(imageBtn)

            const row2 = new MessageActionRow()
                .addComponents(modBtn)
                .addComponents(infoBtn)
                .addComponents(miscBtn)
            
            const embed = new MessageEmbed()
                .setAuthor(`Help`, client.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`Here is a list of all the commands avalable on the bot. You can run \`p!help <Command_name>\` to see more info about the command!\n**Total Commands:** ${client.commands.size}\n\u200c`)
                .setColor('RANDOM')
                .addFields(categories)
                .setTimestamp()
            const fMsg = await message.channel.send({ embeds: [embed], components: [row1, row2] });

            const filter = (interaction) => { // abhi agar button ko koi alag banda touch karle to error ajayega so ham usse ye use karke bypass kar denge
                if (interaction.user.id === message.author.id) return true; // this means agar jisne help kiya usne dabaya buttons to thik
                return interaction.reply({ content: `DON'T TOUCH OTHERS BUTTONS OR I BOMB YOU`, ephemeral: true }) // agar kisi alag chaman ne click kiya to ye isse ye msg bhejega now what is ephemeral its like secret msg ye bss chaman ko dikhega
            }
            
            const collector = message.channel.createMessageComponentCollector({ // this is the expire kinda thing abhi dekho expire time hota hai ye add karna hi padta otherwise bohot chaman log hai jo button spam mardete
                filter,
                max: 100, // abhi maximum use 100 rakha hai mene tum dekhlo tumhare hisab se
                time: 100000 // expire time dekhlo khud tum
            });
            
            collector.on('collect', async (interaction) => { // this means jab button click karoge taab reply to ana chahiye na and reply mai commands dikhne chahiye usko haam button id se bhej sakte
                interaction.deferUpdate(); // ham ye isliye use kar rahe so interaction fail wala msg na aye samjhe
                
                if (interaction.customId == 'help-economy') { // abhi iska mtlb hai agar customId help-economy hai to haam uska command list nikalenge abhi upar jo buttons banaye hamne udhar custom id diya na wohi dalna hai
                    const commandList = []; // again var banaya hamne 
                    readdirSync(`./commands/economy`).forEach((file) => { // readdirSync ka use kiya wapas so haam har ek file under economy read kar paye 
                        const pull = require(`../../commands/economy/${file}`); // then unko require karke file name se display kare help menu pa
                        const name = `\`${pull.name}\`` // dekho pull.name mtlb files name display hoga
                        commandList.push(name); // and then name wale var ko push kar diya with commandList wala var
                   
                    });
                    const embed = new MessageEmbed().setDescription('To get more Info on a Command, Do `p!help <command name>`\n\n' + commandList.map((data) => `${data}`).join(", ")).setTimestamp().setColor('RANDOM').setTitle("💵 **Economy Commands**")
                    fMsg.edit({ embeds: [embed] })
                };

                if (interaction.customId == 'help-fun') {
                    const commandList = [];
                    readdirSync(`./commands/fun`).forEach((file) => {
                        const pull = require(`../../commands/fun/${file}`);
                        const name = `\`${pull.name}\``
                        commandList.push(name);
                   
                    });
                    const embed = new MessageEmbed().setDescription('To get more Info on a Command, Do `p!help <command name>`\n\n' + commandList.map((data) => `${data}`).join(", ")).setTimestamp().setColor('RANDOM').setTitle("🎈 **Fun Commands**")
                    fMsg.edit({ embeds: [embed] })
                };

                if (interaction.customId == 'help-utility') {
                    const commandList = [];
                    readdirSync(`./commands/utility`).forEach((file) => {
                        const pull = require(`../../commands/utility/${file}`);
                        const name = `\`${pull.name}\``
                        commandList.push(name);
                   
                    });
                    const embed = new MessageEmbed().setDescription('To get more Info on a Command, Do `p!help <command name>`\n\n' + commandList.map((data) => `${data}`).join(", ")).setTimestamp().setColor('RANDOM').setTitle("⚙️ **Utility Commands**")
                    fMsg.edit({ embeds: [embed] })
                };

                if (interaction.customId == 'help-games') {
                    const commandList = [];
                    readdirSync(`./commands/games`).forEach((file) => {
                        const pull = require(`../../commands/games/${file}`);
                        const name = `\`${pull.name}\``
                        commandList.push(name);
                   
                    });
                    const embed = new MessageEmbed().setDescription('To get more Info on a Command, Do `p!help <command name>`\n\n' + commandList.map((data) => `${data}`).join(", ")).setTimestamp().setColor('RANDOM').setTitle("🎮 **Games Commands**")
                    fMsg.edit({ embeds: [embed] })
                };

                if (interaction.customId == 'help-image') {
                    const commandList = [];
                    readdirSync(`./commands/image`).forEach((file) => {
                        const pull = require(`../../commands/image/${file}`);
                        const name = `\`${pull.name}\``
                        commandList.push(name);
                   
                    });
                    const embed = new MessageEmbed().setDescription('To get more Info on a Command, Do `p!help <command name>`\n\n' + commandList.map((data) => `${data}`).join(", ")).setTimestamp().setColor('RANDOM').setTitle("📷 **Image Commands**")
                    fMsg.edit({ embeds: [embed] })
                };
            
                if (interaction.customId == 'help-mod') {
                    const commandList = [];
                    readdirSync(`./commands/moderation`).forEach((file) => {
                        const pull = require(`../../commands/moderation/${file}`);
                        const name = `\`${pull.name}\``
                        commandList.push(name);
                   
                    });
                    const embed = new MessageEmbed().setDescription('To get more Info on a Command, Do `p!help <command name>`\n\n' + commandList.map((data) => `${data}`).join(", ")).setTimestamp().setColor('RANDOM').setTitle("🛡️ **Moderation Commands**")
                    fMsg.edit({ embeds: [embed] })
                };
                
                if (interaction.customId == 'help-info') {
                    const commandList = [];
                    readdirSync(`./commands/info`).forEach((file) => {
                        const pull = require(`../../commands/info/${file}`);
                        const name = `\`${pull.name}\``
                        commandList.push(name);
                   
                    });
                    const embed = new MessageEmbed().setDescription('To get more Info on a Command, Do `p!help <command name>`\n\n' + commandList.map((data) => `${data}`).join(", ")).setTimestamp().setColor('RANDOM').setTitle("🧾 **Info Commands**")
                    fMsg.edit({ embeds: [embed] })
                }; 
                
                if (interaction.customId == 'help-misc') {
                    const commandList = [];
                    readdirSync(`./commands/misc`).forEach((file) => {
                        const pull = require(`../../commands/misc/${file}`);
                        const name = `\`${pull.name}\``
                        commandList.push(name);
                   
                    });
                    const embed = new MessageEmbed().setDescription('To get more Info on a Command, Do `p!help <command name>`\n\n' + commandList.map((data) => `${data}`).join(", ")).setTimestamp().setColor('RANDOM').setTitle("💿 **Misc Commands**")
                    fMsg.edit({ embeds: [embed] })
                };
            })

            collector.on('end', async () => { // abhi end kardiya buttons reach iske baad so wo jo timer dala na wo khtm hote hi iss command se buttons kam karna bandh ho jayenge
                disabled = true
            });
            

        } else { // ye saab ka khud dekhlo samjho ye sab
            const command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));
            if (!command) {
                message.channel.send(`There isn't any command or category named "${args[0]}"`)
            } else {
                let command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));
                let name = command.name;
                let description = command.description || "No descrpition provided"
                let usage = command.usage || "No usage provided"
                let aliases = command.aliases || "No aliases provided"
                let cooldown = command.cooldown || "No cooldown provided!"

                let cooldownEmbed = new Discord.MessageEmbed()
                    .setFooter(`Requested from ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    .setTitle(`Help | \`${(name.toLocaleString())}\` Command!`)
                    .setDescription(`> **Here is some info about the command!**\n> Note: If the field has \`< >\` then it is a **required** field. But if the field has \`[ ]\` then it is an **optional** field.\n`)
                    .addFields(
                        { name: "📋 Description", value: `${description}` },
                        { name: "⌨️ Usage", value: `${usage}` },
                        { name: "📎 Aliases", value: `${aliases}` },
                        { name: '⏱️ Cooldown', value: `${ms(cooldown)}` }
                    )
                    .setColor(message.guild.me.displayHexColor)
                message.channel.send({embeds: [cooldownEmbed]})

                if (!cooldown) {
                    let nocdEmbed = new Discord.MessageEmbed()
                        .setFooter(`Requested from ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                        .setTitle(`Help | \`${(name.toLocaleString())}\` Command!`)
                        .setDescription(`> **Here is some info about the command!**\n> Note: If the field has \`< >\` then it is a **required** field. But if the field has \`[ ]\` then it is an **optional** field.\n`)
                        .addFields(
                            { name: "📋 Description", value: `${description}` },
                            { name: "⌨️ Usage", value: `${usage}` },
                            { name: "📎 Aliases", value: `${aliases}` },
                            { name: '⏱️ Cooldown', value: `None` }
                        )
                        .setColor(message.guild.me.displayHexColor)
                    message.channel.send({embeds: [nocdEmbed]})
                };
            }
        };
    }, 
};
