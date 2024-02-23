const Boom = require('boom');
const _ = require('lodash');

const db = require('../../models');
const GeneralHelper = require('../helpers/generalHelper');
const bcrPass = require('../utils/bcryptPass');
const jwtUtils = require('../utils/jwt');

const fileName = 'server/helpers/authHelper.js';

const registerUser = async (dataObject) => {
    const { email, username, password, role } = dataObject;

    try {
        const isRegistered = await db.user.findOne({
            where: {
                email: email
            }
        });

        if (!_.isEmpty(isRegistered)) {
            return Promise.reject(Boom.badRequest('Email has been registered!'));
        };

        const hashedPass = bcrPass.hashPass(password);

        await db.user.create({ email, username, password: hashedPass, role });

        return Promise.resolve({
            statusCode: 201,
            message: "User registration successfully!"
        });   
    } catch (error) {
        console.log([fileName, 'registerUser', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    };
};

const loginUser = async (dataObject) => {
    const { email, password } = dataObject;

    try {
        const isUser = await db.user.findOne({
            where: {
                email: email
            },
        });

        if (_.isEmpty(isUser)) {
            return Promise.reject(Boom.badRequest('Email not registered!'));
        };

        const checkPassword = bcrPass.comparePass(password, isUser.password);

        if (!checkPassword) {
            return Promise.reject(Boom.badRequest('Wrong password!'));
        };

        const token = jwtUtils.generateToken({
            id: isUser.id,
            username: isUser.username,
            role: isUser.role
        });

        return Promise.resolve({ 
            statusCode: 200,
            message: "Login successfully!",
            token 
        });    
    } catch (error) {
        console.log([fileName, 'loginUser', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    };
};



module.exports = {
    registerUser,
    loginUser
}
