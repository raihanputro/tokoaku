const Router = require('express').Router();

const AuthHelper = require('../helpers/authHelper');
const GeneralHelper = require('../helpers/generalHelper');
const ValidationHelper = require('../helpers/validationHelper');

const fileName = 'server/api/auth.js';

const register = async ( req, rep ) => {
    try {
        ValidationHelper.registerValidation(req.body);

        const { email, username, password, role } = req.body;

        const response = await AuthHelper.registerUser({ email, username, password, role });

        return rep.send(response);
    } catch (error) {
        console.log([fileName, 'register', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
}

const login = async ( req, rep ) => {
    try {
        ValidationHelper.loginValidation(req.body);

        const { email, password } = req.body;

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
