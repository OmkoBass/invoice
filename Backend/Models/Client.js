const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const clientSchema = mongoose.Schema({
    belongsTo: { type: String , ref: 'User', required: true },
    toAddress: { type: String, max: 128, required: true },
    toCity: { type: String, max: 128, required: true },
    toName: { type: String, max: 128, required: true },
    toPib: { type: String, max: 128, required: true },
})

clientSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Client', clientSchema);
