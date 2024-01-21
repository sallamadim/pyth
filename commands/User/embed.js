const {MessageEmbed}= require('discord.js')
exports.run = async (client, message, args) => {
let fieldName
let fieldValue
let author
let desc
let footer
let title
message.channel.send("So firstly, you need to provide a title of the embed. (required)")
.then(() => {
message.channel.awaitMessages(response => message.content, {
max: 1,
time: 50000,
errors: [
'time'
]
})
.then(collected => {
if(collected.first().content.length > 150) {
message.channel.send("Title must be under 150 characters.")
} else {
title = collected.first().content
message.channel.send("Title successfully set. Now set the description. (required)")
.then(() => {
message.channel.awaitMessages(response => message.content, {
max: 1,
time: 50000,
errors: [
'time'
]
})
.then(c => {
if(c.first().content.length > 200) {
message.channel.send("Description must be under 200 characters.")
} else {
desc = c.first().content
message.channel.send("Description successfully set. Now set the footer. (required)")
.then(() => {
message.channel.awaitMessages(response => message.content, {
max: 1,
time: 50000,
errors: [
'time'
]
})
.then(civcivAybGünahAbler => {
if(civcivAybGünahAbler.first().content.length > 100) {
message.channel.send("Footer must be under 100 characters.")
} else {
footer = civcivAybGünahAbler.first().content
message.channel.send("Footer successfully set. Now set the author of the embed. (not required, if you want to pass it type `no`)")
.then(() => {
message.channel.awaitMessages(response => message.content, {
max: 1,
time: 50000,
errors: [
'time'
]
})
.then(gygeNabiyonLan => {
if(gygeNabiyonLan.first().content.toLowerCase() == "no") {
message.channel.send("Ok, you dont want to set your author of embed. Now set the field name. (not required, if you want to pass it type `no`)")
.then(() => {
message.channel.awaitMessages(response => message.content, {
max: 1,
time: 50000,
errors: [
'time'
]
})
.then(voityAdamGG => {
if(voityAdamGG.first().content.toLowerCase() == "no") {
message.channel.send("Ok, you dont want to set your field name and value. Sending embed in 5 seconds.")
.then(msg => {
setTimeout(async() => {
msg.channel.send(new MessageEmbed()
.setDescription(desc)
.setTitle(title)
.setFooter(footer)
)
}, 5000)
})
}
}).catch(e => message.channel.send("Time is up or have error in console."))
})
} else {
if(gygeNabiyonLan.first().content.length > 150){
message.channel.send("Author must be under 150 characters.")
} else {
author = gygeNabiyonLan.first().content
message.channel.send("Author successfully set. Now set the field name. (not required, if you want to pass it type `no`)")
.then(() => {
message.channel.awaitMessages(response => message.content, {
max: 1,
time: 50000,
errors: [
'time'
]
})
.then(berkayAbĞĞĞ => {
if(berkayAbĞĞĞ.first().content.toLowerCase() == "no"){
message.channel.send("Ok, you dont want field name of your embed. Sending embed in 5 seconds.")
.then(() => {
setTimeout(async() => {
message.channel.send(new MessageEmbed()
.setDescription(desc)
.setTitle(title)
.setFooter(footer)
.setAuthor(author)
)
}, 5000)
}) 
} else {
if(berkayAbĞĞĞ.first().content.length > 125) {
message.channel.send("Field name must be under 125 characters.")
} else {
fieldName = berkayAbĞĞĞ.first().content
message.channel.send("Field name has been set. Now set the field value. (required)")
.then(() => {
message.channel.awaitMessages(response => message.content, {
max: 1,
time: 50000,
errors: [
'time'
]
})
.then(spimAbiSa => {
if(spimAbiSa.first().content.length > 100) {
message.channel.send("Field value must be under 100 characters.")
} else {
fieldValue = spimAbiSa.first().content
message.channel.send("Field value has been set. Sending embed in 5 seconds.")
.then(() => {
setTimeout(async() => {
message.channel.send(new MessageEmbed()
.setDescription(desc)
.setTitle(title)
.setFooter(footer)
.setAuthor(author)
.addField(`${fieldName}`,`${fieldValue}`)
)
}, 5000)
})
}
}).catch(e => message.channel.send("Time is up or have error in console."))
})
}
}
}).catch(e => message.channel.send("Time is up or have error in console."))
})
}
}
}).catch(e => message.channel.send("Time is up or have error in console."))
})
}
}).catch(e => message.channel.send("Time is up or have error in console."))
})
}
}).catch(e => message.channel.send("Time is up or have error in console."))
})
}
}).catch(e => message.channel.send("Time is up or have error in console."))
})
}
exports.help = {
name: 'embed',
description: `embed`,
usage: `pyth make-embed`,
category: `User`,
cooldown: 25
}