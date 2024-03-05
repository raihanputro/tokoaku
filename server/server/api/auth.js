const Router = require('express').Router();

const AuthHelper = require('../helpers/authHelper');
const GeneralHelper = require('../helpers/generalHelper');
const ValidationHelper = require('../helpers/validationHelper');
const { decryptTextPayload } = require('../utils/decrypt');

const fileName = 'server/api/auth.js';

const register = async ( req, rep ) => {
    try {
        const email = decryptTextPayload(req.body?.email);
        const username = decryptTextPayload(req.body?.username);
        const password = decryptTextPayload(req.body?.password);
        const role = decryptTextPayload(req.body?.role);
       
        ValidationHelper.registerValidation({ email, username, password, role });

        const response = await AuthHelper.registerUser({ email, username, password, role });

        return rep.send(response);
    } catch (error) {
        console.log([fileName, 'register', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
}

const login = async ( req, rep ) => {
    try {
        const email = decryptTextPayload(req.body?.email);
        const password = decryptTextPayload(req.body?.password);

        ValidationHelper.loginValidation({ email, password });

        const response = await AuthHelper.loginUser({ email, password });

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'login', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
};

Router.post('/register', register);
Router.post('/login', login);

module.exports = Router;
