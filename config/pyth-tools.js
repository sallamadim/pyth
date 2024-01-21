const Discord = require('discord.js')
const { Aki } = require('aki-api')
const games = new Set()
const attemptingGuess = new Set()
const fetch = require('node-fetch')
class Tools {
static async aki(message, client, region) {
try {
if (!message) return console.log("Message was not Provided.");
if (!client) return console.log("Discord Client was not Provided.");
if (!region) region = "en"
if (!message.id || !message.channel || !message.channel.id || !message.author) throw new Error("The Message Object provided was invalid!")
if (!client.user.id || !client.user) throw new Error("The Discord Client Object provided was invalid!")
if (!message.guild) throw new Error("This cannot be used in DMs!")
let usertag = message.author.tag 
let avatar = message.author.displayAvatarURL()
if(games.has(message.author.id)) {
return message.channel.send(new Discord.MessageEmbed().setDescription(`
${client.emotes.error} | You're already playing.
To stop your game type \`S\` or \`stop\`
`).setAuthor(usertag, avatar))
}
games.add(message.author.id)
let yesEmbed = new Discord.MessageEmbed()
.setAuthor(usertag, avatar)
.setDescription(`${client.emotes.wait} | Starting game...
${client.emotes.success} | Game will start in 5 seconds.
`)
let startingMessage = await message.channel.send(yesEmbed)
let aki = new Aki(region)
await aki.start()
let notFinished = true
let stepsSinceLastGuess = 0
let hasGuessed = false
let noResEmbed = new Discord.MessageEmbed()
.setAuthor(usertag, avatar)
.setDescription(`${client.emotes.error} | **${message.author.username}**, your game ended because you dont answered in 1 minute.`)
let akiEmbed = new Discord.MessageEmbed()
.setAuthor(usertag, avatar)
.setTitle(`Question ${aki.currentStep + 1}`)
.setDescription(`**Progress: 0%\n${aki.question}**`)
.addField("Please Type...", "**Y** or **Yes**\n**N** or **No**\n**I** or **IDK**\n**P** or **Probably**\n**PN** or **Probably Not**\n**B** or **Back**")
.setFooter(`You can also type "S" or "Stop" to End your Game`)
await startingMessage.delete()
let akiMessage = await message.channel.send(akiEmbed)
client.on("messageDelete", async deletedMessage => {
if (deletedMessage.id == akiMessage.id) {
notFinished = false;
games.delete(message.author.id)
attemptingGuess.delete(message.guild.id)
await aki.win()
return;
}
})
while (notFinished) {
if(!notFinished) return;
stepsSinceLastGuess = stepsSinceLastGuess + 1
if (((aki.progress >= 95 && (stepsSinceLastGuess >= 10 || hasGuessed == false)) || aki.currentStep >= 78) && (!attemptingGuess.has(message.guild.id))) {
attemptingGuess.add(message.guild.id)
await aki.win()
stepsSinceLastGuess = 0
hasGuessed = true
let guessEmbed = new Discord.MessageEmbed()
.setAuthor(usertag, avatar)
.setTitle(`I'm ${Math.round(aki.progress)}% Sure your Character is...`)
.setDescription(`**${aki.answers[0].name}**\n${aki.answers[0].description}\n\nIs this your Character? **(Type Y/Yes or N/No)**`)
.addField("Ranking", `**#${aki.answers[0].ranking}**`, true)
.addField("No. of Questions", `**${aki.currentStep}**`, true)
.setImage(aki.answers[0].absolute_picture_path)
await akiMessage.edit(guessEmbed)
const guessFilter = x => {
return (x.author.id === message.author.id && ([
"y",
"yes",
"n",
"no"
].includes(x.content.toLowerCase())))
}
await message.channel.awaitMessages(guessFilter, {
max: 1,
time: 60000
}).then(async responses => {
if(!responses.size) return akiMessage.edit(noResEmbed)
const guessAnswer = String(responses.first()).toLowerCase()
await responses.first().delete()
attemptingGuess.delete(message.guild.id)
if(guessAnswer == "y" || guessAnswer == "yes") {
let finishedGameCorrect = new Discord.MessageEmbed()
.setAuthor(usertag, avatar)
.setTitle("Well played!!")
.setDescription(`**${message.author.username}, I guessed right one more time!**`)
.addField("Character", `**${aki.answers[0].name}**`, true)
.addField("Ranking", `**#${aki.answers[0].ranking}**`, true)
.addField("No. of Questions", `**${aki.currentStep}**`, true)
await akiMessage.edit(finishedGameCorrect)
notFinished = false
games.delete(message.author.id)
return;
} else if (guessAnswer == "n" || guessAnswer == "no") {
if (aki.currentStep >= 78) {
let finishedGameDefeated = new Discord.MessageEmbed()
.setAuthor(usertag, avatar)
.setTitle("Well played!!")
.setDescription(`**${message.author.username}, bravo! You have defeated me!...`)
await akiMessage.edit(finishedGameDefeated)
notFinished = false
games.delete(message.author.id)
return;
} else {
aki.progress = 50
}
}
})
}
if(!notFinished) return;
let updatedAkiEmbed = new Discord.MessageEmbed()
.setAuthor(usertag, avatar)
.setTitle(`Question ${aki.currentStep + 1}`)
.setDescription(`**Progress: ${Math.round(aki.progress)}%\n${aki.question}**`)
.addField("Please Type...", "**Y** or **Yes**\n**N** or **No**\n**I** or **IDK**\n**P** or **Probably**\n**PN** or **Probably Not**\n**B** or **Back**")
.setFooter(`You can also type "S" or "Stop" to End your Game`)
akiMessage.edit(updatedAkiEmbed)
const filter = x => {
return (x.author.id === message.author.id && ([
"y",
"yes",
"n",
"no",
"i",
"idk",
"i",
"dont know",
"don't know",
"p",
"probably",
"pn",
"probably not",
"b",
"back",
"s",
"stop"
].includes(x.content.toLowerCase())))
}
await message.channel.awaitMessages(filter, {
max: 1,
time: 60000
}).then(async responses => {
if(!responses.size) {
await aki.win()
notFinished = false
games.delete(message.author.id)
akiMessage.edit(noResEmbed)
}
const answer = String(responses.first()).toLowerCase().replace("'", "")
const answers = {
"y": 0,
"yes": 0,
"n": 1,
"no": 1,
"i": 2,
"idk": 2,
"dont know": 2,
"don't know": 2,
"i": 2,
"p": 3,
"probably": 3,
"pn": 4,
"probably not": 4,
}
let thinkingEmbed = new Discord.MessageEmbed()
.setAuthor(usertag, avatar)
.setTitle(`Question ${aki.currentStep + 1}`)
.setDescription(`**Progress: ${Math.round(aki.progress)}%\n${aki.question}**`)
.addField("Please Type...", "**Y** or **Yes**\n**N** or **No**\n**I** or **IDK**\n**P** or **Probably**\n**PN** or **Probably Not**\n**B** or **Back**")
.setFooter(`Thinking...`)
await akiMessage.edit(thinkingEmbed)
await responses.first().delete()
if(answer == "b" || answer == "back") {
if(aki.currentStep >= 1) {
await aki.back()
}
} else if (answer == "s" || answer == "stop") {
games.delete(message.author.id)
let stopEmbed = new Discord.MessageEmbed()
.setAuthor(usertag, avatar)
.setTitle(`Game Ended`)
.setDescription(`**${message.author.username}, your game was successfully ended!**`)
await aki.win()
await akiMessage.edit(stopEmbed)
notFinished = false
} else {
await aki.step(answers[answer])
}
if(!notFinished) return;
})
}
} catch (e) {
attemptingGuess.delete(message.guild.id)
games.delete(message.guild.id)
if (e == "DiscordAPIError: Unknown Message") return;
console.log(e)
}
}
static async tdk(klm) {
const api = await fetch(`https://sozluk.gov.tr/gts?ara=${encodeURI(klm)}`)
.then(res => res.json())
if(api.error) throw new Error("Bir hata çıktı.")
let yazar = api[0].anlamlarListe.values().next().value.orneklerListe ? api[0].anlamlarListe.values().next().value.orneklerListe.values().next().value.yazar.values().next().value.tam_adi : 'Yazar bulunamadı.';
let örnek = api[0].anlamlarListe.values().next().value.orneklerListe ? api[0].anlamlarListe.values().next().value.orneklerListe.values().next().value.ornek : 'Örnek bulunamadı.'
let lisan = api[0].lisan ? api[0].lisan : 'Lisan bulunamadı.'
let anlam = api[0].anlamlarListe.values().next().value ? api[0].anlamlarListe.values().next().value.anlam : 'Anlam bulunamadı.'
let atasözü = api[0].atasozu ? api[0].atasozu.values().next().value.madde : 'Atasözü bulunamadı.'
let obj = {
anlam: anlam,
lisan: lisan,
örnek: örnek,
yazar: yazar,
atasözü: atasözü
}
return obj;
}
}
module.exports = Tools;