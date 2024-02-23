const Router = require('express').Router();

const WishlistHelper = require('../helpers/wishlistHelper');
const GeneralHelper = require('../helpers/generalHelper');
const { validateToken, roleCustomer } = require('../middlewares/authMiddleware')
const { idValidation } = require('../helpers/validationHelper');

const fileName = 'server/api/wishlist.js';

const listByUser = async ( req, rep ) => {
    try {
        const id = req.body.user.id;

        const response = await WishlistHelper.getWishlistByUser(id);

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'listByUser', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
};

const add = async ( req, rep ) => {
    try {        
        const user_id = req.body.user.id;

        const { item_id } = req.body;

        const response = await WishlistHelper.postWishlistData({ user_id, item_id });

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'add', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
};

const remove = async ( req, rep ) => {

    idValidation(req.params);

    const id = parseInt(req.params['id']);

    try {
        const response = await WishlistHelper.deleteWishlistData(id);

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'remove', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
};

Router.get('/user', validateToken, roleCustomer, listByUser)
Router.post('/add', validateToken, roleCustomer, add);
Router.delete('/remove/:id', validateToken, roleCustomer, remove);

module.exports = Router;
