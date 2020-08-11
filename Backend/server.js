const express = require('express');

const mongoose = require('./mongoose');

const app = express();

// So i can send json
app.use(express.json());

app.post('/create/user', mongoose.createUser);

app.listen(5000, () => {
    console.log('LISTENING AT PORT 5000');
})
