const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtExpiresIn = process.env.JWT_EXPIRES;

const generateToken = (data) => {
    return jwt.sign(data, jwtSecretKey, { expiresIn: jwtExpiresIn });
}

module.exports = { generateToken }