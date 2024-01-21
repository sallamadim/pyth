const Discord = require('discord.js');
const { discord } = require('../../config/config')
const { Database } = require('quickmongo')
const db = new Database(discord.mongourl, "pythdb")
const ms = require('parse-ms')
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {String[]} args 
 * @returns 
 */
exports.run = async (client, message, args) => {
let chocolate = await db.fetch(`chocolate.${message.author.id}`)
let user = message.mentions.users.first()
let cooldown = 86400000
let last = await db.fetch(`choc.time.${message.author.id}`)
if (last !== null && cooldown - (Date.now() - last) > 0) {
let timeObj = ms(cooldown - (Date.now() - last));
return message.channel.send(new Discord.MessageEmbed().setDescription(`
${client.emotes.error} | To use this command again you need to wait; ${timeObj.hours} hour(s), ${timeObj.minutes} minute(s), ${timeObj.seconds} second(s).
`))
} else {
if(!user) return message.inlineReply(`${client.emotes.error} | You need to mention some1!!
:chocolate_bar: | And you have **1** chocolate to send it.
`)
if(user.id == message.author.id) return message.inlineReply(`${client.emotes.error} | You cant send chocolate to yourself!!`)
if(user.bot) return message.inlineReply(`${client.emotes.error} | You cant send chocolate to bot.`)
await db.add(`choc.${user.id}`, 1)
await db.set(`choc.time.${message.author.id}`, Date.now())
return message.inlineReply(`${client.emotes.success} | You have send 1 chocolate to **${user.tag}**!!`)
}
};
exports.help = {
name: 'chocolate',
description: "Get chocolates from your friends.",
usage: "pyth chocolate {user}",
category: "Economy"
};