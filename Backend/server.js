const express = require('express');

const cors = require('cors');
const mongoose = require('./mongoose');

const app = express();

// So i can send json
app.use(express.json());
app.use(cors());

app.post('/create/user', mongoose.createUser);
app.post('/login/user', mongoose.loginUser);
app.post('/create/invoice', mongoose.createInvoice);
app.post('/get/invoices', mongoose.getInvoicesForUser);
app.post('/search/invoices', mongoose.searchInvoices);

app.put('/update/user/profile', mongoose.updateUserProfile);
app.put('/delete/invoices', mongoose.deleteInvoices);

app.listen(5000, () => {
    console.log('LISTENING AT PORT 5000');
})
