const Request = require('supertest');
const _ = require('lodash');
const QS = require('qs');

const db = require('../../models');
const GeneralHelper = require('../../server/helpers/generalHelper');
const CartPlugin = require('../../server/api/cart');
const MockCartList = require('../fixtures/database/cart/cartList.json');
const MockCartByUser = require('../fixtures/database/cart/cartByUser.json');
const MockCartDetail = require('../fixtures/database/cart/cartDetail.json');

let apiUrl;
let server;
let mockCart;
let getCart;
let postCart;
let updateCart;
let deleteCart;

let bearerTokenAdmin = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJyYWloYW5wdHJvIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzA4MzQ1Njg3LCJleHAiOjE3MDg0MzIwODd9.nYMY2vwsrCx-71ZGtm058HCEmA2HzsYQteyo8vDGHA8';
let bearerTokenCustomer = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ0ZXN0Iiwicm9sZSI6IkN1c3RvbWVyIiwiaWF0IjoxNzA4NDE4MTE4LCJleHAiOjE3MDg1MDQ1MTh9._2Df1nkXwnbugFdhihUWgi4dmEnvMw8nrKmHyk-hOUc';

describe('Item', () => {
    beforeAll(() => {
        server = GeneralHelper.createTestServer('/api/cart', CartPlugin);
    });

    afterAll(async () => {
        await server.close();
    });

    describe('List', () => {
        beforeEach(() => {
            apiUrl = '/api/cart/list';
            mockCart = _.cloneDeep(MockCartList);
            getCart = jest.spyOn(db.cart, 'findAll');
        });

        test('Should Return 200: Get Cart List', async () => {
            getCart.mockResolvedValue(mockCart);

            const response = await Request(server)
                .get(apiUrl)
                .set('Authorization', bearerTokenCustomer)
                .expect(200)

            expect(!_.isEmpty(response.body)).toBeTruthy(); 
        });

        test('Should Return 404: Get Cart List Success but Empty', async () => {
            getCart.mockResolvedValue([]);
            
            const response = await Request(server)
                .get(apiUrl)
                .set('Authorization', bearerTokenCustomer)
                .expect(404)

            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });

        test('Should Return 401: Unauthorized', async () => {
            getCart.mockResolvedValue(mockCart);

            const response = await Request(server)  
                .get(apiUrl)
                .expect(401)

            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });
    });

    describe('List By User', () => {
        beforeEach(() => {
            apiUrl = '/api/cart/user-list';
            mockCart = _.cloneDeep(MockCartByUser);
            getCart = jest.spyOn(db.cart, 'findAll');
        });

        test('Should Return 200: Get Cart List', async () => {
            getCart.mockResolvedValue(mockCart);

            const response = await Request(server)
                .get(apiUrl)
                .set('Authorization', bearerTokenCustomer)
                .expect(200)

            expect(!_.isEmpty(response.body)).toBeTruthy(); 
        });

        test('Should Return 404: Get Item Detail Not Found', async ()  => {
            getCart.mockResolvedValue([]);

            const response = await Request(server)
                .get(apiUrl)
                .set('Authorization', bearerTokenCustomer)
                .expect(404)
            
                expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });

        test('Should Return 401: Unauthorized', async () => {
            getCart.mockResolvedValue(mockCart);

            const response = await Request(server)  
                .get(apiUrl)
                .expect(401)

            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });
    });

    describe('Cart Detail', () => {
        beforeEach(() => {
            apiUrl = '/api/cart/detail/1';
            mockCart = _.cloneDeep(MockCartDetail);
            getCart = jest.spyOn(db.cart, 'findOne');
        });

        test('Should Return 200: Get Cart Detail', async () => {
            getCart.mockResolvedValue(mockCart);

            const response = await Request(server)  
                .get(apiUrl)
                .set('Authorization', bearerTokenAdmin)
                .expect(200)

            expect(!_.isEmpty(response.body)).toBeTruthy(); 
        });

        test('Should Return 404: Get Cart Detail Not Found', async ()  => {
            getCart.mockResolvedValue([]);

            const response = await Request(server)
                .get(apiUrl)
                .set('Authorization', bearerTokenAdmin)
                .expect(404)
            
                expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });

        test('Should Return 401: Unauthorized', async () => {
            getCart.mockResolvedValue(mockCart);

            const response = await Request(server)  
                .get(apiUrl)
                .expect(401)

            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });
    });

    // describe('Add Item', () => {
    //     beforeEach(() => {
    //         apiUrl = '/api/item/add';
    //         mockItem = _.cloneDeep(MockitemDetail);
    //         postItem = jest.spyOn(db.item, 'create');
    //     });

    //     test('Should Return 200: Success Add Item', async () => {
    //         postItem.mockResolvedValue("Success");

    //         const response = await Request(server)
    //             .post(apiUrl)
    //             .set('Authorization', bearerTokenAdmin)
    //             .field('kategori_id', '1')
    //             .field('name', 'Indomie Goreng')
    //             .field('desc', 'Indomie Goreng sangat lezat')
    //             .field('price', '3000')
    //             .field('discount', '0')
    //             .field('stock', '10')
    //             .attach('img', './public/indomie-goreng.png')
    //             .expect(200)

    //         expect(!_.isEmpty(response.body.data)).toBeTruthy(); 
    //     });

    //     test('Should Return 400: Send Empty Payload', async () => {
    //         postItem.mockResolvedValue("Failed");

    //         const response = await Request(server)  
    //             .post(apiUrl)
    //             .set('Authorization', bearerTokenAdmin)
    //             .expect(400)
            
    //         expect(_.isEmpty(response.body.data)).toBeTruthy(); 
    //     });

    //     test('Should Return 401: Not Admin', async () => {
    //         postItem.mockResolvedValue("Failed");

    //         const response = await Request(server)  
    //             .post(apiUrl)
    //             .set('Authorization', bearerTokenCustomer)
    //             .field('kategori_id', '1')
    //             .field('name', 'Indomie Goreng')
    //             .field('desc', 'Indomie Goreng sangat lezat')
    //             .field('price', '3000')
    //             .field('stock', '10')
    //             .attach('img', './public/indomie-goreng.png')
    //             .expect(401)

    //         expect(_.isEmpty(response.body.data)).toBeTruthy(); 
    //     });

    //     test('Should Return 401: Unauthorized', async () => {
    //         postItem.mockResolvedValue("Failed");

    //         const response = await Request(server)  
    //             .post(apiUrl)
    //             .expect(401)

    //         expect(_.isEmpty(response.body.data)).toBeTruthy(); 
    //     });
    // });

    // describe('Update Item', () => {
    //     beforeEach(() => {
    //         apiUrl = '/api/item/update/1';
    //         mockItem = _.cloneDeep(MockitemDetail);
    //         updateItem = jest.spyOn(db.item, 'update');
    //     });

    //     test('Should Return 200: Update Item Successfully', async () => {
    //         updateItem.mockResolvedValue("Success");

    //         const response = await Request(server)
    //             .patch(apiUrl)
    //             .set('Authorization', bearerTokenAdmin)
    //             .field('kategori_id', '1')
    //             .field('name', 'Indomie Goreng')
    //             .field('desc', 'Indomie Goreng sangat lezat')
    //             .field('price', '3000')
    //             .field('stock', '10')
    //             .attach('img', './public/indomie-goreng.png')
    //             .expect(200)

    //         expect(!_.isEmpty(response.body.data)).toBeTruthy(); 
    //     });

    //     test('Should Return 404: Item Not Found', async () => {
    //         postItem.mockResolvedValue("Failed");

    //         const response = await Request(server)
    //             .patch('/api/item/update/10000')
    //             .set('Authorization', bearerTokenAdmin)
    //             .field('kategori_id', '1')
    //             .field('name', 'Indomie Goreng')
    //             .field('desc', 'Indomie Goreng sangat lezat')
    //             .field('price', '3000')
    //             .field('stock', '10')
    //             .attach('img', './public/indomie-goreng.png')
    //             .expect(404)
            
    //         expect(_.isEmpty(response.body.data)).toBeTruthy(); 
    //     });

    //     test('Should Return 401: Not Admin', async () => {
    //         postItem.mockResolvedValue("Failed");

    //         const response = await Request(server)  
    //             .patch(apiUrl)
    //             .set('Authorization', bearerTokenCustomer)
    //             .field('kategori_id', '1')
    //             .field('name', 'Indomie Goreng')
    //             .field('desc', 'Indomie Goreng sangat lezat')
    //             .field('price', '3000')
    //             .field('stock', '10')
    //             .attach('img', './public/indomie-goreng.png')
    //             .expect(401)

    //         expect(_.isEmpty(response.body.data)).toBeTruthy(); 
    //     });

    //     test('Should Return 401: Unauthorized', async () => {
    //         postItem.mockResolvedValue("Failed");

    //         const response = await Request(server)  
    //             .patch(apiUrl)
    //             .field('kategori_id', '1')
    //             .field('name', 'Indomie Goreng')
    //             .field('desc', 'Indomie Goreng sangat lezat')
    //             .field('price', '3000')
    //             .field('stock', '10')
    //             .attach('img', './public/indomie-goreng.png')
    //             .expect(401)

    //         expect(_.isEmpty(response.body.data)).toBeTruthy(); 
    //     });
    // });

    // describe('Delete Item', () => {
    //     beforeEach(() => {
    //         apiUrl = '/api/item/remove/1';
    //         deleteItem = jest.spyOn(db.item, 'destroy');
    //     });

    //     test('Should Return 200: Delete Item Successfully', async () => {
    //         deleteItem.mockResolvedValue("Success");

    //         const response = await Request(server)
    //             .delete(apiUrl)
    //             .set('Authorization', bearerTokenAdmin)
    //             .expect(200)

    //         expect(!_.isEmpty(response.body)).toBeTruthy(); 
    //     });

    //     test('Should Return 404: Item Not Found', async () => {
    //         deleteItem.mockResolvedValue("Failed");

    //         const response = await Request(server)
    //             .delete('/api/item/remove/10000')
    //             .set('Authorization', bearerTokenAdmin)
    //             .expect(404)
            
    //         expect(_.isEmpty(response.body.data)).toBeTruthy(); 
    //     });

    //     test('Should Return 401: Not Admin', async () => {
    //         deleteItem.mockResolvedValue("Failed");

    //         const response = await Request(server)  
    //             .delete(apiUrl)
    //             .set('Authorization', bearerTokenCustomer)
    //             .expect(401)

    //         expect(_.isEmpty(response.body.data)).toBeTruthy(); 
    //     });

    //     test('Should Return 401: Unauthorized', async () => {
    //         deleteItem.mockResolvedValue("Failed");

    //         const response = await Request(server)  
    //             .delete(apiUrl)
    //             .expect(401)

    //         expect(_.isEmpty(response.body.data)).toBeTruthy(); 
    //     });
    // });
})
