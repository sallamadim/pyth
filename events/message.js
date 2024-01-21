const Discord = require('discord.js');
const { discord, embeds } = require('../config/config')
const { Database } = require('quickmongo')
const db = new Database(discord.mongourl, "pythdb")
/**
 * 
 * @param {Discord.Message} message 
 * @returns 
 */
module.exports = async message => {
let prefix = "py"
let prefixes = ["Py"]
let client = message.client;
if (message.author.bot) return;
if (message.channel.type === 'dm') return;
const prefixler = await db.fetch(`prefixes.${message.guild.id}`)
let bl = await db.fetch(`bl.${message.author.id}`)
if(prefixler && prefixler.length >= 1) {
prefixler.some(c => {
if(message.content.startsWith(c)) prefix = c;
});
};
for(var i = 0; i < prefixes.length; i++) {
if(message.content.startsWith(prefixes[i])) prefix = prefixes[i]
}
if (message.content.startsWith(prefix)) {
var command;
var params;
if(prefix.includes(' ')) {
command = message.content.split(' ')[1];
params = message.content.split(' ').slice(2);
} else {
command = message.content.split(' ')[0].slice(prefix.length);
params = message.content.split(' ').slice(1);
}
let cmd;
if (client.commands.has(command)) {
cmd = client.commands.get(command);
} else if (client.aliases.has(command)) {
cmd = client.commands.get(client.aliases.get(command));
}
if (cmd) {
if(bl){
errorEmbed(`OH NO!!!!

You just added blacklist by my owner.
Reason: \`${bl}\`
`)
}
if(client.cooldowns.has(`${command}_${message.author.id}`)) {
const finish = client.cooldowns.get(`${command}_${message.author.id}`)
const date = new Date();
const f = (new Date(finish - date).getTime() / 1000).toFixed(2);
return message.channel.send(`${client.emotes.error} | You need to wait \`${f} seconds\` to use this command again.`);
}

const finish = new Date();
finish.setSeconds(finish.getSeconds() + cmd.help.cooldown);
cmd.run(client, message, params);
if (cmd.help.cooldown > 0) {
client.cooldowns.set(`${command}_${message.author.id}`, finish);
setTimeout(() => {
client.cooldowns.delete(`${command}_${message.author.id}`);
}, cmd.help.cooldown * 1000);
}
}
}

async function errorEmbed(msg) {
const embed = new Discord.MessageEmbed()
.setDescription(`${client.emotes.error} | ${msg}`)
.setFooter(embeds.footer)
return message.inlineReply(embed)
}
};