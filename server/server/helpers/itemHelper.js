const Boom = require('boom');
const _ = require('lodash');
const db = require('../../models');
const tb_item = db.item;
const tb_user = db.user;
const { errorResponse } = require('../helpers/responseHelper');

const fileName = 'server/api/itemHelper.js';

const getItemList = async () => {
    try {
        const items = await tb_item.findAll();

        return Promise.resolve(items);    
    } catch (error) {
        console.log([fileName, 'getItemList', 'ERROR'], { info: `${error}` });
        return Promise.reject(errorResponse(error));    
    }
};

const getItemListByAuthor = async (id, res) => {
    try {
        const isAdmin = await tb_user.findOne({
            where: {
                id: id,
                role: 'admin'
            }
        });

        if(_.isEmpty(isAdmin)) {
            return Promise.reject(responseError(res, 400, 'this user id is not admin!'))
        } else {
            const itemsByAuthor = await tb_item.findAll({
                where: {
                    author_id: id
                },
                include: {
                    model: tb_user,
                    as: 'author',
                    attributes: ['username'],
                    required: false
                }
            });
            return Promise.resolve(responseSuccess(res, 200, `Success get item list by author id ${id}`, itemsByAuthor));
        }
    } catch (error) {
        console.log([fileName, 'postDataItem', 'ERROR'], { info: `${error}` });
        return Promise.reject(responseError(res, 404, `Cannot get item list by author id ${id}!`)); 
    }
};

const getItemDetail = async (id) => {
    try {
        const itemDetail = await tb_item.findOne({
            where: {
                id: id
            }
        });

        return Promise.resolve(itemDetail);    
    } catch (error) {
        console.log([fileName, 'getItemDetail', 'ERROR'], { info: `${error}` });
        return Promise.reject(errorResponse(error));    
    }
};

const postDataItem = async (dataObject) => {
    const { kategori_id, name, desc, price, stock, img, author_id } = dataObject;

    try {
        await tb_item.create({ kategori_id, name, desc, price, stock, img, author_id });

        const itemPosted = await tb_item.findOne({
            where: {
                name: name
            }
        });

        return Promise.resolve(itemPosted);
    } catch (error) {
        console.log([fileName, 'postDataItem', 'ERROR'], { info: `${error}` });
        return Promise.reject(errorResponse(error));    
    }
};

const updateDataItem = async (dataObject) => {
    const { id, kategori_id, name, desc, price, stock, img, author_id } = dataObject;

    try {
        const checkItem = await tb_item.findOne({
            where: {
                id: id
            }
        });


        if(_.isEmpty(checkItem)) {
            return Promise.reject(Boom.notFound(`Cannot find item with id ${id}!`));
        } else {
            await tb_item.update({
                kategori_id: kategori_id,
                name: name,
                desc: desc,
                price: price,
                stock: stock,
                img: img,
                author_id: author_id
            }, {
                where: {
                    id: id
                }
            });

            const updatedItem = await tb_item.findOne({
                where: {
                    id: id
                }
            });

            return Promise.resolve(updatedItem);
        };
    } catch (error) {
        console.log([fileName, 'updateDataItem', 'ERROR'], { info: `${error}` });
        return Promise.reject(errorResponse(error));    
    }
};

const deleteDataItem = async (id) => {
    try {
        const checkItem = await tb_item.findOne({
            where: {
                id: id
            }
        });

        if(_.isEmpty(checkItem)) {
            return Promise.reject(Boom.notFound(`Cannot find item with id ${id}!`));
        } else {
            await tb_item.destroy({
                where: {
                    id: id
                }
            });
        };

        const items = await tb_item.findAll();

        return Promise.resolve(items);
    } catch (error) {
        console.log([fileName, 'deleteDataItem', 'ERROR'], { info: `${error}` });
        return Promise.reject(errorResponse(error));    
    }
};

module.exports = {
    getItemList,
    getItemListByAuthor,
    getItemDetail,
    postDataItem,
    updateDataItem,
    deleteDataItem
}