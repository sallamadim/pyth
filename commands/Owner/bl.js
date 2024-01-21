const Discord = require('discord.js')
const { discord } = require('../../config/config')
const { Database } = require('quickmongo')
const db = new Database(discord.mongourl, "pythdb")
const moment = require('moment')
moment.locale("en")
require('moment-duration-format')
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {String[]} args 
 * @returns 
 */
exports.run = async (client, message, args) => {
if(message.author.id !== "793463889659822100") return message.inlineReply(`${client.emotes.error} | You are not able to use this command.`)
if(!args[0]) return errorEmbed(`Wrong usage!!11!1
Examples:

pyth blacklist add 793463889659822100
pyth blacklist remove 793463889659822100

`)
else if(args[0] == "add") {
let user = client.users.cache.get(args[1]) || message.mentions.members.first()
let reason = args.slice(1).join(" ")
if(!user)return errorChannelSend("Provide a id for blacklist a user.")
if(!reason) return errorChannelSend("Provide a reason.")
if(await db.has(`bl.${user.id}`)) return errorChannelSend("The user already in blacklist.")
await db.set(`bl.${user.id}`, reason)
return successChannelSend("Added blacklist to user.")
}
else if(args[0] == "remove") {
let user = client.users.cache.get(args[1]) || message.mentions.members.first()
if(!user)return errorChannelSend("Provide a id for blacklist a user.")
if(!await db.has(`bl.${user.id}`)) return errorChannelSend("User is not in blacklist.")
await db.delete(`bl.${user.id}`)
successChannelSend("Removed blacklist from user.")
}
////////////////FUNCTIONS!!11!1////////////////////
async function errorEmbed(msg) {
const embed = new Discord.MessageEmbed()
.setDescription(`${client.emotes.error} | ${msg}`)
.setFooter(embeds.footer)
return message.inlineReply(embed)
}
async function successEmbed(msg) {
const embed = new Discord.MessageEmbed()
.setDescription(`${client.emotes.success} | ${msg}`)
.setFooter(embeds.footer)
return message.inlineReply(embed)
}
async function errorChannelSend(msg) {
return message.inlineReply(`${client.emotes.error} | ${msg}`)
}
async function successChannelSend(msg) {
return message.inlineReply(`${client.emotes.success} | ${msg}`)
}
////////////////FUNCTIONS!!11!1////////////////////
}
exports.help = {
name: 'blacklist',
description: "Blacklist command uhm.",
usage: "pyth blacklist add/remove/list",
category: "Owner",
cooldown: 5
}