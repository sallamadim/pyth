const { MessageEmbed, Message, Client } = require("discord.js");
const db = require('../../models/Invite System/inviter')
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 * @returns 
 */
exports.run = async (client, message, args) => {
let data = await db.find({ guildID: message.guild.id }).sort({ total: -1 });
if(!data)return message.inlineReply(`${client.emotes.error} | Cannot find any invite data.`)
let arr = []
data.forEach((x) => arr.push({
id: x.userID,
total: x.total
}))
let index = arr.findIndex((x) => x.id == message.author.id) + 1
let list = data
.filter((x) => message.guild.members.cache.has(x.userID))
.splice(0, 10)
.map((x, index) => `${x.userID === message.author.id ? `**${index + 1}. <@${x.userID}> - Total ${x.total} invite (${x.regular} regular, ${x.bonus} bonus, ${x.fake} fake, ${x.leave} leaves)**` : `**${index + 1}. <@${x.userID}> - Total ${x.total} invite (${x.regular} regular, ${x.bonus} bonus, ${x.fake} fake, ${x.leave} leaves)`}**`)
.join("\n");
var veri = await db.findOne({
guildID: message.guild.id, 
userID: message.author.id
})
if(index < 10) {
message.inlineReply(new MessageEmbed().setTitle("Invite leaderboard")
.setDescription(list)
)
}else{
message.inlineReply(new MessageEmbed().setTitle("Invite leaderboard")
.setDescription(`${list} \n... \n**${index}. ${message.author} Total ${veri.total} invite (${veri.regular} regular, ${veri.bonus} bonus, ${veri.fake} fake, ${veri.leave} leaves)**`)
)
}
};
exports.help = {
  name: 'leaderboard',
  description: "Shows guild leaderboard.",
  usage: "pyth leaderboard",
  category: "Invite system",
  cooldown: 5
};