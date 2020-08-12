const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
    belongsTo: { type: String , ref: 'User', required: true },
    account: { type: String, max: 128, required: true },
    city: { type: String, max: 128, required: true },
    dateCreated: { type: String, max: 128, required: true },
    dateInvoice: { type: String, max: 128, required: true },
    dateTraffic: { type: String, max: 128, required: true },
    email: { type: String, max: 128, required: true },
    firmName: { type: String, max: 128, required: true },
    fromName: { type: String, max: 128, required: true },
    invoice: { type: String, max: 128, required: true },
    pib: { type: String, max: 128, required: true },
    place: { type: String, max: 128, required: true },
    street: { type: String, max: 128, required: true },
    toAddress: { type: String, max: 128, required: true },
    toCity: { type: String, max: 128, required: true },
    toName: { type: String, max: 128, required: true },
    toPib: { type: String, max: 128, required: true },
    services: [{
        amount: { type: String, max: 32, required: true },
        price: { type: String, max: 32, required: true },
        serviceType: { type: String, max: 32, required: true },
        total: { type: String, max: 32, required: true },
        unit: { type: String, max: 32, required: true }
    }]
});

module.exports = mongoose.model('Invoice', invoiceSchema);
