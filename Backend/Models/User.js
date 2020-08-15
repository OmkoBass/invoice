const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    profile: {
        account: { type: String, max: 128 },
        city: { type: String, max: 128 },
        email: { type: String, max: 128 },
        firmName: { type: String, max: 128 },
        fromName: { type: String, max: 128 },
        pib: { type: String, max: 128 },
        street: { type: String, max: 128 }
    }
})

module.exports = mongoose.model('User', userSchema);
