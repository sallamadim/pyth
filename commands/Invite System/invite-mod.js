const { MessageEmbed, Message, Client } = require("discord.js");
const inviterSchema = require('../../models/Invite System/inviter')
const inviteMemberSchema = require('../../models/Invite System/inviteMember')
const moment = require('moment')
moment.locale("en")
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 * @returns 
 */
exports.run = async (client, message, args) => {
const member = message.mentions.members.first() 
if(!message.member.hasPermission("ADMINISTRATOR")) return message.inlineReply(`${client.emotes.error} | You are not able to use this command.`)
if(!args[0]) {return message.inlineReply(new MessageEmbed()
.setDescription(`
${client.emotes.error} | Wrong usage!!
Examples:
\`pyth invite-mod add @member 1\`
\`pyth invite-mod delete @member 2\`
\`pyth invite-mod query @member\`
`)
)
}else{
if(args[0] == "add"){
const amount = args[2]
if(!member) return message.inlineReply(`${client.emotes.error} | Mention a member.`)
if(!amount)return message.inlineReply(`${client.emotes.error} | Please provide an amount.`)
if(isNaN(amount)) return message.inlineReply(`${client.emotes.error} | Thats not a number.`)
await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { total: parseInt(amount), bonus: parseInt(amount) } }, { upsert: true });
message.inlineReply(`${client.emotes.success} | Added **${amount}** invites to ${member}.`)
}else{
if(args[0] == "delete"){
const amount = args[2]
if(!member) return message.inlineReply(`${client.emotes.error} | Mention a member.`)
if(!amount)return message.inlineReply(`${client.emotes.error} | Please provide an amount.`)
if(isNaN(amount)) return message.inlineReply(`${client.emotes.error} | Thats not a number.`)
const data = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
if(!data) return message.inlineReply(`${client.emotes.error} | ${member} dont have enough invites.`)
else{
data.total -= parseInt(amount)
data.bonus -= parseInt(amount);
data.save()
}
return message.inlineReply(`${client.emotes.success} | Tooked **${amount}** invites from ${member}.`)
}else{
if(args[0] == "query"){
if(!member) return message.inlineReply(`${client.emotes.error} | Mention a member.`)
const data = await inviteMemberSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
if(!data) return message.inlineReply(`${client.emotes.error} | Cannot find who invited ${member}.`)
else{
const inviter = await client.users.fetch(data.inviter);
message.inlineReply(new MessageEmbed().setDescription(`
Member ${member}, invited by \`${inviter.tag}\` in ${moment(data.date).format("LLL")}.
`))
}
}
}
}
}
};
exports.help = {
name: 'invite-mod',
description: "Use invite mod.",
usage: "pyth invite-mod add/delete/query",
category: "Invite system",
cooldown: 5
};