const Boom = require('boom');
const _ = require('lodash');
const axios = require('axios');
const crypto = require('crypto');
const { Op } = require('sequelize');

const db = require('../../models');
const GeneralHelper = require('../helpers/generalHelper');
const mailer = require('../utils/mailer');
const { getKey, setKey } = require('../services/redis');

const fileName = 'server/api/transactionHelper.js';

const getProvince = async () => {
    try {
        const provinceRedis = await getKey({
            key: 'province-list',
            isErrorOptional: true
        });

        console.log(_.isEmpty(provinceRedis))

        if (_.isEmpty(provinceRedis)) {
            const province = await axios.get(
                'https://api.rajaongkir.com/starter/province',
                {
                    headers: {
                        'key': process.env.RAJAONGKIR_KEY,
                    }
                }
            );

            await setKey({
                key: 'province-list',
                value: JSON.stringify(province.data.rajaongkir.results)
            });
    
            return Promise.resolve({ 
                statusCode: 200,
                message: "Get province successfully!",
                data: province.data.rajaongkir.results
            }); 
        } else {
            return Promise.resolve({ 
                statusCode: 200,
                message: "Get province successfully!",
                data: JSON.parse(provinceRedis) 
            });
        };
    } catch (error) {
        console.log([fileName, 'getCity', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const getCity = async (provinceId) => {
    try {
        const cityRedis = await getKey({
            key: `city-list-${provinceId}`,
            isErrorOptional: true
        });

        if (_.isEmpty(cityRedis)) {
            const city = await axios.get(
                `https://api.rajaongkir.com/starter/city?province=${provinceId}`,
                {
                    headers: {
                        'key': process.env.RAJAONGKIR_KEY,
                    }
                }
            );

            await setKey({
                key: `city-list-${provinceId}`,
                value: JSON.stringify(city.data.rajaongkir.results)
            });
    
            return Promise.resolve({ 
                statusCode: 200,
                message: "Get city successfully!",
                data: city.data.rajaongkir.results
            }); 
        } else {
            return Promise.resolve({ 
                statusCode: 200,
                message: "Get city successfully!",
                data: JSON.parse(cityRedis)
            });
        }
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
            { 
                origin, 
                destination, 
                weight, 
                courier 
            },
            {
                headers: {
                    'key': process.env.RAJAONGKIR_KEY,
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

const getAllTransactionList = async () => {
    try {
        const transactions = await db.transaction.findAll({
            order: [
                ['orderAt', 'DESC']
            ],
            include: [
                {
                    model: db.order,
                    as: 'order',
                    required: false
                }
            ]
        });

        if(_.isEmpty(transactions)) {
            return Promise.resolve({ 
                statusCode: 404,
                message: "Transactions list is empty!",
            });   
        };

        return Promise.resolve({ 
            statusCode: 200,
            message: "Get transactions list successfully!",
            data: transactions 
        });      
    } catch (error) {
        console.log([fileName, 'getAllTransactionList', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};  

const getTransactionListByUser = async (id) => {
    try {
        const transactions = await db.transaction.findAll({
            include: [
                {
                    model: db.order,
                    as: 'order',
                    required: false,
                    include: [
                        {
                            model: db.item,
                            as: 'item',
                            required: false,
                        }
                    ]
                }
            ],
            where: {
                user_id: id
            },
            order: [
                ['orderAt', 'DESC']
            ],
        });
        
        if(_.isEmpty(transactions)) {
            return Promise.resolve({ 
                statusCode: 404,
                message: `Transaction list by id ${id} is empty!`,
            });   
        };
        
        await db.transaction.update({
            status: 'FAIL'
        }, {
            where: {
                expiryAt: {
                    [Op.lt]: new Date() 
                },
                status: 'PENDING'
            }
        });

        return Promise.resolve({ 
            statusCode: 200,
            message: `Get Transaction list by id ${id} successfully!`,
            data: transactions 
        });     
    } catch (error) {
        console.log([fileName, 'getTransactionList', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const getTransactionDetail = async (dataObject) => {
    const { id, user_id } = dataObject;
    
    try {
        const transactionDetail = await db.transaction.findOne({
            include: [
                {
                    model: db.order,
                    as: 'order',
                    required: false,
                    include: [
                        {
                            model: db.item,
                            as: 'item',
                            required: false,
                        }
                    ]
                }, 
                {
                    model: db.review,
                    as: 'review',
                    required: false
                }
            ],
            where: {
                id: id,
                user_id: user_id
            }
        });

        if(_.isEmpty(transactionDetail)) {
            return Promise.reject(Boom.notFound(`Cannot find transaction with id ${id}!`));
        };

        return Promise.resolve({ 
            statusCode: 200,
            message: "Get transaction detail successfully!",
            data: transactionDetail 
        });    
    } catch (error) {
        console.log([fileName, 'getTransactionDetail', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const createTransaction = async (dataObject) => {
    const { 
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
    } = dataObject;

    try {
        await db.sequelize.transaction( async t => {
            const checkCustomer = await db.user.findOne({
                where: {
                    id: user_id
                },
                transaction: t
            });
    
            if (_.isEmpty(checkCustomer)) {
                return Promise.reject(Boom.notFound(`Cannot find user with id ${user_id}!`))
            };
    
            const cart = await db.cart.findAll({
                where: {
                    user_id: user_id
                },
                include: [
                    {
                        model: db.item,
                        as: 'item',
                        attributes: ['name', 'price', 'stock'],
                        required: false
                    }
                ],
                transaction: t
            });
    
            const transaction = await db.transaction.create({
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
                expiryAt,
            }, {
                transaction: t
            });
    
            await Promise.all(cart.map(async (cartItem) => {
                await db.order.create({
                    transaction_id: transaction.id,
                    item_id: cartItem.item_id,
                    item_name: cartItem.item.name,
                    qty: cartItem.qty,
                    price: cartItem.item.price
                }, {
                    transaction: t
                });
    
                await db.item.update({  
                    stock: cartItem.item.stock - cartItem.qty
                }, {
                    where: {
                        id: cartItem.item_id
                    },
                    transaction: t
                })
            }));
    
            const shippingItem = {
                item_id: 0,     
                item: { name: 'Shipping Cost', price: shippingCost },
                qty: 1,
            };
    
            cart.push(shippingItem);
    
            const payload = {
                transaction_details: {
                    order_id: transaction.id,
                    gross_amount: total
                },
                custom_expiry: {
                    order_time: transaction.orderAt,
                    expiry_duration: 24,
                    unit: "hour"
                },
                item_details: cart.map((item) => ({
                    id: item.item_id,
                    price: item.item.price,
                    quantity: item.qty,
                    name: item.item.name
                })),
                customer_details: {
                    first_name: transaction.fullName,
                    email: checkCustomer.email,
                    phone: transaction.phone,
                    shipping_address: {
                        first_name: transaction.fullName,
                        phone: transaction.phone,
                        address: transaction.address,
                        city: transaction.city
                    }
                }
            };
    
            const authString = btoa(process.env.MIDTRANS_KEY_SERVER);
    
            const response = await fetch(`https://app.sandbox.midtrans.com/snap/v1/transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Basic ${authString}`
                },
                body: JSON.stringify(payload),
            }); 
        
            const data = await response.json();
    
            await db.transaction.update({
                snap_token: data.token,
            }, {
                where: {
                    id: transaction.id,
                },
                transaction: t
            });
    
            await db.cart.destroy({
                where: {    
                    user_id: user_id
                },
                transaction: t
            }); 
                
            return Promise.resolve({ 
                statusCode: 201,
                message: "Post transaction successfully!",
            }); 
        });
        
    } catch (error) {
        console.log([fileName, 'postTransaction', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    };
};

const updateStatusFromMidtrans = async (data) => {
    try {
        let transactionStatus = data.transaction_status;

        const findTransaction = await db.transaction.findOne({
            where: {
                id: data.order_id,
            },
            include: [
                {
                    model: db.order,
                    as: 'order',
                    required: false,
                    include: [
                        {
                            model: db.item,
                            as: 'item',
                            required: false,
                        }
                    ]
                },
                {
                    model:  db.user,
                    as: 'customer',
                    required: true
                }
            ]
        });

        if (transactionStatus == 'settlement'){

            const mailOptions = {
                from: 'tokoaku461@gmail.com',
                to: findTransaction.customer.email,
                subject: 'INVOICE tokoaku',
                text: `test`
            };

            await mailer.transporter.sendMail(mailOptions);

            if (findTransaction.service === 'cod') {
                await db.transaction.update({
                    status: 'SUCCESS',
                }, {
                    where: {
                        id: data.order_id,
                    }
                });
            } else {
                await db.transaction.update({
                    status: 'PROCESS',
                }, {
                    where: {
                        id: data.order_id,
                    }
                });
            };

            findTransaction.order.map(async(item) => {
                await db.item.update({
                    sold: item.item.sold + item.qty
                }, {
                    where: {
                        id: item.item_id
                    }
                });
            });

        } else if (transactionStatus == 'deny' || transactionStatus == 'expire'){

            await db.transaction.update({
                status: 'FAIL',
            }, {
                where: {
                    id: data.order_id,
                }
            });

            findTransaction.order.map(async(item) => {
                await db.item.update({
                    stock: item.item.stock + item.qty
                }, {
                    where: {
                        id: item.item_id
                    }
                });
            });

        } else if (transactionStatus == 'pending'){

            await db.transaction.update({
                status: 'PENDING',
            }, {
                where: {
                    id: data.order_id,
                }
            });

        };

        return Promise.resolve({ 
            statusCode: 200,
            message: "Update transaction status successfully!",
        }); 
    } catch (error) {
        console.log([fileName, 'updateStatusFromMidtrans', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

module.exports = {
    getProvince,
    getCity,
    getShippingCost,
    getAllTransactionList,
    getTransactionListByUser,
    getTransactionDetail,
    createTransaction,
    updateStatusFromMidtrans
}