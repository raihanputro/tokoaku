const Boom = require('boom');
const _ = require('lodash');
const db = require('../../models');
const tb_cart = db.cart;
const tb_user = db.user;
const { responseSuccess, responseError, errorResponse } = require('../helpers/responseHelper');

const fileName = 'server/api/cartHelper.js';

const getCartList = async () => {
    try {
        const carts = await tb_cart.findAll({
            include: ['customer', 'item'],
        });

        return Promise.resolve(carts);    
    } catch (error) {
        console.log([fileName, 'getCartList', 'ERROR'], { info: `${error}` });
        return Promise.reject(errorResponse(error));    
    }
};

const getCartListByUser = async (id) => {

    try {
        const cartsByUser = await tb_cart.findAll({
            where: {
                user_id: id
            },
            include: ['customer', 'item'],
        });

        return Promise.resolve(cartsByUser);
    } catch (error) {
        console.log([fileName, 'getCartListByUser', 'ERROR'], { info: `${error}` });
        return Promise.reject(errorResponse(error));    
    }
}

const getCartDetail = async (id, res) => {
    try {
        const cartDetail = await tb_cart.findOne({
            where: {
                id: id
            },
            include: ['customer', 'item'],
        });

        return Promise.resolve(responseSuccess(res, 200, `Success get cart detail by id ${id}`, cartDetail));
    } catch (error) {
        console.log([fileName, 'getItemDetail', 'ERROR'], { info: `${error}` });
        return Promise.reject(responseError(res, 404, `Cannot get cart detail by id ${id}!`)); 
    }
};

const postDataCart = async (dataObject) => {
    const { item_id, user_id, qty } = dataObject;

    try {

        const checkCart = await tb_cart.findOne({
            where: {
                item_id: item_id,
                user_id: user_id
            }
        });

        if(!_.isEmpty(checkCart)) {
            await tb_cart.update({
                qty: checkCart.qty+qty
            }, {
                where: {
                    item_id: item_id,
                    user_id: user_id
                }
            })
        } else {
            await tb_cart.create({ item_id, user_id, qty });
        }
        return Promise.resolve(true);    
    } catch (error) {
        console.log([fileName, 'postDataCart', 'ERROR'], { info: `${error}` });
        return Promise.reject(errorResponse(error));    
    }
};

const updateDataCart = async (dataObject) => {
    const { id, qty } = dataObject;

    try {

        const checkCart = await tb_cart.findOne({
            where: {
                id: id
            }
        });


        if(_.isEmpty(checkCart)) {
            return Promise.reject(Boom.notFound(`Cannot find cart withb id ${id}!`));
        } else {
            await tb_cart.update({
                qty: qty,
            }, {
                where: {
                    id: id
                }
            });

            const updatedCart = await tb_cart.findOne({
                where: {
                    id: id
                },
                include: ['customer', 'item'],
            });

            return Promise.resolve(updatedCart);    
        };
    } catch (error) {
        console.log([fileName, 'updateDataCart', 'ERROR'], { info: `${error}` });
        return Promise.reject(errorResponse(error));    
    }
};

const deleteDataCart = async (id, res) => {
    try {
        const checkCart = await tb_cart.findOne({
            where: {
                id: id
            }
        });

        if(_.isEmpty(checkCart)) {
            return Promise.reject(Boom.notFound(`Cannot find cart with id ${id}!`));

        } else {
            await tb_cart.destroy({
                where: {
                    id: id
                }
            });
        };

        const carts = await tb_cart.findAll({
            include: ['customer', 'item'],
        });
        return Promise.resolve(carts);    
    } catch (error) {
        console.log([fileName, 'deleteDataItem', 'ERROR'], { info: `${error}` });
        return Promise.reject(responseError(res, 400, `Cannot delete cart by id ${id}!`)); 
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