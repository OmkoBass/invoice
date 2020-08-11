const mongoose = require('mongoose');

const User = require('./Models/User');

mongoose.connect('mongodb://127.0.0.1:27017/Invoice')
    .then(() => {
        console.log('CONNECTED!');
    }).catch(() => {
    console.log('CONNECTION FAILED!');
});

const createUser = async (req, res) => {
    const createdUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });

    createdUser.save((err, result) => {
       if(err)
           res.json(400);
       else
           res.json(createdUser);
    });
}

exports.createUser = createUser;
