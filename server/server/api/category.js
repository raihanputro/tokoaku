const Router = require('express').Router();

const CategoryHelper = require('../helpers/categoryHelper');
const GeneralHelper = require('../helpers/generalHelper');
const { idValidation, categoryDataValidation } = require('../helpers/validationHelper');
const { validateToken, roleAdmin } = require('../middlewares/authMiddleware');
const { uploadImg } = require('../middlewares/uploadImgMiddleware');

const fileName = 'server/api/category.js';

const list = async ( req, rep ) => {
    try {
        const response = await CategoryHelper.getCategoryList();

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

        const response = await CategoryHelper.getCategoryDetail(id);

        return rep.send(response);
    } catch (error) {
        console.log([fileName, 'detail', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));       
    }
}

const add = async ( req, rep ) => {
    try {
        
        const author_id = req.body.user.id;

        const url = req.protocol + '://' + req.get('host');

        const { name } = req.body;

        const imgFile = req.files.icon[0];

        const fileName = imgFile.originalname;

        const icon = url + '/' + fileName;

        const response = await CategoryHelper.postCategoryData({ name, icon, author_id });

        return rep.send(response);
    } catch (error) {
        console.log([fileName, 'add', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));       
    }
};

const update = async ( req, rep ) => {
    try {
        idValidation(req.params);
    
        const id = parseInt(req.params['id']);

        const url = req.protocol + '://' + req.get('host');

        const author_id = req.body.user.id;

        const { name } = req.body;

        const imgFile = req.files?.icon?.[0];

        const fileName = imgFile?.originalname;

        const icon = fileName ? url + '/' + fileName : null;

        const response = await CategoryHelper.updateCategoryData({ id, name, icon, author_id });

        return rep.send(response);
    } catch (error) {
        console.log([fileName, 'update', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));       
    }
};

const remove = async ( req, rep ) => {
    try {
        idValidation(req.params);

        const id = parseInt(req.params['id']);

        const response = await CategoryHelper.deleteCategoryData(id);

        return rep.send(response);
    } catch (error) {
        console.log([fileName, 'remove', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));       
    }
};

Router.get('/list', list);
Router.get('/detail/:id', validateToken, detail);
Router.post('/add', uploadImg.fields([{name: 'icon', maxCount: 1}]), validateToken, roleAdmin, add);
Router.patch('/update/:id', uploadImg.fields([{name: 'icon', maxCount: 1}]), validateToken, roleAdmin, update);
Router.delete('/remove/:id', validateToken, roleAdmin, remove);

module.exports = Router;    