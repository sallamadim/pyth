const { MessageEmbed, Message, Client } = require("discord.js");
const inviterSchema = require('../../models/Invite System/inviter')
const inviteMemberSchema = require('../../models/Invite System/inviteMember')
const conf = require("../../config/config");
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 * @returns 
 */
exports.run = async (client, message, args) => {
const member = message.mentions.members.first() || message.member
const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
const total = inviterData ? inviterData.total : 0;
const regular = inviterData ? inviterData.regular : 0;
const bonus = inviterData ? inviterData.bonus : 0;
const leave = inviterData ? inviterData.leave : 0;
const fake = inviterData ? inviterData.fake : 0;
const invMember = await inviteMemberSchema.find({ guildID: message.guild.id, inviter: member.user.id });
const daily = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
const weekly = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;
const embed = new MessageEmbed()
.setTitle(message.author.username)
.setTimestamp()
.setFooter(client.user.username,client.user.avatarURL())
.setColor("BLUE")
.setDescription(`
You have **${total}** invites.

**${regular}** regular
**${bonus}** bonus
**${fake}** fake
**${leave}** leaves

**${daily}** daily
**${weekly}** weekly
`);
message.inlineReply(embed);
};
exports.help = {
  name: 'invites',
  description: "Shows your invites.",
  usage: "pyth invites <user>",
  category: "Invite system",
  cooldown: 5
};