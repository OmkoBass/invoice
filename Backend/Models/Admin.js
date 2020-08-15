const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
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
})

module.exports = mongoose.model('Admin', adminSchema);
