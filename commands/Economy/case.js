const Discord = require('discord.js');
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {String[]} args 
 * @returns 
 */
exports.run = async (client, message, args) => {
const coalP = [450, 500, 600, 650, 700]
const ironP = [900, 950, 1000, 1100, 1150]
const goldP = [1900, 1950, 2000, 2100, 2150]
const diamondP = [4500, 5000, 5500, 6000]
const emP = [9000, 10000, 10500, 11000]
const ametyP = [14000, 14500, 15000, 15500, 16000]
const rubyP = [19000, 19500, 20000, 20500, 21000]
const sappP = [29000, 29500, 30000, 30500, 31000]
const preP= [1625132698191,1625046477661,1624960125415,1624877347461]
const db = client.db
let bal = await db.fetch(`bal.${message.author.id}`)
let p = args[0]
if(!p) return message.inlineReply(`${client.emotes.error} | Please use only: info/caseID to use.`)
let a = ["info", "coal","iron","gold","diamond","emerald","amethyst","ruby","sapphire","premium"]
if(!a.includes(p)) return message.inlineReply(`${client.emotes.error} | This is not a valid id of cases. Or you want to see info of the cases? Type: \`pyth case info\``)
if(p == "info") {
message.inlineReply(new Discord.MessageEmbed().setTitle("Cases and their infos").addField(`**Coal case**`, `
**ID:** \`coal\`
**Pyos:** \`500\`
**You can get:** \`450, 500, 600, 650, 700\` pyos.
**Buy:** \`pyth case coal\`
`, true).addField(`**Iron case**`, `
**ID:** \`iron\`
**Pyos:** \`1000\`
**You can get:** \`900, 950, 1000, 1100, 1150\` pyos.
**Buy:** \`pyth case iron\`
`, true).addField(`**Gold case**`, `
**ID:** \`gold\`
**Pyos:** \`2000\`
**You can get:** \`1900, 1950, 2000, 2100, 2150\` pyos.
**Buy:** \`pyth case gold\`
`, true).addField(`**Diamond case**`, `
**ID:** \`diamond\`
**Pyos:** \`5000\`
**You can get:** \`4500, 5000, 5500, 6000\` pyos.
**Buy:** \`pyth case diamond\`
`, true).addField(`**Emerald case**`, `
**ID:** \`emerald\`
**Pyos:** \`10000\`
**You can get:** \`9000, 10000, 10500, 11000\` pyos.
**Buy:** \`pyth case emerald\`
`, true).addField(`**Amethyst case**`, `
**ID:** \`amethyst\`
**Pyos:** \`15000\`
**You can get:** \`14000, 14500, 15000, 15500, 16000\` pyos.
**Buy:** \`pyth case amethyst\`
`, true).addField(`**Ruby case**`, `
**ID:** \`ruby\`
**Pyos:** \`20000\`
**You can get:** \`19000, 19500, 20000, 20500, 21000\` pyos.
**Buy:** \`pyth case ruby\`
`, true).addField(`**Sapphire case**`, `
**ID:** \`sapphire\`
**Pyos:** \`30000\`
**You can get:** \`29000, 29500, 30000, 30500, 31000\` pyos.
**Buy:** \`pyth case sapphire\`
`, true).addField(`**Premium case**`, `
**ID:** \`premium\`
**Pyos:** \`300000\`
**You can get:** \`1 hour premium, 1 day premium, 2 day premium, 3 day premium.\`
**Buy:** \`pyth case premium\`
**See premium exclusive:** \`pyth premium-exclusive\`
`)
)
} else if(p == "coal") {
if(bal < 500) return message.inlineReply(`${client.emotes.error} | You dont have enough pyos.`)
const p = coalP[Math.floor(Math.random() * coalP.length)]
await db.add(`bal.${message.author.id}`, p)
await db.subtract(`bal.${message.author.id}`, 500)
return message.inlineReply(`${client.emotes.success} | You got **${p}** pyos from the case.`)
} else if(p == "iron") {
if(bal < 1000) return message.inlineReply(`${client.emotes.error} | You dont have enough pyos.`)
const p = ironP[Math.floor(Math.random() * ironP.length)]
await db.add(`bal.${message.author.id}`, p)
await db.subtract(`bal.${message.author.id}`, 1000)
return message.inlineReply(`${client.emotes.success} | You got **${p}** pyos from the case.`)
} else if(p == "gold") {
if(bal < 2000) return message.inlineReply(`${client.emotes.error} | You dont have enough pyos.`)
const p = goldP[Math.floor(Math.random() * goldP.length)]
await db.add(`bal.${message.author.id}`, p)
await db.subtract(`bal.${message.author.id}`, 2000)
return message.inlineReply(`${client.emotes.success} | You got **${p}** pyos from the case.`)
} else if(p == "diamond") {
if(bal < 5000) return message.inlineReply(`${client.emotes.error} | You dont have enough pyos.`)
const p = diamondP[Math.floor(Math.random() * diamondP.length)]
await db.add(`bal.${message.author.id}`, p)
await db.subtract(`bal.${message.author.id}`, 5000)
return message.inlineReply(`${client.emotes.success} | You got **${p}** pyos from the case.`)
} else if(p == "emerald") {
if(bal < 10000) return message.inlineReply(`${client.emotes.error} | You dont have enough pyos.`)
const p = emP[Math.floor(Math.random() * emP.length)]
await db.add(`bal.${message.author.id}`, p)
await db.subtract(`bal.${message.author.id}`, 10000)
return message.inlineReply(`${client.emotes.success} | You got **${p}** pyos from the case.`)
} else if(p == "amethyst") {
if(bal < 15000) return message.inlineReply(`${client.emotes.error} | You dont have enough pyos.`)
const p = ametyP[Math.floor(Math.random() * ametyP.length)]
await db.add(`bal.${message.author.id}`, p)
await db.subtract(`bal.${message.author.id}`, 15000)
return message.inlineReply(`${client.emotes.success} | You got **${p}** pyos from the case.`)
} else if(p == "ruby") {
if(bal < 20000) return message.inlineReply(`${client.emotes.error} | You dont have enough pyos.`)
const p = rubyP[Math.floor(Math.random() * rubyP.length)]
await db.add(`bal.${message.author.id}`, p)
await db.subtract(`bal.${message.author.id}`, 20000)
return message.inlineReply(`${client.emotes.success} | You got **${p}** pyos from the case.`)
} else if(p == "sapphire") {
if(bal < 30000) return message.inlineReply(`${client.emotes.error} | You dont have enough pyos.`)
const p = sappP[Math.floor(Math.random() * sappP.length)]
await db.add(`bal.${message.author.id}`, p)
await db.subtract(`bal.${message.author.id}`, 30000)
return message.inlineReply(`${client.emotes.success} | You got **${p}** pyos from the case.`)
} else if(p == "premium") {
if(await db.has(`premium.${message.author.id}`)) return message.inlineReply(`${client.emotes.error} | You already have premium.`)
if(bal < 300000) return message.inlineReply(`${client.emotes.error} | You dont have enough pyos.`)
const a = preP[Math.floor(Math.random() * preP.length)]
await db.subtract(`bal.${message.author.id}`, 300000)
await db.set(`premium.${message.author.id}`, {
time: a,
start: Date.now()
})
message.inlineReply(`${client.emotes.success} | You got premium access now. Type \`pyth premium-control\` to see how much time left. Type \`pyth premium-advantage\` to see premium advantage.`)
}
};
exports.help = {
name: 'case',
description: "See case info or use case.",
usage: "pyth case info/use",
category: "Economy",
cooldown: 5
};