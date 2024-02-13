const Router = require('express').Router();

const itemHelper = require('../helpers/itemHelper');
const { responseSuccess, responseError } = require('../helpers/responseHelper');
const { idValidation, itemDataValidation } = require('../helpers/validationHelper');
const { validateToken, roleAdmin } = require('../middlewares/authMiddleware');
const { uploadImg } = require('../middlewares/uploadImgMiddleware');

const list = async ( req, res ) => {
    try {
        const response = await itemHelper.getItemList();

        return responseSuccess(res, 200, 'Success get item list!', response);
    } catch (error) {
        return responseError(res, 404, 'Cannot get item list!');
    }
};

const listByAuthor = async ( req, res ) => {

    idValidation(req.params);

    const id = parseInt(req.params['id']);

    try {
        const response = await itemHelper.getItemListByAuthor(id, res);

        return response;   
    } catch (error) {
        return responseError(res, 404, `Cannot get item list by author  id ${id}!`);
    }
};

const detail = async ( req, res ) => {

    idValidation(req.params);

    const id = parseInt(req.params['id']);

    try {
        const response = await itemHelper.getItemDetail(id, res);

        return responseSuccess(res, 200, 'Success get item detail!', response);
    } catch (error) {
        return responseError(res, 404, `Cannot get item detail with id ${id}!`);
    }
};

const add = async ( req, res ) => {
    try {   
        itemDataValidation(req.body);

        const url = req.protocol + '://' + req.get('host');

        const {kategori_id, name, desc, price, stock, author_id } = req.body;

        const imgFile = req.files.img[0];

        const fileName = imgFile.originalname;
        
        const img = url + '/' + fileName;

        const response = await itemHelper.postDataItem({ kategori_id, name, desc, price, stock, img, author_id });

        return responseSuccess(res, 200, 'Success add item!', response);
    } catch (error) {
        return responseError(res, 404, `Cannot add item!`);
    }
};

const update = async ( req, res ) => {

    idValidation(req.params);

    const id = parseInt(req.params['id']);

    try {
        itemDataValidation(req.body);
        const url = req.protocol + '://' + req.get('host');

        const {kategori_id, name, desc, price, stock, author_id } = req.body;

        let img;

        if (req.file) {
            const imgFile = req.file;
            const fileName = imgFile.originalname;
            img = url + '/' + fileName;
          } else if (req.body.img) {
            img = req.body.img;
          } 

        const response = await itemHelper.updateDataItem({ id, kategori_id, name, desc, price, stock, img, author_id });

        return responseSuccess(res, 200, 'Success update item!', response);
    } catch (error) {
        return responseError(res, 500, `Internal Server Error`, error);
    }
};

const remove = async ( req, res ) => {

    // idValidation(req.params);

    const id = parseInt(req.params['id']);

    try {

        const response = await itemHelper.deleteDataItem(id);

        return responseSuccess(res, 200, 'Success delete item!', response);
    } catch (error) {
        return responseError(res, 404, `Cannot find item with id ${id}!`);
    }
};

Router.get('/list', list);
Router.get('/author/:id', validateToken, roleAdmin, listByAuthor);
Router.get('/detail/:id', validateToken, detail);
Router.post('/add', validateToken, roleAdmin, uploadImg.fields([{name: 'img', maxCount: 1}]), add);
Router.put('/update/:id', validateToken, roleAdmin, uploadImg.fields([{name: 'img', maxCount: 1}]), update);
Router.delete('/remove/:id', validateToken, roleAdmin, remove)

module.exports = Router;    