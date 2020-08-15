const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const User = require('./Models/User');
const Invoice = require('./Models/Invoice');
const Admin = require('./Models/Admin');

const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const PAGE_SIZE = 25;

dotenv.config();

mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        console.log('CONNECTED!');
    }).catch(() => {
    console.log('CONNECTION FAILED!');
});

// ADMIN
const loginAdmin = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const createAdmin = new Admin({
           username: req.body.username,
           password: hashedPassword
        });

        createAdmin.save((err, result) => {
           if(err)
               res.json(400);
           else
               res.json(result);
        });
    } catch {
        await res.json(500);
    }
}

const getUsers = async (req, res) => {
    const users = await User.find().exec();

    await res.json(users);
}

const getInvoices = async (req, res) => {
    const invoices = await Invoice.find().exec();

    await res.json(invoices);
}

const createUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const createdUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
        });

        createdUser.save((err, result) => {
            if(err)
                res.json(400);
            else
                res.json(result);
        });
    } catch {
        await res.json(500);
    }
}

const loginUser = async (req, res) => {
    User.findOne({ username: req.body.username })
        .lean().exec(async (err, result) => {
            if(err)
                await res.json(500);
            else {
                try {
                    if(await bcrypt.compare(req.body.password, result.password)) {
                        const token = jwt.sign({
                            _id: result._id,
                            username: result.username
                        }, process.env.TOKEN_SECRET);

                        res.header('token', token).send(token);
                    } else {
                        await res.json(401)
                    }
                } catch {
                    await res.json(400);
                }
            }
    })
}

const getUserProfile = async (req, res) => {
    User.findById(req.user._id)
        .lean().exec((err, result) => {
            if(err) {
                res.json(400);
            } else {
                res.json(result.profile);
            }
    })
}

const updateUserProfile = async (req, res) => {
    User.updateOne({_id: req.user._id}, {profile: req.body.profile})
        .lean().exec((err, result) => {
        if(err) {
            res.json(400);
        } else {
            res.json(result.profile);
        }
    });
}

const createInvoice = async (req, res) => {
    const createdInvoice = new Invoice({...req.body.values, belongsTo: req.user.username});

    createdInvoice.save((err, result) => {
       if(err) {
           res.json(400);
       } else {
           res.json(result);
       }
    });
}

const getInvoicesForUser = async (req, res) => {
    Invoice.find({ belongsTo: {'$regex': req.user.username, '$options': 'i'}}).limit(PAGE_SIZE)
        .lean().exec((err, result) => {
        if(err) {
            res.json(400);
        } else {
            res.json(result);
        }
    });
}

const getAllInvoicesForUser = async (req, res) => {
    Invoice.find({ belongsTo: {'$regex': req.user.username, '$options': 'i'}}).limit(PAGE_SIZE)
        .lean().exec((err, result) => {
        if(err) {
            res.json(400);
        } else {
            res.json(result);
        }
    });
}

const invoicesPaginate = async (req, res) => {
    Invoice.paginate({belongsTo: req.user.username}, {
        offset: req.params.defaultPage * req.params.pageNumber,
        limit: req.params.defaultPage * req.params.pageNumber + 1
    }, (err, result) => {
        if(err) {
            res.json(400);
        } else {
            res.json(result.docs);
        }
    });
}

const deleteInvoices = async (req, res) => {
    await Invoice.deleteMany({
        _id: {
            $in: req.body.ids.map(id => id)
        }
    }, (err, result) => {
        if (err) {
            res.json(400);
        } else {
            res.json(200);
        }
    });
}

const searchInvoices = async (req, res) => {
    Invoice.find({ invoice: {'$regex': req.body.invoice, '$options': 'i'}})
        .lean().exec((err, result) => {
            if(err) {
                res.json(400);
            } else {
                res.json(result);
            }
    })
}

// Admin
exports.getUsers = getUsers;
exports.getInvoices = getInvoices;
exports.loginAdmin = loginAdmin;

exports.createUser = createUser;
exports.loginUser = loginUser;
exports.getUserProfile = getUserProfile;
exports.updateUserProfile = updateUserProfile;
exports.createInvoice = createInvoice;
exports.getInvoicesForUser = getInvoicesForUser;
exports.getAllInvoicesForUser = getAllInvoicesForUser;
exports.invoicesPaginate = invoicesPaginate;
exports.deleteInvoices = deleteInvoices;
exports.searchInvoices = searchInvoices;
