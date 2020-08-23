const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser')

const mongoose = require('./mongoose');
const verifyToken = require('./verifyToken');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Admin
app.get('/get/admin', (req, res) => {
    res.json(200);
})
app.get('/get/admin/users', verifyToken, mongoose.getUsers);
app.get('/get/admin/invoices', verifyToken, mongoose.getInvoices);
app.get('/get/admin/users/:id', verifyToken, mongoose.getUser);
app.get('/get/admin/invoices/:id', verifyToken, mongoose.getInvoice);
app.post('/create/admin', mongoose.createAdmin);
app.post('/login/admin', mongoose.loginAdmin);
app.put('/put/admin/users/:id', verifyToken, mongoose.updateUser);
app.delete('/delete/admin/users/:id', verifyToken, mongoose.deleteUser);
app.post('/post/admin/create/user', verifyToken, mongoose.createUserFromAdmin);

app.get('/user/profile', verifyToken, mongoose.getUserProfile);
app.get('/get/invoices/:defaultPage/:pageNumber', verifyToken, mongoose.invoicesPaginate);

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
