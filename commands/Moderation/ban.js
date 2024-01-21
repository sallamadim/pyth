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
if(!message.member.hasPermission("BAN_MEMBERS")) return message.inlineReply(`${client.emotes.error} | You are not able to use this command.`)
const member = message.mentions.members.first()
const reason = args.slice(1).join(" ")
if(!member) return message.inlineReply(`${client.emotes.error} | You need to mention a member.`)
if(!reason) return message.inlineReply(`${client.emotes.error} | You need to provide a reason.`)
if(member.id == client.user.id) return message.inlineReply(`${client.emotes.error} | You cant ban me!`)
if(member.id == message.author.id) return message.inlineReply(`${client.emotes.error} | No.`)
if(member.id == message.guild.owner.id) return message.inlineReply(`${client.emotes.error} | You cant ban owner.`)
if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.inlineReply(`${client.emotes.error} | I dont have permission.`)
if(message.guild.member(member).hasPermission("BAN_MEMBERS"))return message.inlineReply(`${client.emotes.error} | I cant ban!`)
message.guild.members.ban(user, {
reason: reason
})
message.inlineReply(`${client.emotes.success} | Banned, **${member.user.tag}**!`)
};
exports.help = {
name: 'ban',
description: "Ban a member from guild.",
usage: "pyth ban <user> <reason>",
category: "Moderation",
cooldown: 5
};