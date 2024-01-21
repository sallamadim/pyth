const Discord = require('discord.js');
const { discord } = require('../../config/config')
const { Database } = require('quickmongo')
const db = new Database(discord.mongourl, "pythdb")
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {String[]} args 
 * @returns 
 */
exports.run = async (client, message, args) => {
let user = message.author || message.mentions.users.first()
let bal = await db.fetch(`bal.${user.id}`) || "0"
message.channel.send(`**${message.author.tag}** you have ${client.emotes.pyos} **${bal}** pyos.`)
};
exports.help = {
name: 'bal',
description: "Shows your balance.",
usage: "pyth bal [user]",
category: "Economy",
cooldown: 3
};