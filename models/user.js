const mongoose = require("mongoose");


const { Schema } = mongoose;

const schema = new Schema({
email: String,
password: String,
});

module.exports = mongoose.model("User", schema);