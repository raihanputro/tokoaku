const Router = require('express').Router();

const CartHelper = require('../helpers/cartHelper');
const GeneralHelper = require('../helpers/generalHelper');
const { responseSuccess, responseError } = require('../helpers/responseHelper');
const { idValidation, cartDataValidation } = require('../helpers/validationHelper');
const { validateToken, roleCustomer } = require('../middlewares/authMiddleware')

const fileName = 'server/api/cart.js';

const list = async ( req, rep ) => {
    try {
        const response = await CartHelper.getCartList();

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'list', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
};  

const listByUser = async ( req, rep ) => {
    try {
        const id = req.body.user.id;

        const response = await CartHelper.getCartListByUser(id);

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'listByUser', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
};

const detail = async ( req, rep ) => {

    idValidation(req.params);

    const id = parseInt(req.params['id']);

    try {
        const response = await CartHelper.getCartDetail(id);

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'detail', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
};

const add = async ( req, rep ) => {
    try {
        // cartDataValidation(req.body);
        
        const { item_id, user_id, price, qty } = req.body;

        const response = await CartHelper.createDataCart({ item_id, user_id, price, qty });

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

        const { price, qty } = req.body;

        const response = await CartHelper.updateDataCart({ id, price, qty });  

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'update', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
};

const remove = async ( req, rep ) => {

    idValidation(req.params);

    const id = parseInt(req.params['id']);

    try {
        const response = await CartHelper.deleteDataCart(id);

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'remove', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
}


Router.get('/list', validateToken, list);
Router.get('/user-list', validateToken, listByUser);
Router.get('/detail/:id', validateToken, detail);
Router.post('/add', validateToken, add);
Router.put('/update/:id', validateToken, update);
Router.delete('/remove/:id', validateToken, roleCustomer, remove)

module.exports = Router; 