const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const User = require('./Models/User');

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

exports.createUser = createUser;
exports.loginUser = loginUser;
exports.getUsers = getUsers;
