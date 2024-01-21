const Discord = require('discord.js');
const tools = require('../../config/pyth-tools')
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {String[]} args 
 * @returns 
 */
exports.run = async (client, message, args) => {
const yerler = 
["en" , "ar" , "cn" , "de" , "es" , "fr" , "il" , "it" , "jp" , "kr" , "nl" , "pl" , "pt" , "ru" , "tr" , "id"]
const yer = args[0]
if(!yer) return message.channel.send(client.emotes.error + "You need to select a region. (regions: en, ar, cn, de, es, fr, il, it, jp, kr, nl, pl, pt, ru, tr, id)")
if(!yerler.includes(yer)) return message.channel.send(client.emotes.error + "You need to select a region. (regions: en, ar, cn, de, es, fr, il, it, jp, kr, nl, pl, pt, ru, tr, id)")
tools.aki(message, client, yer)
};
exports.help = {
name: 'aki',
description: `aki`,
usage: `pyth aki`,
category: `User`,
cooldown: 4
};