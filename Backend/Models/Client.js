const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    belongsTo: { type: String , ref: 'User', required: true },
    toAddress: { type: String, max: 128, required: true },
    toCity: { type: String, max: 128, required: true },
    toName: { type: String, max: 128, required: true },
    toPib: { type: String, max: 128, required: true },
})

module.exports = mongoose.model('Client', clientSchema);
