const Discord = require('discord.js');
const { discord, embeds } = require('../../config/config')
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
if(message.author.id !== "793463889659822100") return message.inlineReply(`${client.emotes.error} | You are not able to use this command.`)
let code = args.join(" ")
if(!code)return message.channel.send({embed: {description: `Provide a code.`, footer: embeds.footer}})
let evaled = eval(code)
if (typeof evaled !== "string")
evaled = require("util").inspect(evaled).substr(0, 4000)
};
exports.help = {
name: 'eval',
description: "Eval.",
usage: "pyth eval <command>",
category: "Owner",
cooldown: 5
};