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
})
