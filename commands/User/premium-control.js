const Discord = require('discord.js');
const { discord, embeds } = require('../../config/config')
const { Database } = require('quickmongo')
const db = new Database(discord.mongourl, "pythdb")
const ms = require('ms');
const moment = require('moment');
moment.locale('en');
require('moment-duration-format');
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {String[]} args 
 * @returns 
 */
exports.run = async (client, message, args) => {
if(await db.has(`premium.${message.author.id}`)) {
const q = await db.fetch(`premium.${message.author.id}`)
message.inlineReply(new Discord.MessageEmbed().setFooter(embeds.footer).setDescription(`
${client.emotes.success} | You have premium access. Your premium expiry in: \`${moment.duration(q.time - Date.now()).format("d [day] h [hour] m [minute] s [seconds]")}\`
`))
} else {
message.inlineReply(`${client.emotes.error} | You dont have premium.`)
}
};
exports.help = {
name: 'premium-control',
description: "Check your premium time.",
usage: "pyth premium-control",
category: "User",
cooldown: 8
};