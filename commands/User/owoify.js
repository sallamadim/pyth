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
if(!args[0]) return message.inlineReply(`${client.emotes.error} | Invalid arguments!! :c`)
function owoify(msg) {
var words = args
var output = ''
for (var i = 0; i< words.length; i++) {
const element = words[i]
if(!element.startsWith("<@") && !element.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
let format_string = element
.replace(/(?:r|l)/g, 'w')
.replace(/(?:R|L)/g, 'W')
.replace(/(n)([aeiou])/gi, '$1y$2')
.replace(/ove/g, 'uv')
.replace(/th/g, 'ff');
output += format_string + ' ';
} else {
output += element + ' ';
}
}
return output;
}
if (args[0].includes("@everyone")) return message.inlineReply(`${client.emotes.error} | No.`)
if (args[0].includes("@here")) return message.inlineReply(`${client.emotes.error} | No.`)
message.inlineReply(owoify(args))
};
exports.help = {
name: 'owoify',
description: "OwO what is this.",
usage: "pyth owoify",
category: "User",
cooldown: 5
};