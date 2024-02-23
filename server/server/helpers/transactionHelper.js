const Boom = require('boom');
const _ = require('lodash');
const axios = require('axios');

const GeneralHelper = require('../helpers/generalHelper');

const fileName = 'server/api/transactionHelper.js';

const getProvince = async () => {
    try {
        const province = await axios.get(
            'https://api.rajaongkir.com/starter/province',
            {
                headers: {
                    'key': '8fffc163b2c8eff0b2d8a016df4107f9',
                }
            }
        );

        return Promise.resolve({ 
            statusCode: 200,
            message: "Get province successfully!",
            data: province.data
        }); 
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log([fileName, 'getProvince', 'ERROR'], { info: `${error}` });
        throw GeneralHelper.errorResponse(error);
    }
};

const getCity = async (provinceId) => {
    try {
        const city = await axios.get(
            `https://api.rajaongkir.com/starter/city?province=${provinceId}`,
            {
                headers: {
                    'key': '8fffc163b2c8eff0b2d8a016df4107f9',
                }
            }
        );

        return Promise.resolve({ 
            statusCode: 200,
            message: "Get city successfully!",
            data: city.data
        }); 
    } catch (error) {
        console.log([fileName, 'getCity', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const getShippingCost = async (dataObject) => {
    const { origin, destination, weight, courier } = dataObject;

    try {
        const shippingCost = await axios.post(
            'https://api.rajaongkir.com/starter/cost',
            { origin, destination, weight, courier },
            {
                headers: {
                    'key': '8fffc163b2c8eff0b2d8a016df4107f9',
                    'content-type': 'application/x-www-form-urlencoded'
                }
            }
        );

        return Promise.resolve({ 
            statusCode: 200,
            message: "Get shipping cosst successfully!",
            data: shippingCost.data
        }); 
    } catch (error) {
        console.log([fileName, 'getShippingCost', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

module.exports = {
    getProvince,
    getCity,
    getShippingCost
}