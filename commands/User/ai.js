const Discord = require('discord.js');
const { discord, embeds } = require('../../config/config')
const { Database } = require('quickmongo')
const db = new Database(discord.mongourl, `pythdb`)
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {String[]} args 
 * @returns 
 */
exports.run = async (client, message, args) => {
if(!args[0])return message.inlineReply(`${client.emotes.error} | Ask a question to ai!!`)
const cleverbot = require("cleverbot-free")
cleverbot(args.slice(0).join(" "))
.then(x => {
message.inlineReply(x)
})
};
exports.help = {
name: 'ai',
description: `ai`,
usage: `pyth ai`,
category: `User`,
cooldown: 13
};