const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
    belongsTo: { type: String , ref: 'User' },
    account: { type: String, max: 128 },
    city: { type: String, max: 128 },
    dateCreated: { type: String, max: 128 },
    dateInvoice: { type: String, max: 128 },
    dateTraffic: { type: String, max: 128 },
    email: { type: String, max: 128 },
    firmName: { type: String, max: 128 },
    fromName: { type: String, max: 128 },
    invoice: { type: String, max: 128 },
    pib: { type: String, max: 128 },
    place: { type: String, max: 128 },
    street: { type: String, max: 128 },
    toAddress: { type: String, max: 128 },
    toCity: { type: String, max: 128 },
    toName: { type: String, max: 128 },
    toPib: { type: String, max: 128 },
    services: [{
        amount: { type: String, max: 32 },
        price: { type: String, max: 32 },
        serviceType: { type: String, max: 32 },
        total: { type: String, max: 32 },
        unit: { type: String, max: 32 }
    }]
});

module.exports = mongoose.model('Invoice', invoiceSchema);
