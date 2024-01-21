const Discord = require('discord.js');
const {JsonDatabase}=require('wio.db')
const db = new JsonDatabase("pythdb.json")
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
if(!args[0]) return message.inlineReply(`${client.emotes.error} | You can use only: \`add or remove\`.`)
if(args[0] == "add") {
if(!args[1]) return message.inlineReply(`${client.emotes.error} | You need type a title for update.`)
args = args.slice(1).join(' ').split(' | ')
if(!args[1]) return message.inlineReply(`${client.emotes.error} | You need to type a description for update.`)
db.add(`num`, +1)
const then = db.fetch(`num`)
db.push('updates', {
title: args[0],
description: args[1],
number: Number(then)
})
return message.inlineReply(`${client.emotes.success} | Update has been added.`)
} else {
if(args[0] == "remove") {
if(!args[1]) return message.inlineReply(`${client.emotes.error} | Provide a number of the remove update.`);
if(isNaN(args[1])) return message.inlineReply(`${client.emotes.error} | You can use only numbers.`);
const güncellemeler = await db.fetch('updates');
if(!güncellemeler || güncellemeler.length <= 0 || !güncellemeler.some(data => data.number === Number(args[1]))) return message.inlineReply(`${client.emotes.error} | Cannot find number like this.`);
db.set('updates', güncellemeler.filter(data => data.number !== Number(args[1])));
return message.inlineReply(`${client.emotes.success} | Removed update.`);
}
}
};
exports.help = {
name: 'update',
description: "Add or remove bot updates.",
usage: "pyth update",
category: "Owner",
cooldown: 7
};