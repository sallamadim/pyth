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
if(!message.member.hasPermission("ADMINISTRATOR")) return message.inlineReply(`${client.emotes.error} | You are not able to use this command.`)
if(!args[0]) return message.inlineReply(`${client.emotes.error} | Mention a role or type: \`pythmute-role create\`.`)
if(args[0] == "create") {
message.guild.roles.create({
data: {
name: args.slice(1).join(" ") || "Muted",
color: "#f4424b"
}
}).then(role => {
role.setPermissions(0)
message.inlineReply(`${client.emotes.success} | Successfully created the role. Making overwrites now. You will receive a message once I'm done.`)
var i = 0;
let q = message.guild.channels.cache.filter(a => a.type === "text").array()
for (const k in q) {
q[k].createOverwrite(role.id, {
SEND_MESSAGES: false,
ADD_REACTIONS: false
})
i++;
}
db.set(`mute-role.${message.guild.id}`, role.id)
return message.inlineReply(`${client.emotes.success} | Success! The role named **${role.name}** has been created. All overwrites for channels are done!`)
})
}
if(args[0] == "set") {
const role = message.mentions.roles.first()
if(!role) return message.inlineReply(`${client.emotes.error} | Mention a role.`)
db.set(`mute-role.${message.guild.id}`, role.id)
return message.inlineReply(`${client.emotes.success} | Set **${role.name}** as the mute role.`)
}
};
exports.help = {
name: 'mute-role',
description: "Set's mute role for the server.",
usage: "pyth mute-role @role / create",
category: "Moderation",
cooldown: 5
};