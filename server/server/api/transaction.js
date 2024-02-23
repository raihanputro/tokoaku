const Router = require('express').Router();

const TransactionHelper = require('../helpers/transactionHelper');
const GeneralHelper = require('../helpers/generalHelper');
const AuthMiddleware = require('../middlewares/authMiddleware');

const fileName = 'server/api/transaction.js';

const province = async ( req, rep ) => {
    try {
        const response = await TransactionHelper.getProvince();

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'province', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
};  

const city = async ( req, rep ) => {
    try {
        const provinceId = req.params['provinceId'];

        const response = await TransactionHelper.getCity(provinceId);

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'city', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
};  

const shippingCost = async ( req, rep ) => {
    try {
        const { origin, destination, weight, courier } = req.body;

        const response = await TransactionHelper.getShippingCost({ origin, destination, weight, courier });

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'lisshippingCostt', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
};  

Router.get('/province', AuthMiddleware.validateToken, province);
Router.get('/city/:provinceId', AuthMiddleware.validateToken, city);
Router.post('/shipping-cost', AuthMiddleware.validateToken, shippingCost);

module.exports = Router; 