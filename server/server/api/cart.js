const Router = require('express').Router();

const cartHelper = require('../helpers/cartHelper');
const { responseSuccess, responseError } = require('../helpers/responseHelper');
const { idValidation, cartDataValidation } = require('../helpers/validationHelper');
const { validateToken, roleCustomer } = require('../middlewares/authMiddleware')

const list = async ( req, res ) => {
    try {
        const response = await cartHelper.getCartList();

        return responseSuccess(res, 200, `Success get all cart!`, response);
    } catch (error) {
        return responseError(res, 404, 'Cannot get cart list!', error);
    }
};  

const listByUser = async ( req, res ) => {
    try {
        const id = parseInt(req.params['id']);

        const response = await cartHelper.getCartListByUser(id);

        return responseSuccess(res, 200, `Success get cart list by user!`, response);
    } catch (error) {
        return responseError(res, 404, 'Cannot get cart list by user!', error);
    }
}

const detail = async ( req, res ) => {

    idValidation(req.params);

    const id = parseInt(req.params['id']);

    try {
        const response = await cartHelper.getCartDetail(id, res);

        return response;   
    } catch (error) {
        return responseError(res, 404, `Cannot get cart detail with id ${id}!`);
    }
};

const add = async ( req, res ) => {
    try {
        cartDataValidation(req.body);
        
        const { item_id, user_id, qty } = req.body;

        console.log(req.body)

        const response = await cartHelper.postDataCart({ item_id, user_id, qty });

        return responseSuccess(res, 200, `Success add cart!`, response);
    } catch (error) {
        return responseError(res, 404, `Cannot add cart!`, error);
    }
};

const update = async ( req, res ) => {

    idValidation(req.params);

    const id = parseInt(req.params['id']);

    try {
        const { qty } = req.body;

        const response = await cartHelper.updateDataCart({ id, qty });  

        return responseSuccess(res, 200, `Success update cart with id${id}!`, response);
    } catch (error) {
        return responseError(res, 404, `Cannot find cart with id ${id}!`);
    }
};

const remove = async ( req, res ) => {

    idValidation(req.params);

    const id = parseInt(req.params['id']);

    try {
        const response = await cartHelper.deleteDataCart(id);

        return responseSuccess(res, 200, `Success delete cart with id${id}!`, response);
    } catch (error) {
        return responseError(res, 404, `Cannot find cart with id ${id}!`);
    }
}


Router.get('/list', validateToken, list);
Router.get('/user/:id', validateToken, listByUser);
Router.get('/detail/:id', validateToken, detail);
Router.post('/add', validateToken, add);
Router.put('/update/:id', validateToken, update);
Router.delete('/remove/:id', validateToken, roleCustomer, remove)

module.exports = Router; 