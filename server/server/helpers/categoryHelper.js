const Boom = require('boom');
const _ = require('lodash');

const db = require('../../models');
const GeneralHelper = require('../helpers/generalHelper');

const fileName = 'server/api/categoryHelper.js';

const getCategoryList = async () => {
    try {
        const categories = await db.category.findAll({
            include: {
                model: db.user,
                as: 'author',
                attributes: ['username'],
                required: false
            }
        });

        if(_.isEmpty(categories)) {
            return Promise.reject(Boom.notFound(`Category list is empty!`));
        };

        return Promise.resolve({ 
            statusCode: 200,
            message: "Get categories list successfully!",
            data: categories 
        });  
    } catch (error) {
        console.log([fileName, 'getCategoryList', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const getCategoryDetail = async (id) => {
    try {
        const categoryDetail = await db.category.findOne({
            where: {
                id: id
            },
            include: {
                model: db.user,
                as: 'author',
                attributes: ['username'],
                required: false
            }
        });

        if(_.isEmpty(categoryDetail)) {
            return Promise.reject(Boom.notFound(`Cannot find category detail with id ${id}!`));
        };

        return Promise.resolve({ 
            statusCode: 200,
            message: "Get category detail successfully!",
            data: categoryDetail 
        }); 
    } catch (error) {
        console.log([fileName, 'getCategoryDetail', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
}

const postCategoryData = async (dataObject) => {
    const { name, icon, author_id } = dataObject;

    try {
        await db.category.create({ name, icon, author_id });

        const categoryPosted = await db.category.findOne({
            where: {
                name: name
            }
        });

        return Promise.resolve({ 
            statusCode: 200,
            message: "Create category successfully!",
            data: categoryPosted 
        });   
    } catch (error) {
        console.log([fileName, 'postCategoryData', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const updateCategoryData = async ( dataObject ) => {
    const { id, name, icon, author_id } = dataObject;

    try {
        const categoryCheck = await db.category.findOne({
            where: {
                id: id
            }
        });

        if (_.isEmpty(categoryCheck)) {
            return Promise.reject(Boom.notFound(`Cannot find category with id ${id}!`));
        } else {
            await db.category.update({
                name: name ? name : categoryCheck.dataValues.name,
                icon: icon ? icon : categoryCheck.dataValues.icon,
                author_id: author_id
            }, {
                where: {
                    id: id
                }
            });

            const updatedCategory = await db.category.findOne({
                where: {
                    id: id
                }
            });

            return Promise.resolve({ 
                statusCode: 200,
                message: "Update category successfully!",
                data: updatedCategory 
            });   
        }
    } catch (error) {
        console.log([fileName, 'updateCategoryData', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));  
    }
};

const deleteCategoryData = async (id) => {
    try {
        const checkCategory = await db.category.findOne({
            where: {
                id: id
            }
        });

        if (_.isEmpty(checkCategory)) {
            return Promise.reject(Boom.notFound(`Cannot find category with id ${id}!`));
        } else {
            await db.category.destroy({
                where: {
                    id: id
                }
            });
        };

        return Promise.resolve({ 
            statusCode: 200,
            message: "delete category successfully!",
        }); 
    } catch (error) {
        console.log([fileName, 'deleteCategoryData', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
}

module.exports = {
    getCategoryList,
    getCategoryDetail,
    postCategoryData,
    updateCategoryData,
    deleteCategoryData
}