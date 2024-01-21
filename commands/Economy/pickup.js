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
if(!w) return message.inlineReply(`${client.emotes.error} | Specify a pyos to pickup.`)
if(isNaN(w)) return message.inlineReply(`${client.emotes.error} | Thats not a number.`)
if(w > bal) return message.inlineReply(`${client.emotes.error} | You dont have enough pyos to pickup.`)
if(system < w) {
await db.subtract(`bal.${message.author.id}`, w)
await db.add(`drop.${message.channel.id}`, w)
message.channel.send(`${client.emotes.pyos} | The channel does not have enough money to pickup. So you dropped your **${w}** pyos.`).then(msg => msg.delete({timeout:3000}))
message.delete()
} else {
await db.add(`bal.${message.author.id}`, w)
await db.subtract(`drop.${message.channel.id}`, w)
message.channel.send(`${client.emotes.pyos} | You have picked up **${w}** pyos.`)
}
};
exports.help = {
name: 'drop',
description: "Drop some pyos to channel.",
usage: "pyth drop {money}",
category: "Economy",
cooldown: 3
};