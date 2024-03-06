const Router = require('express').Router();

const itemHelper = require('../helpers/itemHelper');
const GeneralHelper = require('../helpers/generalHelper');
const ValidationHelper = require('../helpers/validationHelper');
const { validateToken, roleAdmin } = require('../middlewares/authMiddleware');
const { uploadImg } = require('../middlewares/uploadImgMiddleware');

const fileName = 'server/api/item.js';

const list = async ( req, rep ) => {
    try {
        const response = await itemHelper.getItemList();

        return rep.send(response);
    } catch (error) {
        console.log([fileName, 'list', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
};

const listByAuthor = async ( req, rep ) => {
    try {
        const id = parseInt(req.params['id']);

        ValidationHelper.idValidation(id);

        const response = await itemHelper.getItemListByAuthor(id);

        return rep.send(response);    
     }catch (error) {
        console.log([fileName, 'listByAuthor', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));       }
};

const detail = async ( req, rep ) => {
    try {
        const id = parseInt(req.params['id']);  

        const response = await itemHelper.getItemDetail(id);

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'detail', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));       
    }
};

const search = async ( req, rep ) => {
    try {
        const { name, category_id } = req.query;

        const response = await itemHelper.searchItemData({ name, category_id });

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'search', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));       
    }
}

const add = async ( req, rep ) => {
    try {   
        const author_id = req.body.user.id;
        
        const url = req.protocol + '://' + req.get('host');
        
        const { category_id, name, desc, price, stock, discount } = req.body;

        const imgFile = req.files.img[0];

        const fileName = imgFile.originalname;
        
        const img = url + '/' + fileName;

        const response = await itemHelper.postDataItem({ category_id, name, desc, price, discount, stock, img, author_id });

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'add', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));       
    }
};

const update = async ( req, rep ) => {
    try {
        const id = parseInt(req.params['id']);

        const url = req.protocol + '://' + req.get('host');

        const author_id = req.body.user.id;

        const { name, category_id, desc, price, discount, stock  } = req.body;

        const imgFile = req.files?.img?.[0];

        const fileName = imgFile?.originalname;

        const img = fileName ? url + '/' + fileName : null;   

        const response = await itemHelper.updateDataItem({ id, category_id, name, desc, price, discount, stock, img, author_id });

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'update', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));       
    }
};

const remove = async ( req, rep ) => {
    try {
        const id = parseInt(req.params['id']);

        const response = await itemHelper.deleteDataItem(id);

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'remove', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));       
    }
};

Router.get('/list', list);
Router.get('/detail/:id', detail);
Router.get('/author/:id', validateToken, roleAdmin, listByAuthor);
Router.get('/search', search);
Router.post('/add', uploadImg.fields([{name: 'img', maxCount: 1}]), validateToken, roleAdmin, add);
Router.patch('/update/:id', uploadImg.fields([{name: 'img', maxCount: 1}]), validateToken, roleAdmin, update);
Router.delete('/remove/:id', validateToken, roleAdmin, remove);

module.exports = Router;    