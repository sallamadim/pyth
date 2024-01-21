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
const member = args[0]
if(!member) return message.inlineReply(`${client.emotes.error} | Provide a member id for unban.`)
if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.inlineReply(`${client.emotes.error} | I dont have permission.`)
const banlist = await message.guild.fetchBans()
if(isNaN(member) || !banlist.has(member)) return message.inlineReply(`${client.emotes.error} | Cannot find that id in banlist.`)
message.guild.members.unban(member)
message.inlineReply(`${client.emotes.success} | Unbanned, **<@${args[0]}>**.`)
};
exports.help = {
name: 'unban',
description: "Unbans a member from guild.",
usage: "pyth unban <user_id>",
category: "Moderation",
cooldown: 5
};