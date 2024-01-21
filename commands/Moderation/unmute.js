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
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.inlineReply(`${client.emotes.error} | You are not able to use this command.`)
const muterole = db.fetch(`mute-role.${message.guild.id}`)
if(!muterole) return message.inlineReply(`${client.emotes.error} | This server does not have a mute role, use \`pyth mute-role\` to set one or \`pyth mute-role create [name]\` to create one.`)
const member = message.mentions.members.first()
if(!member) return message.inlineReply(`${client.emotes.error} | Mention a member.`)
if(!member.roles.cache.has(muterole)) return message.inlineReply(`${client.emotes.error} | Member is not have muted role.`)
member.roles.remove(muterole)
return message.inlineReply(`${client.emotes.success} | Successfully unmuted **${member.user.tag}**.`)
};
exports.help = {
name: 'unmute',
description: "Unmutes a user.",
usage: "pyth unmute <user>",
category: "Moderation",
cooldown: 5
};