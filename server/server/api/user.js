const Router = require('express').Router();

const UserHelper = require('../helpers/userHelper');
const GeneralHelper = require('../helpers/generalHelper');
const ValidationHelper = require('../helpers/validationHelper');
const AuthMiddleware = require('../middlewares/authMiddleware');
const { uploadImg } = require('../middlewares/uploadImgMiddleware');
const { decryptTextPayload } = require('../utils/decrypt');

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

const updateProfile = async ( req, rep ) => {
    try {
        const id = req.body.user.id;

        const url = req.protocol + '://' + req.get('host');

        const imgFile = req.files?.photo?.[0];

        const fileName = imgFile?.originalname;

        const photo = fileName ? url + '/' + fileName : null;   

        const { username, fullName, address, province_id, city_id, phone  } = req.body;

        const response = await UserHelper.updateProfileUser({ id, username, fullName, address, province_id, city_id, phone, photo });

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'update', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
};

const remove = async ( req, rep ) => {
    try {
        const id = parseInt(req.params['id']);

        const response = await UserHelper.deleteDataUser(id);

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'remove', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
};

const changePassword = async ( req, rep ) => {
    try {
        const user_id = req.body.user.id;
        
        const oldPassword = decryptTextPayload(req.body?.oldPassword);
        const newPassword = decryptTextPayload(req.body?.newPassword);

        ValidationHelper.changePasswordValidation({ oldPassword, newPassword, user_id });

        const response = await UserHelper.changePassword({ user_id, oldPassword, newPassword });

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'changePassword', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
};

Router.get('/list', AuthMiddleware.validateToken, AuthMiddleware.roleAdmin, list);
Router.get('/detail/:id', AuthMiddleware.validateToken, AuthMiddleware.roleAdmin, detail);
Router.get('/profile', AuthMiddleware.validateToken, profile);
Router.patch('/change-password', AuthMiddleware.validateToken, changePassword);
Router.put('/update-profile', uploadImg.fields([{name: 'photo', maxCount: 1}]), AuthMiddleware.validateToken, updateProfile);
Router.delete('/remove/:id', AuthMiddleware.validateToken, AuthMiddleware.roleAdmin, remove);

module.exports = Router;