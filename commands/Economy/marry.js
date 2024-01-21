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
let marry = await db.fetch(`marry.${message.author.id}`)
let inv = await db.fetch(`inv.${message.author.id}`)
let ids = ["coal", "iron", "gold", "diamond"]
let user = message.mentions.users.first()
let ring;
let id = args[1]
let filter = (msg) => msg.author == user
if(id == "coal") ring = "Coal ring"
if(id == "iron") ring = "Iron ring"
if(id == "gold") ring = "Gold ring"
if(id == "diamond") ring = "Diamond ring"
if(marry) return message.inlineReply(new Discord.MessageEmbed().setDescription(`**${message.author.tag}**, you are already married with **${client.users.cache.get(marry.user).tag}**!!`))
if(!user) return message.inlineReply(`${client.emotes.error} | Please mention a user for marry.`)
if(user.bot) return message.inlineReply(`${client.emotes.error} | You cant marry with bots.`)
if(user.id == message.author.id) return message.inlineReply(`${client.emotes.error} | Are you lonely enough to marry with yourself? So sad D:`)
if(!id) return message.inlineReply(`${client.emotes.error} | Please provide a ring id. (ids: coal, iron, gold, diamond. more information pyth shop).`)
if(!ids.includes(id)) return message.inlineReply(`${client.emotes.error} | Cannot find that ring id.`)
if(!inv.includes(id+"Ring")) return message.inlineReply(`${client.emotes.error} | Cannot find that ring on your inventory.`)
message.channel.send(`${user}, `, new Discord.MessageEmbed().setDescription(`
${message.author} is want to marry with you!! Do you want to accept it?
Type \`yes\` or \`no\`
`)).then(() => {
message.channel.awaitMessages(filter, {max: 1, time: 60000, errors: ['time']}).then(async(collect) => {
if(collect.first().content.toLowerCase() == "yes") {
await db.set(`marry.${message.author.id}`, {user: user.id,ring:ring})
await db.set(`marry.${user.id}`, {user: message.author.id,ring:ring})
return message.channel.send(`${client.emotes.success} | How cute!! **${message.author.tag}** you are now married with **${user.tag}**!! :3`)
} else if(collect.first().content.toLowerCase() == "no") {
return message.channel.send(`${client.emotes.success} | They dont want to marry with you **${message.author.tag}**, sad for you D:`)
} else if(!collect.first().content.includes("yes") || !collect.first().content.includes("no")) {
message.channel.send(`${client.emotes.error} | Thats not valid answer.`)
}
}).catch(a => message.channel.send(`${client.emotes.success} | Time is up!! Try again to be married again.`))
})
};
exports.help = {
name: 'marry',
description: "Marry with other users.",
usage: "pyth marry {user}",
category: "Economy",
cooldown: 3
};