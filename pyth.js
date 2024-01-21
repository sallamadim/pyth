const Discord = require('discord.js')
const client = new Discord.Client({partials:['MESSAGE','REACTION']})
const fs = require('fs')
const config = require('./config/config')
require('./config/inlineRepl')
require('discord-buttons')(client)
const mongoose = require('mongoose')
const { Database } = require('quickmongo')
const db = new Database(config.discord.mongourl, "pythdb")
mongoose.connect(config.discord.mongourl, {
useUnifiedTopology: true,
useNewUrlParser: true,
useFindAndModify: false
})
db.on("ready", async() => {
console.log("Quickmongo connected to the database.")
})
mongoose.connection.on("connected", () => {
console.log("Mongoose connected to the database.")
})
client.discord = config.discord
client.emotes = config.emojis
client.embed = config.embeds
client.db = db
client.commands = new Discord.Collection()
client.cachedMessageReactions = new Map()
client.aliases = new Discord.Collection()
client.cooldowns = new Discord.Collection()
client.invites = new Discord.Collection()
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
require('./events/eventLoader')(client)
fs.readdir("./commands/", (err, files) => {
if (err) console.error(err)
files.forEach(f => {
fs.readdir(`./commands/${f}/`, (err, filess) => {
if (err) console.error(err)
console.log(`[COMMAND LOADER]: Loaded ${filess.length} command in ${f} category.`)
filess.forEach(fs => {
if(!fs.endsWith(".js")) return
let props = require(`./commands/${f}/${fs}`)
client.commands.set(props.help.name, props)
})
})
})
})
client.on("ready", async() => {
client.guilds.cache.forEach(g => {
g.members.cache.forEach(async m => {
const veri = await db.fetch(`premium.${m.id}`)
if(!veri) return
if((Date.now() <= veri.time) || veri) {
let kalan = veri.time -Date.now()
setTimeout(async() => {
await db.delete(`premium.${m.id}`)
console.log(`[PREMIUM]: ${m.user.tag}'s premium has been ended.`)
}, kalan)
}
})
})
})
client.on("guildCreate", async (guild) => {
const invites = await guild.fetchInvites()
client.invites.set(guild.id, invites)
})
client.on("inviteCreate", async (invite) => {
const gi = client.invites.get(invite.guild.id)
gi.set(invite.code, invite)
client.invites.set(invite.guild.id, gi)
})
client.on("inviteDelete", async (invite) => {
const gi = client.invites.get(invite.guild.id)
gi.delete(invite.code)
client.invites.delete(invite.guild.id, gi)
})
client.on("ready", async() => {
client.guilds.cache.forEach(async (guild) => {
const invites = await guild.fetchInvites().catch(a => console.log(`lol qwe`))
client.invites.set(guild.id, invites)
})
})
client.on("guildMemberAdd", async (member) => {
const db = require('./models/Invite System/inviteGuild')
const inviterSchema = require("./models/Invite System/inviter")
const inviteMemberSchema = require("./models/Invite System/inviteMember")
const channelData = await db.findOne({guild: member.guild.id})
if(!channelData)return
const channel = member.guild.channels.cache.get(channelData.channel)
if (!channel) return
if (member.user.bot) return
const gi = client.invites.get(member.guild.id)
const invites = await member.guild.fetchInvites()
const invite = invites.find((x) => gi.has(x.code) && gi.get(x.code).uses < x.uses) || gi.find((x) => !invites.has(x.code)) || member.guild.vanityURLCode
client.invites.set(member.guild.id, invites)
if (invite === member.guild.vanityURLCode) channel.send(`${client.emotes.memberadd} | ${member} joined! Invited by none. Used vanity url to join server.`)
if (!invite.inviter) return
await inviteMemberSchema.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $set: { inviter: invite.inviter.id, date: Date.now() } }, { upsert: true })
if (Date.now() - member.user.createdTimestamp <= 1000 * 60 * 60 * 24 * 7) {
await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: invite.inviter.id }, { $inc: { total: 1, fake: 1 } }, { upsert: true })
const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: invite.inviter.id })
const total = inviterData ? inviterData.total : 0
channel.send(`${client.emotes.memberadd} | ${member} joined. Invited by **${invite.inviter.tag}**. (Total **${total}** invite(s).)`)
} else {
await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: invite.inviter.id }, { $inc: { total: 1, regular: 1 } }, { upsert: true })
const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: invite.inviter.id })
const total = inviterData ? inviterData.total : 0
channel.send(`${client.emotes.memberadd} | ${member} joined. Invited by **${invite.inviter.tag}**. (Total **${total}** invite(s).)`)
}
})
client.on("guildMemberRemove", async (member) => {
const db = require('./models/Invite System/inviteGuild')
const inviterSchema = require("./models/Invite System/inviter")
const inviteMemberSchema = require("./models/Invite System/inviteMember")
const channelData = await db.findOne({guild: member.guild.id})
if(!channelData)return
const channel = member.guild.channels.cache.get(channelData.channel)
if (!channel) return
if (member.user.bot) return
const inviteMemberData = await inviteMemberSchema.findOne({ guildID: member.guild.id, userID: member.user.id })
if (!inviteMemberData) {
channel.send(`${client.emotes.memberremove} | **${member.user.tag}** left from server, but I could not find who invited them.`)
} else {
const inviter = await client.users.fetch(inviteMemberData.inviter)
await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { leave: 1, total: -1 } }, { upsert: true })
const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: inviter.id, })
const total = inviterData ? inviterData.total : 0
channel.send(`${client.emotes.memberremove} | **${member.user.tag}** left. Invited by **${inviter.tag}**. (Total **${total}** invite(s).)`)
}
})
client.on("clickButton", async (btn) => {
if(btn.id== "delete") {
client.channels.cache.get(btn.channel.id).messages.fetch({
around: btn.message.id,
limit: 1
}).then(messages => {
messages.first().delete()
})
}
})
client.on("clickButton", async (btn) => {
let embed = new Discord.MessageEmbed()
.setDescription(`
User Help Menu - ${client.user.username}

pyth ai {question} | Ask a question to ai.
pyth bot-info | Shows bot info.
pyth embed {options} | Make a private embed.
pyth headpat [user] | Pat yourself, or a user.
pyth owoify {text} | OwO
pyth ping | Ping of the bot.
pyth premium-control | Check your premium control.
pyth server-info | Check server information.
pyth spotify [user] | See your spotify or user's spotify status.
pyth updates | See bot's new updates

Tip: {} = required | [] = optional
To back to help menu type \`pyth help\` again.
`).setFooter(client.embed.footer)
if(btn.id== "user") {
client.channels.cache.get(btn.channel.id).messages.fetch({
around: btn.message.id,
limit: 1
}).then(async messages => {
let ok = messages.first()
ok.delete()
client.channels.cache.get(btn.channel.id).send(embed)
})
}
})
client.on("clickButton", async (btn) => {
let embed = new Discord.MessageEmbed()
.setDescription(`
Moderation Help Menu - ${client.user.username}

pyth ban {member} {reason} | Ban a member from your server
pyth mute {member} {reason} | Mute a member.
pyth muterole {set/create} | Create or chose mute role.
pyth prefix {add/remove/clear} | Add, remove or clear prefixes.
pyth unban {id} | Unbans a member from server.
pyth unmute {member} | Unmute a member. 

Tip: {} = required | [] = optional
To back to help menu type \`pyth help\` again.
`).setFooter(client.embed.footer)
if(btn.id== "mod") {
client.channels.cache.get(btn.channel.id).messages.fetch({
around: btn.message.id,
limit: 1
}).then(messages => {
let ok = messages.first()
ok.delete()
client.channels.cache.get(btn.channel.id).send(embed)
})
}
})
client.on("clickButton", async (btn) => {
let embed = new Discord.MessageEmbed()
.setDescription(`
Invite System Help Menu - ${client.user.username}

pyth invite-channel {set/clear} | Set or clear invite channel.
pyth invite-mod {add/delete/query} | Add, delete or query invites.
pyth invited-users [member] | See invited users.
pyth invites [member] | See your or member's invites.
pyth top | See top invites.

Tip: {} = required | [] = optional
To back to help menu type \`pyth help\` again.
`).setFooter(client.embed.footer)
let embed1 = new Discord.MessageEmbed().setFooter(client.embed.footer)
.setDescription(`
Economy Help Menu - ${client.user.username}

pyth daily | Get daily award.
pyth bal [user] | See [user]('s) balance.
pyth cf {pyos amount} [--tails/--heads] | Play coin flip.
pyth case {info/caseID} | Open or see case info.
pyth drop {pyos amount} | Drop {pyos amount} of pyos to the channel.
pyth pickup {pyos amount} | Pickup {pyos amount} of pyos from the channel.
pyth chocolate {user} | Give chocolate to {user}
pyth profile | See your profile.
pyth shop {id} {ringID} | Shop of {id} and sell or buy {ringID}
pyth marry {user} {ring} | Marry with {user} with {ring}.
pyth divorce | Divorce with married user.

Tip: {} = required | [] = optional
To back to help menu type \`pyth help\` again.
`)
if(btn.id== "invite") {
client.channels.cache.get(btn.channel.id).messages.fetch({
around: btn.message.id,
limit: 1
}).then(messages => {
let ok = messages.first()
ok.delete()
client.channels.cache.get(btn.channel.id).send(embed)
})
} else if(btn.id == "eco") {
client.channels.cache.get(btn.channel.id).messages.fetch({
around: btn.message.id,
limit: 1
}).then(messages => {
let ok = messages.first()
ok.delete()
client.channels.cache.get(btn.channel.id).send(embed)
})
}
})
client.on("message", async (message) => {
if(message.author.bot) return;
const data = await db.fetch(`levelUser_${message.author.id}`)
const randomExp = Math.floor(Math.random()*1+3)
if(data != null) {
await db.set(`levelUser_${message.author.id}`,{
id: message.author.id,
level:data.level,
exp:data.exp+randomExp,
expLimit:data.expLimit,
totalExp:data.totalExp+randomExp
})
}
if(data != null) {
const onlydata = await db.fetch(`levelUser_${message.author.id}`)
if(onlydata.expLimit < onlydata.exp) {
await db.set(`levelUser_${message.author.id}`,{
id:message.author.id,
level:data.level+1,
exp:0,
expLimit:data.expLimit*5,
totalExp:data.totalExp+randomExp
})
let money = 100
let ok = money * data.level || 1
await db.add(`bal.${message.author.id}`, ok)
return message.channel.send(`**${message.author.tag}**, congratulations!!
${client.emotes.success} | Your now level **${data.level}**
${client.emotes.success} | You got **${ok}** pyos.
`)
}
}
if(data == null) {
await db.set(`levelUser_${message.author.id}`, {
id: message.author.id,
level: 1,
exp: randomExp,
expLimit: 100,
totalExp:randomExp
})
}
})
client.on("message", async (message) => {
let knl = "845003215275032636"
if(message.channel.id !== knl)return;
else knl.send(`Yeni kelime **elma**.`)

})
client.login(client.discord.token)