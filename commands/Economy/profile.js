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
let user = message.mentions.users.first() || message.author
let data = await db.fetch(`levelUser_${user.id}`) || 0
let chocolate = await db.fetch(`choc.${message.author.id}`) || 0
let yes = await db.fetch(`about.${message.author.id}`) || "pyth profile edit about <text>"
let no = await db.fetch(`background.${message.author.id}`)  || "https://cdn.discordapp.com/attachments/833995069462806562/854413414401966110/cAAAAASUVORK5CYII.png"
if(!args[0]) {
let Canvas = require('discord-canvas')
let image = await new Canvas.RankCard()
.setAvatar(user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setXP("current", data.exp)
.setXP("needed", data.expLimit)
.setLevel(data.level)
.setRank(0)
.setRankName(yes)
.setUsername(user.username)
.setOpacity("avatar", "0.0")
.setOpacity("badges", "0.0")
.setOpacity("level", "0.0")
.setOpacity("background", "0.0")
.setOpacity("reputation", "0.0")
.setOpacity("no-badges", "0.0")
.setBackground(no)
.setReputation(5)
.setRadius(50)
.setText("reputation", `+${chocolate} chocolate`)
.toAttachment();
message.channel.send(new Discord.MessageAttachment(image.toBuffer(), "rankcard.png")).then(ok => ok.channel.send(`${client.emotes.success} | You can use \`pyth profile edit\` to edit anything.`))
} else if(args[0] == "edit") {
if(!args[1]) return message.channel.send(`${client.emotes.error} | Please use only: \`about\`, \`background\`.`)
let ok = ["about", "background"]
if(!ok.includes(args[1])) return message.channel.send(`${client.emotes.error} | Please use only: \`about\`, \`background\`.`)
if(args[1] == "about") {
let aboutMsg = args.slice(2).join(" ")
if(!aboutMsg) await db.delete(`about.${message.author.id}`)
if(aboutMsg.length > 55) return message.inlineReply(`${client.emotes.error} | About msg must be under 55 characters.`)
await db.set(`about.${message.author.id}`, aboutMsg)
return message.channel.send(`${client.emotes.success} | I have set your about to \`${aboutMsg}\``)
} else if (args[1] == "background") {
let ok;
if(message.attachments.first()) {
ok = message.attachments.first().url
await db.set(`background.${message.author.id}`, ok)
return message.inlineReply(`${client.emotes.success} | Background has been set.`)
} else {message.inlineReply(`${client.emotes.error} | Removed your image from your profile.`)
await db.delete(`background.${message.author.id}`)
}
}
}
};
exports.help = {
name: 'profile',
description: "Shows your (users) profile",
usage: "pyth profile [user]",
category: "Economy",
cooldown: 3
};