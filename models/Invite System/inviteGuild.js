const { Schema, model } = require("mongoose");
const schema = new Schema({
guild: String,
channel: String
});
module.exports = model("inviteGuild", schema);