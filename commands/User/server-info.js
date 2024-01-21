const Discord = require('discord.js');
const { embeds } = require('../../config/config')
const moment = require("moment");
moment.locale("en");
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {String[]} args 
 * @returns 
 */
exports.run = async (client, message, args) => {
const guild = message.guild
let animated = guild.emojis.cache.filter(x => x.animated).size
let normal = guild.emojis.cache.filter(x => !x.animated).size
let create = `${moment(guild.createdAt).format("LL")} | ${moment(
guild.createdAt
).fromNow()}`;
let region = guild.region
let verification = guild.verificationLevel
let notifications = guild.defaultMessageNotifications
let Features = {
ANIMATED_ICON: "Animated icon",
banner: "Banner",
COMMERCE: "Commerce",
COMMUNITY: "Community",
DISCOVERABLE: "Discoverable",
FEATURABLE: "Featurable",
INVITE_SPLASH: "Invite splash",
NEWS: "News channel",
PARTNERED: "Partnered server",
VANITY_URL: "Vanity url",
VERIFIED: "Verified server",
WELCOME_SCREEN_ENABLED: "Welcome screen enabled",
MEMBER_VERIFICATION_GATE_ENABLED: "Member verification gate enabled",
VIP_REGIONS: "Vip regions",
PREVIEW_ENABLED: "Preview enabled"
};
let boost = guild.premiumSubscriptionCount;
let owner = await client.users.fetch(guild.ownerID);
const embed = new Discord.MessageEmbed()
.setTitle(guild.name)
.setThumbnail(guild.iconURL({ dynamic: true }))
.addField(
`≽ Server information`,
`
ID **>** ${guild.id}
Owner **>** ${"<@" + owner + "> / " + owner.tag || "Cannot find owner of the server"}
Region **>** ${region}
Verification level **>** ${verification}
Created at **>** ${create}
`
)
.addField(
`≽ Server statics`,
`
Roles size **>** ${
guild.roles.cache.size < 1 ? "Total roles" : guild.roles.cache.size
}
Boost count **>** ${boost < 1 ? "No boost" : boost}
Boost level **>** ${
guild.premiumTier < 1 ? "No boost" : guild.premiumTier
}
AFK channel **>** ${
guild.afkChannelID == null
? "No AFK channel"
: "<#" + guild.afkChannelID + ">"
}
AFK time **>** ${guild.afkTimeout / 60} minutes
Default notifications **>** ${notifications}
`
)
.addField(
`≽ Server Members (${guild.members.cache.size})`,
`
${client.emotes.idle} Idle **>** ${guild.members.cache.filter(a => a.presence.status == "idle").size}
${client.emotes.dnd} Do not disturb **>** ${guild.members.cache.filter(a => a.presence.status === "dnd").size}
${client.emotes.online} Online **>** ${guild.members.cache.filter(a => a.presence.status === "online").size}
${client.emotes.offline} Offline **>** ${guild.members.cache.filter(a => a.presence.status === "offline").size}
${client.emotes.bot} Bot(s) **>** ${guild.members.cache.filter(a => a.user.bot).size}
`
)
.addField(
`≽ Server Channels (${guild.channels.cache.size})`,
`
<:pyth_voicechannel:835089114444726272> Voice channels **>** ${guild.channels.cache.filter(x => x.type == "voice").size}
<:pyth_textchannel:835089397060993065> Text channels **>** ${guild.channels.cache.filter(x => x.type == "text").size}
<:pyth_category:851429135197011978> Categories **>** ${guild.channels.cache.filter(x => x.type == "category").size}
<:pyth_rules:835089508633411605> Rules channel **>** ${guild.rulesChannelID == null? "No rules channel": "<#" + guild.rulesChannelID + ">"}
`
)
.addField(
`≽ Server Emojis (${guild.emojis.cache.size})`,
`
Animated **>** ${animated}
Nonanimated **>** ${normal}
Total **>** ${guild.emojis.cache.size}
`
)
.addField(
`≽ Server features (${guild.features.length})`,
`${guild.features.map(a => Features[a] || a).join(", ") ||
"No features"}`
)
.setFooter(embeds.footer)
if (guild.banner != null)return embed.setImage(guild.bannerURL({ size: 2048, format: "png" }));
message.inlineReply(embed);
};
exports.help = {
name: 'server-info',
description: "Shows server info.",
usage: "pyth server-info",
category: "User",
cooldown: 5
};