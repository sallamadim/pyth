const Discord = require('discord.js');
const { discord } = require('../../config/config')
const { Database } = require('quickmongo')
const db = new Database(discord.mongourl, "pythdb")
const pet = require('pet-pet-gif')
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {String[]} args 
 * @returns 
 */
exports.run = async (client, message, args) => {
const user = message.mentions.users.first() || message.author
let petpet = await pet(user.avatarURL({
format: "png"
}))
const attachment = new Discord.MessageAttachment(petpet, "petpet.gif")
message.inlineReply(`${user} pat's ${user}`, attachment)
};
exports.help = {
name: 'headpat',
description: "Pat pat.",
usage: "pyth headpat",
category: "User",
cooldown: 7
};