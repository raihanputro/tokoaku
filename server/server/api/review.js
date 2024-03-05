const Router = require('express').Router();

const ReviewHelper = require('../helpers/reviewHelper');
const GeneralHelper = require('../helpers/generalHelper');
const { validateToken } = require('../middlewares/authMiddleware')

const fileName = 'server/api/review.js';

const listByTr = async ( req, rep ) => {
    try {
        const user_id = req.body.user.id;

        const transaction_id = parseInt(req.params['id']);

        const response = await ReviewHelper.getReviewByTransaction({ user_id, transaction_id });

        return rep.send(response);  
    } catch (error) {
        console.log([fileName, 'listByTr', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
};

const add = async ( req, rep ) => {
    try {        
        const user_id = req.body.user.id;

        const { transaction_id, rating, comment } = req.body;

        const response = await ReviewHelper.postReviewData({ user_id, transaction_id, rating, comment });

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'add', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
};

const update = async ( req, rep ) => {
    try {
        const { transaction_id, rating, comment  } = req.body;

        const response = await ReviewHelper.updateReviewData({ transaction_id, rating, comment });

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'update', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));       
    }
};

Router.get('/tr-list/:id', validateToken, listByTr);
Router.post('/add', validateToken, add);
Router.patch('/update', validateToken, update);

module.exports = Router; 