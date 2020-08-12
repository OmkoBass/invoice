const express = require('express');

const cors = require('cors');
const mongoose = require('./mongoose');

const app = express();

// So i can send json
app.use(express.json());
app.use(cors());

app.post('/create/user', mongoose.createUser);
app.post('/login/user', mongoose.loginUser);

app.put('/update/user/profile', mongoose.updateUserProfile);

app.listen(5000, () => {
    console.log('LISTENING AT PORT 5000');
})
