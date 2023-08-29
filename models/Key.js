const mongoose = require("mongoose");

const KeySchema = new mongoose.Schema({
    name: { type: String, required: true },
    key: { type: String, required: true }
})

const model = mongoose.model("keys", KeySchema);

module.exports = model;