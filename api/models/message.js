const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    recipient: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    text: String,

}, {timestamps: true});

const messageModel = mongoose.model('message', messageSchema);

module.exports = messageModel;