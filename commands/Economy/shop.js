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
let bal = await db.fetch(`bal.${message.author.id}`)
var inv = await db.fetch(`inv.${message.author.id}`) || []
let a = args[0]
if(!a) return message.channel.send(new Discord.MessageEmbed()
.setDescription(`
Please provide a id.

Shop names their id:

\`Ring shop:\`
**Id:** \`1\`
**Description:** \`You can buy rings and marry with other users.\`
**Usage:** \`pyth shop 1\`

\`Buy:\`
**Id:** \`buy\`
**Description:** \`You can buy rings and other things.\`
**Usage:** \`pyth shop buy\`

\`Sell:\`
**Id:** \`sell\`
**Description:** \`You can sell rings and other things.\`
**Usage:** \`pyth shop sell\`
`))
if(a == "1") {
let ring = args[1]
if(!ring) return message.channel.send(new Discord.MessageEmbed()
.setDescription(`Wrong ring id!!
Ring name and ids:

\`Coal ring:\`
**Id:** \`coal\`
**Description:** \`This is coal ring. You can buy it if you don't want to lose pyos. Nobody prefers it because it is not very flashy.\`
**Pyos:** \`750\`
**Sell amount:** \`375\`
**To buy:** \`pyth shop buy coal\`
**To sell:** \`pyth shop sell coal\`

\`Iron ring:\`
**Id:** \`iron\`
**Description:** \`This is iron ring. If you want a simpler ring without losing a lot of pyos, you can buy it.\`
**Pyos:** \`1500\`
**Sell amount:** \`750\`
**To buy:** \`pyth shop buy iron\`
**To sell:** \`pyth shop sell iron\`

\`Gold ring:\`
**Id:** \`gold\`
**Description:** \`This is gold ring. If you want to spend more pyos and buy a better quality ring, this is for you!\`
**Pyos:** \`3000\`
**Sell amount:** \`1500\`
**To buy:** \`pyth shop buy gold\`
**To sell:** \`pyth shop sell gold\`

\`Diamond ring:\`
**Id:** \`diamond\`
**Description:** \`This is diamond ring. If you want to spend a lot of pyos, this is for you. Perhaps the best ring will tell your story.\`
**Pyos:** \`6000\`
**Sell amount:** \`3000\`
**To buy:** \`pyth shop buy diamond\`
**To sell:** \`pyth shop sell diamond\`

*will be added more soon*
`)
)
} else {
if(a == "buy") {
let id = args[1]
let ids = ["coal", "iron", "gold", "diamond"]
if(!id) return message.inlineReply(`${client.emotes.error} | Please provide a id for buy it.`)
if(!ids.includes(id)) return message.inlineReply(`${client.emotes.error} | Thats not a valid id.`)
if(id == "coal") {
if(inv.includes("coalRing")) return message.inlineReply(`${client.emotes.error} | You already have this ring. Please sell it first to buy again.`)
if(bal < 750) return message.inlineReply(`${client.emotes.error} | You dont have enough pyos.`)
await db.push(`inv.${message.author.id}`, "coalRing")
await db.subtract(`bal.${message.author.id}`, 750)
return message.inlineReply(`${client.emotes.pyos} | You have bought **coal ring** for 750 pyos.`)
} else if(id == "iron") {
if(inv.includes("ironRing")) return message.inlineReply(`${client.emotes.error} | You already have this ring. Please sell it first.`)
if(bal < 1500) return message.inlineReply(`${client.emotes.error} | You dont have enough pyos.`)
await db.push(`inv.${message.author.id}`, "ironRing")
await db.subtract(`bal.${message.author.id}`, 1500)
return message.inlineReply(`${client.emotes.pyos} | You have bought **iron ring** for 1500 pyos.`)
} else if(id == "gold") {
if(inv.includes("goldRing")) return message.inlineReply(`${client.emotes.error} | You already have this ring. Please sell it first.`)
if(bal < 3000) return message.inlineReply(`${client.emotes.error} | You dont have enough pyos.`)
await db.push(`inv.${message.author.id}`, "goldRing")
await db.subtract(`bal.${message.author.id}`, 3000)
return message.inlineReply(`${client.emotes.pyos} | You have bought **gold ring** for 3000 pyos.`)
} else if(id == "diamond") {
if(inv.includes("diamondRing")) return message.inlineReply(`${client.emotes.error} | You already have this ring. Please sell it first.`)
if(bal < 6000) return message.inlineReply(`${client.emotes.error} | You dont have enough pyos.`)
await db.push(`inv.${message.author.id}`, "diamondRing")
await db.subtract(`bal.${message.author.id}`, 6000)
return message.inlineReply(`${client.emotes.pyos} | You have bought **diamond ring** for 6000 pyos.`)
}
} else if(a == "sell") {
let id = args[1]
let ids = ["coal", "iron", "gold", "diamond"]
if(!id) return message.inlineReply(`${client.emotes.error} | Please provide a id for sell it.`)
if(!ids.includes(id)) return message.inlineReply(`${client.emotes.error} | Thats not a valid id.`)
if(id == "coal") {
if(!inv.includes("coalRing")) return message.inlineReply(`${client.emotes.error} | You dont have this ring.`)
if(await db.has(`marry.${message.author.id}`)) return message.inlineReply(`${client.emotes.error} | You're married! Divorce at first, then sell the ring!`)
let arr = []
arr = inv
arr = arr.filter((x) => x !== "coalRing")
await db.set(`inv.${message.author.id}`, arr)
await db.subtract(`bal.${message.author.id}`, 375)
message.channel.send(`${client.emotes.pyos} | You have sold **coal ring** for 375 pyos.`)
}
if(id == "iron") {
if(!inv.includes("ironRing")) return message.inlineReply(`${client.emotes.error} | You dont have this ring.`)
if(await db.has(`marry.${message.author.id}`)) return message.inlineReply(`${client.emotes.error} | You're married! Divorce at first, then sell the ring!`)
let arr = []
arr = inv
arr = arr.filter((x) => x !== "ironRing")
await db.set(`inv.${message.author.id}`, arr)
await db.subtract(`bal.${message.author.id}`, 750)
message.channel.send(`${client.emotes.pyos} | You have sold **iron ring** for 750 pyos.`)
}
if(id == "gold") {
if(!inv.includes("goldRing")) return message.inlineReply(`${client.emotes.error} | You dont have this ring.`)
if(await db.has(`marry.${message.author.id}`)) return message.inlineReply(`${client.emotes.error} | You're married! Divorce at first, then sell the ring!`)
let arr = []
arr = inv
arr = arr.filter((x) => x !== "goldRing")
await db.set(`inv.${message.author.id}`, arr)
await db.subtract(`bal.${message.author.id}`, 1500)
message.channel.send(`${client.emotes.pyos} | You have sold **gold ring** for 1500 pyos.`)
}
if(id == "diamond") {
if(!inv.includes("diamondRing")) return message.inlineReply(`${client.emotes.error} | You dont have this ring.`)
if(await db.has(`marry.${message.author.id}`)) return message.inlineReply(`${client.emotes.error} | You're married! Divorce at first, then sell the ring!`)
let arr = []
arr = inv
arr = arr.filter((x) => x !== "diamondRing")
await db.set(`inv.${message.author.id}`, arr)
await db.subtract(`bal.${message.author.id}`, 3000)
message.channel.send(`${client.emotes.pyos} | You have sold **diamond ring** for 3000 pyos.`)
}
}
}
};
exports.help = {
name: 'shop',
description: "Shop.",
usage: "pyth shop {id/buy/sell} {itemName}",
category: "Economy",
cooldown: 3
};