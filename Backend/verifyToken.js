const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('token');

    console.log(token);

    if(!token)
        res.json(401);

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);

        req.user = verified;
        next();
    } catch {
        res.json(400);
    }
}
