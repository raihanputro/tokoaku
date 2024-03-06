const Boom = require('boom');
const _ = require('lodash');

const db = require('../../models');
const GeneralHelper = require('../helpers/generalHelper');

const fileName = 'server/api/reviewHelper.js';

const getReviewByTransaction = async (dataObject) => {
    const { user_id, transaction_id } = dataObject;

    try {
        const reviewByTr = await db.review.findOne({
            where: {
                user_id: user_id,
                transaction_id: transaction_id
            }
        });

        if(_.isEmpty(reviewByTr)) {
            return Promise.reject(Boom.notFound(`Cannot review!`));
        };

        return Promise.resolve({ 
            statusCode: 200,
            message: "Get review by transaction successfully!",
            data: reviewByTr 
        });
    } catch (error) {
        console.log([fileName, 'getReviewByTransaction', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
}

const postReviewData = async ( dataObject ) => {
    const { user_id, transaction_id, rating, comment } = dataObject;

    try {
        const order = await db.order.findAll({
            include: [
                {
                    model: db.transaction,
                    as: 'transaction',
                    required: false
                },
                {
                    model: db.item,
                    as: 'item',
                    required: false,
                    include: [
                        {
                            model: db.review,
                            as: 'review',
                            required: false
                        }
                    ]
                }
            ],
            where: {
                transaction_id: transaction_id,
            }
        });

        await db.review.create({
            user_id: user_id,
            transaction_id: transaction_id,
            item_id: 0,
            rating: rating,
            comment: comment
        });

        order.map(async (item) => {

            
            await db.review.create({
                user_id,
                transaction_id,
                item_id: item.item.id,
                rating,
                comment
            });

            await db.item.update({
                rating: rating,
            }, {
                where: {
                    id: item.item.id
                }
            });
        });

        return Promise.resolve({ 
            statusCode: 201,
            message: "Create review successfully!",
        });  
    } catch (error) {
        console.log([fileName, 'postReviewData', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const updateReviewData = async (dataObject) => {
    const { transaction_id, rating, comment } = dataObject;

    try {
        const checkReview = await db.review.findAll({
            where: {
                transaction_id: transaction_id,
            }
        });

        if (_.isEmpty(checkReview)) {
            return Promise.reject(Boom.notFound(`Cannot find review!`));
        } else {
            await db.review.update({
                rating: rating,
                comment: comment
            }, {
                where: {
                    transaction_id: transaction_id,
                }
            });

            const updatedReview = await db.review.findAll({
                where: {
                    transaction_id: transaction_id,
                }
            });

            return Promise.resolve({ 
                statusCode: 200,
                message: "Update review successfully!",
                data: updatedReview
            });   
        };
    } catch (error) {
        console.log([fileName, 'updateReviewData', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
}

module.exports = {
    getReviewByTransaction,
    postReviewData,
    updateReviewData
};
