const Boom = require('boom');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { errorResponse } = require('../helpers/responseHelper');
const db = require('../../models');
const tb_user = db.user;
const tb_codeOtp = db.codeOtp;

dotenv.config();
const fileName = 'server/helpers/authHelper.js';
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtExpiresIn = process.env.JWT_EXPIRES;
const salt = bcrypt.genSaltSync(10);


const hashPass = (password) => {
    return bcrypt.hashSync(password, salt);
};

const comparePass = (password, passwordDb) => {
    return bcrypt.compareSync(password, passwordDb);
};

const generateToken = (data) => {
    return jwt.sign(data, jwtSecretKey, { expiresIn: jwtExpiresIn });
};

const generateOtpCode = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp.toString();
}

const registerUser = async (dataObject) => {
    const { email, username, password, role } = dataObject;

    try {
        const checkUser = await tb_user.findOne({
            where: {
                email: email
            }
        });

        if (!_.isEmpty(checkUser)) {
            return Promise.reject(Boom.badRequest('this email has been registered!'));
        };

        const hashedPass = hashPass(password);

        await tb_user.create({ email, username, password: hashedPass, role });

        return Promise.resolve(true);    
    } catch (error) {
        console.log([fileName, 'registerUser', 'ERROR'], { info: `${error}` });
        return Promise.reject(errorResponse(error));    
    };
};

const loginUser = async (dataObject) => {
    const { email, password } = dataObject;

    try {
        const checkUser = await tb_user.findOne({
            where: {
                email: email
            },
        });

        if (_.isEmpty(checkUser)) {
            return Promise.reject(Boom.notFound('This email not registered!'));
        };

        const checkPassword = comparePass(password, checkUser.password);

        if (!_.isEmpty(checkPassword)) {
            return Promise.reject(Boom.badRequest('Wrong password!'));
        };

        const token = generateToken({
            id: checkUser.id,
            email: checkUser.email,
            password: checkUser.password,
            role: checkUser.role
        });

        return Promise.resolve(token);    
    } catch (error) {
        console.log([fileName, 'loginUser', 'ERROR'], { info: `${error}` });
        return Promise.reject(errorResponse(error));    
    };
};

const profileUser = async ( email ) => {
   try {
        const user = await tb_user.findOne({
            where: {
                email: email
            }
        });

        return Promise.resolve(user);    
   } catch (error) {
    console.log([fileName, 'profileUser', 'ERROR'], { info: `${error}` });
    return Promise.reject(errorResponse(error));    
}
};

const changePassword = async ( dataObject, res ) => {
    const { email, new_password, confirm_password } = dataObject;

    try {
        const checkPassword = comparePass(new_password, confirm_password);

        if (!_.isEmpty(checkPassword)) {
            return Promise.reject(Boom.badRequest('Wrong confirm password!'));
        };


        const hashedPass = hashPass(new_password);

        await tb_user.update({
            password: hashedPass
        }, {    
            where: {
                email: email
            }
        });

        const updatedUser = await tb_user.findOne({
            where: {
                email: email
            }
        });

        return Promise.resolve(updatedUser);    
    } catch (error) {
        console.log([fileName, 'changePassword', 'ERROR'], { info: `${error}` });
        return Promise.reject(errorResponse(error));    
    };
};

const getOtpForgotPassword = async (dataObject) => {
    const { email } = dataObject;

    try {
        const checkUser = await tb_user.findOne({
            where: {
                email: email
            },
        });

        if (_.isEmpty(checkUser)) {
            return Promise.reject(Boom.notFound('This email not registered!'));
        };

        const codeOtp = generateOtpCode()
        console.log(codeOtp)

        await tb_codeOtp.create({
            email: email,
            code: codeOtp
        }, {    
            where: {
                email: email
            }
        });

        const updatedOtp = await tb_codeOtp.findOne({
            where: {
                email: email
            }
        });

        return Promise.resolve(updatedOtp);    
    } catch (error) {
        console.log([fileName, 'getOtpForgotPassword', 'ERROR'], { info: `${error}` });
        return Promise.reject(errorResponse(error));    
    }
};

const resetPassword = async (dataObject) => {
    const { email, code_otp, new_password, confirm_password } = dataObject;

    try {
        const checkCodeOtp = await tb_codeOtp.findOne({
            where: {
                email: email,
                code: code_otp
            },
        });

        if (_.isEmpty(checkCodeOtp)) {
            return Promise.reject(Boom.notFound('Code otp not found!'));
        };

        const checkPassword = comparePass(new_password, confirm_password);

        if (new_password !== confirm_password) {
            return Promise.reject(Boom.badRequest('Wrong confirm password!'));
        };

        const hashedPassword = hashPass(new_password);

        await tb_user.update({
            password: hashedPassword
        }, {
            where: {
                email: email
            }
        });

        await tb_codeOtp.destroy({
            where: {
                code: code_otp
            }
        });

        return Promise.resolve(true);    
    } catch (error) {
        console.log([fileName, 'resetPassword', 'ERROR'], { info: `${error}` });
        return Promise.reject(errorResponse(error));    
    }
};

module.exports = {
    registerUser,
    loginUser,
    profileUser,
    changePassword,
    getOtpForgotPassword,
    resetPassword
}
