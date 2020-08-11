const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Invoice')
    .then(() => {
        console.log('CONNECTED!');
    }).catch(() => {
    console.log('CONNECTION FAILED!');
});
