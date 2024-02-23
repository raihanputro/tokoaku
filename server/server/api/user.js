const Router = require('express').Router();

const UserHelper = require('../helpers/userHelper');
const GeneralHelper = require('../helpers/generalHelper');
const { idValidation, userDataValidation } = require('../helpers/validationHelper');
const AuthMiddleware = require('../middlewares/authMiddleware');

const fileName = 'server/api/user.js';

const list = async ( req, rep ) => {
    try {
        const response = await UserHelper.getUserList();

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'list', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
};

const detail = async ( req, rep ) => {
    try {
        idValidation(req.params);

        const id = parseInt(req.params['id']);

        const response = await UserHelper.getUserDetail(id);

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'detail', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
};

const profile = async ( req, rep ) => {
    try {
        const id = req.body.user.id;

        const response = await UserHelper.getProfileUser(id);

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'profile', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
};

const update = async ( req, res ) => {
    try {
        idValidation(req.params);

        const id = parseInt(req.params['id']);

        const { email, password, username, address, phone, role } = req.body;

        const response = await UserHelper.updateDataUser({id, email, password, username, address, phone, role });

        return responseSuccess(res, 200, 'Success update user!', response);
    } catch (error) {
        return responseError(res, 404, 'Cannot update user!');
    }
};

const remove = async ( req, rep ) => {
    try {
        idValidation(req.params);

        const id = parseInt(req.params['id']);

        const response = await UserHelper.deleteDataUser(id);

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'remove', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
};

const changePassword = async ( req, res ) => {
    try {
        const userData = req.user;

        const { new_password, confirm_password } = req.body;

        const response = await UserHelper.changePassword({ email: userData.email, new_password, confirm_password });

        return responseSuccess(res, 200, `${userData.email} password changed!`, response);
    } catch (error) {
        return responseError(res, 404, 'Cannot change password!');
    }
};

const forgotPassword = async ( req, res ) => {
    try {
        const { email } = req.body;

        const response = await UserHelper.getOtpForgotPassword({email});

        return responseSuccess(res, 200, `${email} has sended code otp!`, response);
    } catch (error) {
        return responseError(res, 404, 'Cannot forgot password!');
    }
};

const resetPassword = async ( req, res ) => {
    try {
        const { email, code_otp, new_password, confirm_password } = req.body;

        const response = await UserHelper.resetPassword({email, code_otp, new_password, confirm_password});

        return responseSuccess(res, 200, `${email} password changed!`, response);
    } catch (error) {
        return responseError(res, 404, 'Cannot reset password!');
    }
};

Router.get('/list', AuthMiddleware.validateToken, AuthMiddleware.roleAdmin, list);
Router.get('/detail/:id', AuthMiddleware.validateToken, AuthMiddleware.roleAdmin, detail);
Router.get('/profile', AuthMiddleware.validateToken, profile);
Router.delete('/remove/:id', AuthMiddleware.validateToken, AuthMiddleware.roleAdmin, remove);

Router.patch('/change-password', AuthMiddleware.validateToken, changePassword);
Router.post('/forgot-password', forgotPassword);
Router.patch('/reset-password', resetPassword);
Router.put('/update/:id', AuthMiddleware.validateToken, AuthMiddleware.roleAdmin, update);

module.exports = Router;