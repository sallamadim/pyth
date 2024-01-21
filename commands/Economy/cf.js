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
let spent = args[0]
if(spent > 50000) spent = 50000
let award = spent * 2
let loss = spent
let tailOrHead = args[1] //--tail or --head
let chosed;
if(tailOrHead == "--tail") chosed = "tail"
if(tailOrHead == "--head") chosed = "head"
if(!tailOrHead) chosed = "head"
let array = ["head","tail","head","tail"]
let ok = array[Math.floor(Math.random() * array.length)]
if(!spent) return message.inlineReply(`${client.emotes.error} | Provide a valid pyos to play coin flip.`)
if(isNaN(spent)) return message.inlineReply(`${client.emotes.error} | Provide a valid pyos to play coin flip.`)
if(spent > bal) return message.inlineReply(`${client.emotes.error} | You dont have enough pyos.`)
if(ok == array[0] || ok == array[2]) {
if(chosed == "--head" || chosed == "head") {
await db.add(`bal.${message.author.id}`, award)
return message.inlineReply(`${client.emotes.success} | You won the coin flip!!
${client.emotes.pyos} | You got **${award}** pyos.

Tip: you can use like this: pyth cf 10 --head or  pyth cf 10 --tail
`)
} else {
message.inlineReply(`${client.emotes.error} | You lose this :c
${client.emotes.pyos} | And you lose your **${spent}** pyos.
`)
await db.subtract(`bal.${message.author.id}`, spent)
}
} else {
if(ok == array[1] || ok == array[3]) {
if(chosed == "--tail" || chosed == "tail") {
await db.add(`bal.${message.author.id}`, award)
return message.inlineReply(`${client.emotes.success} | You won the coin flip!!
${client.emotes.pyos} | You got **${award}** pyos

Tip: you can use like this: pyth cf 10 --head or  pyth cf 10 --tail
`)
} else {
message.inlineReply(`${client.emotes.error} | You lose this :c
${client.emotes.pyos} | And you lose your **${spent}** pyos.
`)
await db.subtract(`bal.${message.author.id}`, spent)
}
}
}
};
exports.help = {
name: 'cf',
description: "Play coin flip.",
usage: "pyth cf {money} [--tail or --head]",
category: "Economy",
cooldown: 1
};