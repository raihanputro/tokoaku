const Boom = require('boom');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const Moment = require('moment');

const GeneralHelper = require('../helpers/generalHelper');

const fileName = 'server/middlewares/authMiddleware.js';

const jwtSecretKey = process.env.JWT_SECRET_KEY || "JWT_KEY";

const validateToken = ( req, rep, next ) => {
    const { authorization } = req.headers;

    try {
        if (_.isEmpty(authorization)) {
            throw Boom.unauthorized(`Unauthorized!`);
        };

        const token = authorization.split(' ')[1];

        const verifiedUser = jwt.verify(token, jwtSecretKey);

        if (_.isEmpty(verifiedUser) || !_.has(verifiedUser, 'exp')) {
            throw Boom.unauthorized(`Unauthorized!`);
        }

        const isTokenExpired = verifiedUser.exp < Moment().unix();

        if (isTokenExpired) {
            throw Boom.unauthorized(`Unauthorized!`);
        }

        req.body.user = verifiedUser;

        return next();
    } catch (error) {
        console.log([fileName, 'validateToken', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));       
    }
};  

const roleAdmin = ( req, rep, next ) => {
    try {
        const user = req.body.user;

        if(user.role !== 'Admin') {
            throw Boom.unauthorized(`You are not admin!`);
        }

        return next();
    } catch (error) {
        console.log([fileName, 'validateRoleAdmin', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));       
    }
};  

const roleCustomer = ( req, rep, next ) => {
    try {
        const user = req.body.user;

        if(user.role !== 'Customer') {
             throw Boom.unauthorized(`You are not customer!`);
        }

        return next();
    } catch (error) {
        console.log([fileName, 'validateRoleCustomer', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));       
    }
}; 

module.exports = {
    validateToken,
    roleAdmin,
    roleCustomer
};
