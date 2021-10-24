const Schema = require('../../models/welcomeChannel');
const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: "set-welcome",
    aliases: ["setWelcome"]
    description: "Sets welcome channel and welcomes new users to the server",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
     run: async (client, message, args) => {
         if (!message.member.permissions.has("ADMINISTRATOR")) return; // this means if the user don't have perms then he can't do hoti welcome

         const channel = message.mentions.channels.first(); //this means jo bhi banda channel name dalega for setup wo ye dhund lega
         if (!channel) return message.reply("Please mention a channel!"); // And agar channel name nahi dalta then ye bolega chutiye channel name dalna

         Schema.findOne({ Guild: message.guild.id }, async (err, data) => { // this is mongoose data store ninja technique
             if (data) { // this means ye saab set channel wala kam jo hamne kiya wo store karega and isse work karne ke liye hame ek schema chahiye aka store kaha karna hai and wo models ke help se karenga
                 data.channel = channel.id //data.channel mongoose ke language mai bolu to mongoose yaad rakhega konse channel pa welcome bhejna hai and usse hamne bataya wo chiz by using channel.id and models pa define kiya
                 data.save();// this means ye channel setup karne ke baad ye data store hoga and save hoga so mongoose bhul na jaye kaha bhejna hai welcome
             } else {
                 new Schema({ // ye naya schema banega for events to work samjhe
                     Guild: message.guild.id,
                     Channel: channel.id,
                 }).save();
             }
             message.reply(`${channel} has been set as the welcome channel`)// then after this ye msg milega ki ho gaya chacha
         });

     },
};
