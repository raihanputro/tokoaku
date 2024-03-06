const Router = require('express').Router();

const TransactionHelper = require('../helpers/transactionHelper');
const GeneralHelper = require('../helpers/generalHelper');
const AuthMiddleware = require('../middlewares/authMiddleware');
const { decryptTextPayload } = require('../utils/decrypt');


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
        console.log([fileName, 'shippingCost', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
};  

const list = async ( req, rep ) => {
    try {
        const response = await TransactionHelper.getAllTransactionList();

        return rep.send(response);
    } catch (error) {
        console.log([fileName, 'list', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));       
    }
}

const listByCustomer = async ( req, rep ) => {
    try {
        const id = req.body.user.id;

        const response = await TransactionHelper.getTransactionListByUser(id);

        return rep.send(response);    
     }catch (error) {
        console.log([fileName, 'listByCustomer', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));       }
};

const detail = async ( req, rep ) => {
    try {    
        const id = parseInt(req.params['id']);

        const user_id = req.body.user.id;

        const response = await TransactionHelper.getTransactionDetail({ id, user_id });

        return rep.send(response);    
    } catch (error) {
        console.log([fileName, 'detail', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));       
    }
};

const add = async ( req, rep ) => {
    try {
        const user_id = req.body.user.id;

        const {
            fullName,
            address,
            phone,
            province,
            city,
            service,
            shippingCost,
            subtotal,
            total, 
            status,
            orderAt,
            expiryAt
        } = req.body;


    
        const response = await TransactionHelper.createTransaction({
            user_id,
            fullName,
            address,
            phone,
            province,
            city,
            service,
            shippingCost,
            subtotal,
            total, 
            status,
            orderAt,
            expiryAt
        }); 
    
        return rep.send(response);
    } catch (error) {
        console.log([fileName, 'add', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));    
    }
};

const updateStatusAdmin = async ( req, rep ) => {
    try {
        const id = parseInt(req.params['id']);

        const response = await TransactionHelper.updateStatusFromAdmin(id);

        return rep.send(response);
    } catch (error) {
        console.log([fileName, 'updateFromMidtrans', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));       
    }
};


const updateFromMidtrans = async ( req, rep ) => {
    try {
        const data = req.body;

        const response = await TransactionHelper.updateStatusFromMidtrans(data);

        return rep.send(response);
    } catch (error) {
        console.log([fileName, 'updateFromMidtrans', 'ERROR'], { info: `${error}` });
        return rep.send(GeneralHelper.errorResponse(error));       
    }
};


Router.get('/province', AuthMiddleware.validateToken, province);
Router.get('/city/:provinceId', AuthMiddleware.validateToken, city);
Router.get('/list', AuthMiddleware.validateToken, list);
Router.get('/user', AuthMiddleware.validateToken, listByCustomer);
Router.get('/detail/:id', AuthMiddleware.validateToken, detail);
Router.post('/shipping-cost', AuthMiddleware.validateToken, shippingCost);
Router.post('/add', AuthMiddleware.validateToken, add);
Router.patch('/status-admin/:id', AuthMiddleware.validateToken, updateStatusAdmin);
Router.put('/notification', updateFromMidtrans);

module.exports = Router; 