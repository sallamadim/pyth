const Discord = require('discord.js');
const { discord } = require('../../config/config')
const { Database } = require('quickmongo')
const db = new Database(discord.mongourl, "pythdb")
const ms = require('ms')
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
if(!args[0]) return message.inlineReply(`${client.emotes.error} | You need to provide valid argument. (arguments: give, timed, take)`)
if(args[0] == "give") {
let user = args[1]
if(!user) return message.inlineReply(`${client.emotes.error} | Enter a valid ID.`)
if(isNaN(user)) return message.inlineReply(`${client.emotes.error} | Enter a valid ID.`)
if(await db.has(`premium.${user}`)) return message.inlineReply(`${client.emotes.error} | User already premium.`)
await db.set(`premium.${user}`, true)
return message.inlineReply(`${client.emotes.success} | Gived premium to: <@${user}>.`)
} else if(args[0] == "timed") {
var things = [
"seconds",
"day",
"minute",
"hour"
]
let user = args[1]
if(!user) return message.inlineReply(`${client.emotes.error} | Enter a valid ID.`)
if(isNaN(user)) return message.inlineReply(`${client.emotes.error} | Enter a valid ID.`)
if(await db.has(`premium.${user}`)) return message.inlineReply(`${client.emotes.error} | User already premium.`)
if(!args[2]) return message.inlineReply(`${client.emotes.error} | Enter a valid number.`)
if(isNaN(args[2])) return message.inlineReply(`${client.emotes.error} | Enter a valid number.`)
if(!args[3]) return message.inlineReply(`${client.emotes.error} | Enter a valid time.`)
if(!things.includes(args[3])) return message.inlineReply(`${client.emotes.error} | No lol.`)
let bitis = Date.now() + ms(args[2] + ' ' + args[3].replace('minute', 'minutes').replace('hour', 'hours').replace('seconds', 'seconds').replace('day', 'day'))
await db.set(`premium.${user}`, {
time: bitis,
start: Date.now()
})
console.log(bitis)
message.inlineReply(`${client.emotes.success} | Gived timed premium to: <@${user}>.\n${client.emotes.wait} | The time of the premium end: ${moment(bitis).format("DD.MM.YYYY - HH:mm:ss")}`)
setTimeout(async() => {
await db.delete(`premium.${user}`)
}, ms(args[2] + ' ' + args[3].replace('minute', 'minutes').replace('hour', 'hours').replace('seconds', 'seconds').replace('day', 'day')))
} else if(args[0] == "take") {
let user = args[1]
if(!user) return message.inlineReply(`${client.emotes.error} | Enter a valid ID.`)
if(isNaN(user)) return message.inlineReply(`${client.emotes.error} | Enter a valid ID.`)
if(!await db.has(`premium.${user}`)) return message.inlineReply(`${client.emotes.error} | User is not premium.`)
await db.delete(`premium.${user}`)
return message.inlineReply(`${client.emotes.success} | Tooked premium from: <@${user}>`)
}
}
exports.help = {
name: 'premium',
description: "Uhm idk I dont a description for this command so be happy lol.",
usage: "pyth premium",
category: "Owner",
cooldown: 5
};