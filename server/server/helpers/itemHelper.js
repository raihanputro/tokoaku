const Boom = require('boom');
const _ = require('lodash');

const db = require('../../models');
const GeneralHelper = require('../helpers/generalHelper');

const fileName = 'server/api/itemHelper.js';

const getItemList = async () => {
    try {
        const items = await db.item.findAll({
            include: [
                {
                    model: db.user,
                    as: 'author',
                    attributes: ['username'],
                    required: false
                },
                {
                    model: db.category,
                    as: 'category',
                    attributes: ['name'],
                    required: false
                }
            ]
        });

        if(_.isEmpty(items)) {
            return Promise.resolve({ 
                statusCode: 404,
                message: "Item lists is empty!",
            });   
        };

        return Promise.resolve({ 
            statusCode: 200,
            message: "Get items list successfully!",
            data: items 
        });      
    } catch (error) {
        console.log([fileName, 'getItemList', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const getItemListByAuthor = async (id) => {
    try {
        const itemsByAuthor = await db.item.findAll({
            where: {
                author_id: id
            },
            include: {
                model: db.user,
                as: 'author',
                attributes: ['username'],
                required: false
            }
        });

        if(_.isEmpty(itemsByAuthor)) {
            return Promise.reject(Boom.notFound(`Cannot find item list by this author!`));
        }

        return Promise.resolve({ 
            statusCode: 200,
            message: "Get items list by author successfully!",
            data: itemsByAuthor 
        });    
    } catch (error) {
        console.log([fileName, 'getItemListByAuthor', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const getItemDetail = async (id) => {
    try {
        const itemDetail = await db.item.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: db.review,
                    as: 'review',
                    required: false,
                    include: [
                        {
                            model: db.user,
                            as: 'user',
                            required: false
                        }
                    ]
                }
            ]
        });

        if(_.isEmpty(itemDetail)) {
            return Promise.reject(Boom.notFound(`Cannot find item detail with id ${id}!`));
        };

        return Promise.resolve({ 
            statusCode: 200,
            message: "Get item detail successfully!",
            data: itemDetail 
        });    
    } catch (error) {
        console.log([fileName, 'getItemDetail', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const postDataItem = async (dataObject) => {
    const { category_id, name, desc, price, stock, discount, img, author_id } = dataObject;

    try {
        await db.item.create({ category_id, name, desc, price, discount, stock, img, author_id });

        const itemPosted = await db.item.findOne({
            where: {
                name: name
            }
        });

        return Promise.resolve({ 
            statusCode: 201,
            message: "Create item successfully!",
            data: itemPosted 
        });   
    } catch (error) {
        console.log([fileName, 'postDataItem', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const updateDataItem = async (dataObject) => {
    const { id, kategori_id, name, desc, price, discount, stock, img, author_id } = dataObject;

    try {
        const checkItem = await db.item.findOne({
            where: {
                id: id
            }
        });

        if (_.isEmpty(checkItem)) {
            return Promise.reject(Boom.notFound(`Cannot find item with id ${id}!`));
        } else {
            await db.item.update({
                kategori_id: kategori_id ? kategori_id : checkItem.dataValues.kategori_id,
                name: name ? name : checkItem.dataValues.name,
                desc: desc ? desc : checkItem.dataValues.desc,
                price: price ? price : checkItem.dataValues.price,
                discount: discount ? discount : checkItem.dataValues.discount,
                stock: stock ? stock : checkItem.dataValues.stock,
                img: img ? img : checkItem.dataValues.img,
                author_id: author_id
            }, {
                where: {
                    id: id
                }
            });

            const updatedItem = await db.item.findOne({
                where: {
                    id: id
                }
            });

            return Promise.resolve({ 
                statusCode: 200,
                message: "Update item successfully!",
                data: updatedItem 
            });   
        };
    } catch (error) {
        console.log([fileName, 'updateDataItem', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const deleteDataItem = async (id) => {
    try {
        const checkItem = await db.item.findOne({
            where: {
                id: id
            }
        });

        if (_.isEmpty(checkItem)) {
            return Promise.reject(Boom.notFound(`Cannot find item with id ${id}!`));
        } else {
            await db.item.destroy({
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
    getItemList,
    getItemListByAuthor,
    getItemDetail,
    postDataItem,
    updateDataItem,
    deleteDataItem
}