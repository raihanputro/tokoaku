const jwt = require('jsonwebtoken');

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtExpiresIn = process.env.JWT_EXPIRES;

const generateToken = (data) => {
    return jwt.sign(data, jwtSecretKey, { expiresIn: jwtExpiresIn });
}

module.exports = { generateToken }