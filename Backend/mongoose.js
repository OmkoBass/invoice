const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const User = require('./Models/User');
const Invoice = require('./Models/Invoice');

mongoose.connect('mongodb://127.0.0.1:27017/Invoice')
    .then(() => {
        console.log('CONNECTED!');
    }).catch(() => {
    console.log('CONNECTION FAILED!');
});

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
                        await res.json(result);
                    } else {
                        await res.json(401)
                    }
                } catch {
                    await res.json(400);
                }
            }
    })
}

const getUsers = async (req, res) => {
    const users = await User.find().exec();

    await res.json(users);
}

const updateUserProfile = async (req, res) => {
    User.findById(req.body.id)
        .lean().exec((err, result) => {
        if(err) {
            res.json(400);
        } else {
            result.profile = req.body.profile;

            res.json(result);
        }
    });
}

const createInvoice = async (req, res) => {
    const createdInvoice = new Invoice(req.body.values);

    createdInvoice.save((err, result) => {
       if(err) {
           res.json(400);
       } else {
           res.json(result);
       }
    });
}

const getInvoicesForUser = async (req, res) => {
    Invoice.find({ belongsTo: {'$regex': req.body.username, '$options': 'i'}})
        .lean().exec((err, result) => {
        if(err) {
            res.json(400);
        } else {
            res.json(result);
        }
    });
}

const deleteInvoices = async (req, res) => {
    await Invoice.deleteMany({
        _id: {
            $in: req.body.ids.map(id => id)
        }
    }, (err, result) => {
        if(err) {
            res.json(400);
        } else {
            res.json(200);
        }
    });
}

exports.createUser = createUser;
exports.loginUser = loginUser;
exports.getUsers = getUsers;
exports.updateUserProfile = updateUserProfile;
exports.createInvoice = createInvoice;
exports.getInvoicesForUser = getInvoicesForUser;
exports.deleteInvoices = deleteInvoices;
