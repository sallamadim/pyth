const Discord = require('discord.js');
const { discord, embeds } = require('../../config/config')
const { Database } = require('quickmongo')
const exec = require('child_process').exec
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
if(!args.slice(0).join(" ")) return message.inlineReply(`${client.emotes.error} | h.`)
exec(args.slice(0).join(" "), (e, q) =>{
let a;
if(e) a = e;
if(q) a = q;
message.inlineReply(new Discord.MessageEmbed().setFooter(embeds.footer)
.addField(`Command:`, `**${args.slice(0).join(" ")}**`, true)
.addField(`Output:`, `\`\`\`js\n${a}\n\`\`\``, true)
)
})
};
exports.help = {
name: 'exec',
description: "Executes a command in terminal of bot.",
usage: "pyth exec <command>",
category: "Owner",
cooldown: 5
};