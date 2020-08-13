const express = require('express');

const cors = require('cors');
const mongoose = require('./mongoose');
const verifyToken = require('./verifyToken');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/create/user', mongoose.createUser);
app.post('/login/user', mongoose.loginUser);
app.post('/create/invoice',verifyToken, mongoose.createInvoice);
app.post('/get/invoices', verifyToken, mongoose.getInvoicesForUser);
app.post('/search/invoices', verifyToken, mongoose.searchInvoices);

app.put('/update/user/profile', verifyToken, mongoose.updateUserProfile);
app.put('/delete/invoices', verifyToken, mongoose.deleteInvoices);

app.listen(5000, () => {
    console.log('LISTENING AT PORT 5000');
})
