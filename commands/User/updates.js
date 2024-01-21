const Discord = require('discord.js');
const {JsonDatabase}=require('wio.db')
const db = new JsonDatabase("pythdb.json")
const moment = require(`moment`);
moment.locale(`en`);
require('moment-duration-format')
const os = require('os');
const { embeds } = require('../../config/config');
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {String[]} args 
 * @returns 
 */
exports.run = async (client, message, args) => {
if(!await db.fetch(`updates`) || db.fetch('updates').length <= 0) return message.inlineReply(`${client.emotes.error} | There is no update avaliable at this time.`)
let pages = []
let page = 1
await db.fetch(`updates`).sort((a, b) => b.number- a.number).forEach(data => {
pages.push(new Discord.MessageEmbed()
.setAuthor(`Update: #`+data.number)
.setDescription(data.title)
.addField(`Description:`, '・ '+data.description.split('\n').join('\n・ '))
.setFooter(embeds.footer)
)
})
message.inlineReply(pages[0]).then(m => {
m.react('⬅').then(() => m.react('➡'));
const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;
const backwards = m.createReactionCollector(backwardsFilter, { time: 0 });
const forwards = m.createReactionCollector(forwardsFilter, { time: 0 });
forwards.on('collect', (reaction, user) => {
if(page === pages.length) {
page = 0;
};
page++;
reaction.users.remove(user.id);
m.edit(pages[page-1]);
})
backwards.on('collect', (reaction, user) => {
console.log(page);
if(page <= 1) {
page = pages.length+1;
};
reaction.users.remove(user.id);
page--;
m.edit(pages[page-1]);
})
})
};
exports.help = {
name: 'updates',
description: `Show updates.`,
usage: `pyth updates`,
category: `User`,
cooldown: 13
};