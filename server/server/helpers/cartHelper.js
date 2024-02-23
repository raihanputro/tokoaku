const Boom = require('boom');
const _ = require('lodash');

const db = require('../../models');
const GeneralHelper = require('../helpers/generalHelper');

const fileName = 'server/api/cartHelper.js';

const getCartList = async () => {
    try {
        const carts = await db.cart.findAll({
            include: ['customer', 'item'],
        });

        if(_.isEmpty(carts)) {
            return Promise.reject(Boom.notFound(`Cart list is empty!`));
        };

        return Promise.resolve({ 
            statusCode: 200,
            message: "Get carts list successfully!",
            data: carts 
        });    
    } catch (error) {
        console.log([fileName, 'getCartList', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const getCartListByUser = async (id) => {

    try {
        const checkUser = await db.user.findOne({
            where: {
                id: id
            }
        });

        if (_.isEmpty(checkUser)) {
            return Promise.reject(Boom.unauthorized(`Your not authorized to see this cart!`));
        }

        const cartsByUser = await db.cart.findAll({
            where: {
                user_id: id
            },
            include: ['customer', 'item'],
        });

            // if(_.isEmpty(cartsByUser)) {
            //     return Promise.reject(Boom.notFound(`Cart list by this user is empty!`));
            // };

        return Promise.resolve({ 
            statusCode: 200,
            message: "Get carts by user list successfully!",
            data: cartsByUser 
        });  
    } catch (error) {
        console.log([fileName, 'getCartListByUser', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
}

const getCartDetail = async (id) => {
    try {
        const cartDetail = await db.cart.findOne({
            where: {
                id: id
            },
            include: ['customer', 'item'],
        });

        // if (_.isEmpty(cartDetail)) {
        //     return Promise.reject(Boom.notFound(`Cart detail is empty!`));
        // };

        return Promise.resolve({ 
            statusCode: 200,
            message: "Get cart detail successfully!",
            data: cartDetail 
        });    
    } catch (error) {
        console.log([fileName, 'getItemDetail', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const postDataCart = async (dataObject) => {
    const { item_id, user_id, qty } = dataObject;

    try {
        const checkCart = await db.cart.findOne({
            where: {
                item_id: item_id,
                user_id: user_id
            }
        });

        if(!_.isEmpty(checkCart)) {
            await db.cart.update({
                qty: checkCart.qty+qty
            }, {
                where: {
                    item_id: item_id,
                    user_id: user_id
                }
            })
        } else {
            await db.cart.create({ item_id, user_id, qty });
        };

        return Promise.resolve({ 
            statusCode: 200,
            message: "Post cart successfully!",
        });    
    } catch (error) {
        console.log([fileName, 'postDataCart', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const updateDataCart = async (dataObject) => {
    const { id, qty } = dataObject;

    try {

        const checkCart = await db.cart.findOne({
            where: {
                id: id
            }
        });

        if(_.isEmpty(checkCart)) {
            return Promise.reject(Boom.notFound(`Cannot find cart withb id ${id}!`));
        } else {
            await db.cart.update({
                qty: qty,
            }, {
                where: {
                    id: id
                }
            });

            const updatedCart = await db.cart.findOne({
                where: {
                    id: id  
                },
                include: ['customer', 'item'],
            });

            return Promise.resolve({ 
                statusCode: 200,
                message: "Update cart successfully!",
                data: updatedCart 
            });      
        };
    } catch (error) {
        console.log([fileName, 'updateDataCart', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const deleteDataCart = async (id) => {
    try {
        const checkCart = await db.cart.findOne({
            where: {
                id: id
            }
        });

        if(_.isEmpty(checkCart)) {
            return Promise.reject(Boom.notFound(`Cannot find cart with id ${id}!`));
        } else {
            await db.cart.destroy({
                where: {
                    id: id
                }
            });
        };

        return Promise.resolve({ 
            statusCode: 200,
            message: "delete item successfully!",
        });    
    } catch (error) {
        console.log([fileName, 'deleteDataItem', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

module.exports = {
    getCartList,
    getCartListByUser,
    getCartDetail,
    postDataCart,
    updateDataCart,
    deleteDataCart
}