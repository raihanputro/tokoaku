const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'tokoaku461@gmail.com',
        pass: 'hoso bfee osvt ojwk' 
    }
});

module.exports = { transporter }