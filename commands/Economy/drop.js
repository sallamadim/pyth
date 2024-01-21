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
let bal = await db.fetch(`bal.${message.author.id}`)
let w = Number(args[0])
let system = await db.fetch(`drop.${message.channel.id}`)
if(!w) return message.inlineReply(`${client.emotes.error} | Specify a pyos to drop.`)
if(isNaN(w)) return message.inlineReply(`${client.emotes.error} | Thats not a number.`)
if(w > bal) return message.inlineReply(`${client.emotes.error} | You dont have enough pyos.`)
await db.add(`drop.${message.channel.id}`, w)
await db.subtract(`bal.${message.author.id}`, w)
message.channel.send(`${client.emotes.pyos} | You have dropped **${w}** pyos to this channel.`).then(msg => msg.delete({timeout: 3000}))
message.delete()
};
exports.help = {
name: 'drop',
description: "Drop some pyos to channel.",
usage: "pyth drop {money}",
category: "Economy",
cooldown: 3
};