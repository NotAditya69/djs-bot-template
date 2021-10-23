const {
    Collection,
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING",
    ],
});

module.exports = client;
// Mongo Connection
const mongoose = require("mongoose"); 

mongoose.connect('batcha party mongodb url here', {
    useUnifiedTopology : true,
    useNewUrlParser : true, 
}).then(console.log('✅Connected to MongoDB'))

client.commands = new Collection()
client.slashCommands = new Collection()
client.config = require('./config.json')
client.prefix = client.config.prefix
client.aliases = new Collection()

require('./handler')(client);

client.login(client.config.token)