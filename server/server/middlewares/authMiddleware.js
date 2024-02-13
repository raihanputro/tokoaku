const _ = require('lodash');
const jwt = require('jsonwebtoken');
const Moment = require('moment');

const { responseSuccess, responseError } = require('../helpers/responseHelper');

const fileName = 'server/middlewares/authMiddleware.js';
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const validateToken = ( req, res, next ) => {
    const { authorization } = req.headers;

    try {
        if (_.isEmpty(authorization)) {
            return responseError(res, 401, `Unauthorized!`); 
        };

        const token = authorization.split(' ')[1];

        const verifiedUser = jwt.verify(token, jwtSecretKey);

        if (_.isEmpty(verifiedUser) || !_.has(verifiedUser, 'exp')) {
            return responseError(res, 401, `Unauthorized!`); 
        }

        const isTokenExpired = verifiedUser.exp < Moment().unix();

        if (isTokenExpired) {
            return responseError(res, 401, `Unauthorized!`); 
        }

        req.user = verifiedUser;

        return next();
    } catch (error) {
        console.log([fileName, 'validateToken', 'ERROR'], { info: `${error}` });
        return responseError(res, 400, `Validation token failed!`); 
    }
};  


const roleAdmin = ( req, res, next ) => {
    const { authorization } = req.headers;

    try {
        const token = authorization.split(' ')[1];

        const verifiedUser = jwt.verify(token, jwtSecretKey);

        if(verifiedUser.role !== 'admin') {
            return responseError(res, 401, `You are not admin!`); 
        }

        return next();
    } catch (error) {
        console.log([fileName, 'roleAdmin', 'ERROR'], { info: `${error}` });
        return responseError(res, 400, `Validation role failed!`); 
    }
};  

const roleCustomer = ( req, res, next ) => {
    const { authorization } = req.headers;

    try {
        const token = authorization.split(' ')[1];

        const verifiedUser = jwt.verify(token, jwtSecretKey);

        if(verifiedUser.role !== 'customer') {
            return responseError(res, 401, `You are not customer!`); 
        }

        return next();
    } catch (error) {
        console.log([fileName, 'roleCustomer', 'ERROR'], { info: `${error}` });
        return responseError(res, 400, `Validation role failed!`); 
    }
}; 

module.exports = {
    validateToken,
    roleAdmin,
    roleCustomer
};
