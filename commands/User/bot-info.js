const Discord = require('discord.js');
const { discord, embeds } = require('../../config/config')
const { Database } = require('quickmongo')
const db = new Database(discord.mongourl, `pythdb`)
const moment = require(`moment`);
moment.locale(`en`);
require('moment-duration-format')
const os = require('os')
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {String[]} args 
 * @returns 
 */
exports.run = async (client, message, args) => {
const duration = moment.duration(client.uptime).format(
`D [day] H [hour], m [minute], s [second]`
)
const stats = new Discord.MessageEmbed()
.setDescription(`:bar_chart: **${client.user.username} Stats**`)
.addField(`${client.emotes.dev} | Developer`,`:white_small_square: **Developer** <@793463889659822100>`)
.addField(`:earth_americas: | Information`, `\n :white_small_square: Server count: **${client.guilds.cache.size}** \n :white_small_square: User count: **${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}** \n :white_small_square: Channel count: **${client.channels.cache.size}** \n :white_small_square: Ping: **${client.ws.ping}ms** \n :white_small_square: Uptime: **${duration}**`,true)
.addField(`${client.emotes.information} | Versions`, `\n :white_small_square: Discord.js version: **v${Discord.version}** \n :white_small_square: Node.js version: **${process.version}** \n :white_small_square: Database: **mongoose**`,true)
.addField(`${client.emotes.bot} | Other Information`, `:white_small_square: DBL (top.gg): **${client.emotes.error} Not approved** \n :white_small_square: Database Status: **${client.emotes.success} | Great, working**`)
.setFooter(embeds.footer)
message.inlineReply(stats)
};
exports.help = {
name: 'bot-info',
description: `Shows bot info.`,
usage: `pyth bot-info`,
category: `User`,
cooldown: 5
};