const Discord = require('discord.js');
const inviterSchema = require('../../models/Invite System/inviter')
const inviteMemberSchema = require('../../models/Invite System/inviteMember')
const moment = require('moment');
moment.locale("en")
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {String[]} args 
 * @returns 
 */
exports.run = async (client, message, args) => {
const member = message.mentions.members.first() || message.member
const data = await inviteMemberSchema.find({
guildID: message.guild.id,
inviter: member.user.id
})
const filtered = data.filter(x => message.guild.members.cache.get(x.userID))
message.inlineReply(new Discord.MessageEmbed().setDescription(`
${filtered.length > 0 ? filtered.map(m => `<@${m.userID}> - ${moment(m.date).format("LLL")}`).join("\n") : `${member} is not invited anyone.`}
`))
};
exports.help = {
name: 'invited-users',
description: "Shows your invited users.",
usage: "pyth invited-users <user>",
category: "Invite system",
cooldown: 5
};