const Discord = require('discord.js');
const { discord } = require('../../config/config')
const { Database } = require('quickmongo')
const db = new Database(discord.mongourl, "pythdb")
const ms = require('ms')
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {String[]} args 
 * @returns 
 */
exports.run = async (client, message, args) => {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.inlineReply(`${client.emotes.error} | You are not able to use this command.`)
const muterole = await db.fetch(`mute-role.${message.guild.id}`)
if(!muterole) return message.inlineReply(`${client.emotes.error} | This server does not have a mute role, use \`pyth mute-role\` to set one or \`pyth mute-role create [name]\` to create one.`)
const member = message.mentions.members.first()
const reason = args.slice(1).join(" ")
if(!member) return message.inlineReply(`${client.emotes.error} | Mention a member.`)
if(!reason) return message.inlineReply(`${client.emotes.error} | Provide a reason.`)
let infinity = false;
if(args[1]) {
infinity = args.find(a => a.endsWith('m') || a.endsWith('h') || a.endsWith('s') || a.endsWith('d') || a.endsWith('w') || a.endsWith('y'))
}
const zaman = args[1]
if(!zaman) {
member.roles.add(muterole)
return message.inlineReply(`${client.emotes.success} | **${message.author.tag}** muted **${member.user.tag}** for infinity.`)
} else {
let zamann = zaman.replace('w', ' week').replace('d', ' day').replace('s', ' second').replace('m', ' minute').replace('h', ' hour');
if(zamann.includes('second') && zamann.split(' ')[0] == 1) zamann = 'now'
if(zamann.includes('second') && zamann.split(' ')[0] > 1) zamann = zamann.split(' ')[0]+' seconds';
if(zamann.includes('minute') && zamann.split(' ')[0] > 1) zamann = zamann.split(' ')[0]+' minutes';
if(zamann.includes('hour') && zamann.split(' ')[0] > 1) zamann = zamann.split(' ')[0]+' hours';
if(zamann.includes('day') && zamann.split(' ')[0] > 1) zamann = zamann.split(' ')[0]+' days';
if(zamann.includes('week') && zamann.split(' ')[0] > 1) zamann = zamann.split(' ')[0]+' weeks';
if(ms(zaman) >= 2147483647) return message.inlineReply(`${client.emotes.error} | You can mute maximum 24 days.`);
member.roles.add(muterole)
message.inlineReply(`${client.emotes.success} | **${message.author.tag}** muted **${member.user.tag}** for **${zamann}**.`)
setTimeout(() => {
if(member.roles.cache.has(muterole)) {
member.roles.remove(muterole)
}else return;
}, require('ms')(zaman))
}
};
exports.help = {
name: 'mute',
description: "Mute a member.",
usage: "pyth mute <user> <time> <reason>",
category: "Moderation",
cooldown: 5
};