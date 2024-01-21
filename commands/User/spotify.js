const Discord = require('discord.js');
const canvacord = require('canvacord')
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {String[]} args 
 * @returns 
 */
exports.run = async (client, message, args) => {
const user = message.author || message.mentions.users.first()
let Activity = user.presence.activities
user.presence.activities.forEach(activity => {
if (activity.type === "LISTENING" && activity.name === "Spotify") {
let image = `https://i.scdn.co/image/${activity.assets.largeImage.slice(8)}`
const card = new canvacord.Spotify()
.setAuthor(activity.state)
.setAlbum(activity.assets.largeText)
.setStartTimestamp(activity.timestamps.start)
.setEndTimestamp(activity.timestamps.end)
.setImage(image)
.setBackground("COLOR", "000001")
.setTitle(activity.details);
card.build().then(Card => {
return message.inlineReply(
new Discord.MessageAttachment(Card, "spotify.png")
);
})
} else {
return message.inlineReply(`${client.emotes.error} | Spotify listening is not found.`)
}
})
};
exports.help = {
name: 'spotify',
description: "Shows user what listing on the spotify.",
usage: "pyth spotify",
category: "User",
cooldown: 10
};