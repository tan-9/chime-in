const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true},
    password: { type: String, required: true},
    avatar: {type: String}
}, {timestamps: true});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;