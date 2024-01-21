const { MessageEmbed, Message, Client } = require("discord.js");
const db = require('../../models/Invite System/inviteGuild')
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 * @returns 
 */
exports.run = async (client, message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR"))return message.inlineReply(`${client.emotes.error} | You are not able to use that command.`);
if (!args[0])return message.inlineReply(`${client.emotes.error} | Wrong usage!! You can use only: **set or clear**`);
if (args[0] == "set") {
const data = await db.findOne({guild: message.guild.id});
if (data)return message.inlineReply(`${client.emotes.error} | Already set with a channel!`);
let channel =message.mentions.channels.first()
if (!channel) return message.inlineReply(`${client.emotes.error} | Mention a channel.`);
let newData = new db({guild: message.guild.id,channel: channel.id});
newData.save();
message.inlineReply(`${client.emotes.error} | Successfully set the channel.`);
}
if (args[0] == "clear") {
const data = await db.findOne({guild: message.guild.id});
if (!data)return message.inlineReply(`${client.emotes.error} | Channel is not set!`);
await db.findOneAndRemove(data.channel);
await db.findOneAndDelete(data.channel)
message.inlineReply(`${client.emotes.success} | Cleared channel from database.`);
}
};
exports.help = {
name: 'invite-channel',
description: "Set invite channel.",
usage: "pyth invite-channel set/clear",
category: "Invite system",
cooldown: 5
};