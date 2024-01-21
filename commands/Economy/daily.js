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
let nonPremium = [100, 150, 200, 50, 300]
let premium = [500, 450, 400, 550, 600]
if(await db.has(`premium.${message.author.id}`)) {
let bal123 = premium[Math.floor(Math.random() * premium.length)]
await db.add(`bal.${message.author.id}`, bal123)
return message.channel.send(`${client.emotes.pyos} | **${message.author.tag}** claimed **${bal123}** pyos.
${client.emotes.wait} | You need to wait **86 400** seconds to use the command again.
`)
} else {
if(!await db.has(`premium.${message.author.id}`)) {
let prePara = nonPremium[Math.floor(Math.random() * nonPremium.length)]
await db.add(`bal.${message.author.id}`, prePara)
return message.channel.send(`${client.emotes.pyos} | **${message.author.tag}** claimed **${prePara}** pyos.
${client.emotes.wait} | You need to wait **86 400** seconds to use the command again.
`)
}
}
};
exports.help = {
name: 'daily',
description: "Get your daily award.",
usage: "pyth daily",
category: "Economy",
cooldown: 3
};