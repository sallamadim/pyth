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
if(!marry) return message.inlineReply(`${client.emotes.error} | You are not married.`)
let userqwe = marry.user
let user = client.users.cache.get(userqwe)
let filter = (msg) => msg.author === user
message.channel.send(`<@${userqwe}>,`, new Discord.MessageEmbed().setDescription(`
**${user.tag}**, **${message.author.tag}** wants to divorced. Do you want to divorced?
Type \`yes\` or \`no\`
`)).then(() => {
message.channel.awaitMessages(filter, {max: 1, time: 60000, errors: ['time']}).then(async(collect) => {
if(collect.first().content.toLowerCase() === "yes") {
await db.delete(`marry.${message.author.id}`)
await db.delete(`marry.${user.id}`)
message.channel.send(`${client.emotes.success} | Successfully divorced.`)
} else if(collect.first().content.toLowerCase() === "no") {
return message.channel.send(`${client.emotes.success} | You are not going to divorced.`)
} else if(!collect.first().content.includes("yes") || !collect.first().content.includes("no")) {
message.channel.send(`${client.emotes.error} | Thats not valid answer.`)
}
}).catch(a => message.channel.send(`${client.emotes.error} | Time is up!!`))
})
};
exports.help = {
name: 'divorce',
description: "Divorce from married user.",
usage: "pyth divorce",
category: "Economy",
cooldown: 3
};