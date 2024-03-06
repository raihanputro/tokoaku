const Boom = require('boom');
const _ = require('lodash');

const db = require('../../models');
const GeneralHelper = require('../helpers/generalHelper');

const fileName = 'server/api/wishlistHelper.js';

const getWishlistByUser = async (id) => {

    try {
        const checkUser = await db.user.findOne({
            where: {
                id: id
            }
        });

        if (_.isEmpty(checkUser)) {
            return Promise.reject(Boom.unauthorized(`Your not authorized to see this wishlist!`));
        }

        const wishlistsByUser = await db.wishlist.findAll({
            where: {
                user_id: id
            },
            include: ['item'],
        });

        return Promise.resolve({ 
            statusCode: 200,
            message: "Get wishlists by user successfully!",
            data: wishlistsByUser 
        });  
    } catch (error) {
        console.log([fileName, 'getWishlistByUser', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
}

const postWishlistData = async (dataObject) => {
    const { user_id, item_id } = dataObject;

    try {
        const checkUser = await db.user.findOne({
            where: {
                id: user_id
            }
        });

        if (_.isEmpty(checkUser)) {
            return Promise.reject(Boom.unauthorized(`Your not authorized to post wishlist!`));
        };

        await db.wishlist.create({ user_id, item_id });

        return Promise.resolve({ 
            statusCode: 200,
            message: "Post wishlist successfully!",
        });
    } catch (error) {
        console.log([fileName, 'postWishlistData', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const deleteWishlistData = async (id) => {
    try {
        const checkWishlist = await db.wishlist.findOne({
            where: {
                item_id: id
            }
        });

        if(_.isEmpty(checkWishlist)) {
            return Promise.reject(Boom.notFound(`Cannot find wishlist with item id ${id}!`));
        } else {
            await db.wishlist.destroy({
                where: {
                    item_id: id
                }
            });
        };

        return Promise.resolve({ 
            statusCode: 200,
            message: "delete wishlist successfully!",
        });    
    } catch (error) {
        console.log([fileName, 'deleteWishlistData', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

module.exports = {
    getWishlistByUser,
    postWishlistData,
    deleteWishlistData
}
