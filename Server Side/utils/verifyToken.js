const jwt = require("jsonwebtoken");

exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return false;
        }
        else {
            return decoded;
        }
    });
}