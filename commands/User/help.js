const Discord = require('discord.js');
const { discord, embeds } = require('../../config/config')
const {MessageButton, MessageActionRow} = require('discord-buttons')
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {String[]} args 
 * @returns 
 */
exports.run = async (client, message, args) => {
const embed = new Discord.MessageEmbed()
.setDescription(`
Hi, my name is Pyth!!
I'm a powerful bot for your server :3

To see my commands click the buttons below this embed!! :3
`).setFooter(client.embed.footer)
let button = new MessageButton()
.setLabel("User")
.setStyle("red")
.setID("user")
let button2 = new MessageButton()
.setLabel("Moderation")
.setID("mod")
.setStyle("red")
let button3 = new MessageButton()
.setLabel("Invite System")
.setID("invite")
.setStyle("red")
let button4 = new MessageButton()
.setLabel("Economy")
.setID("eco")
.setStyle("yellow")
let button5 = new MessageButton()
.setLabel("Delete Message")
.setID("delete")
.setStyle("red")

let row = new MessageActionRow()
.addComponent(button)
.addComponent(button2)
let row2 = new MessageActionRow()
.addComponent(button3)
.addComponent(button4)
.addComponent(button5)
await message.channel.send('', {embed: embed, components: [row, row2]})
};
exports.help = {
name: 'help',
description: `Help command.`,
usage: `pyth help`,
category: `User`,
cooldown: 8
};