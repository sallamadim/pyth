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
message.inlineReply(`Pong! :ping_pong: **${client.ws.ping}**MS!`)
};
exports.help = {
name: 'ping',
description: "Shows the bot's ping.",
usage: "pyth ping",
category: "User",
cooldown: 3
};