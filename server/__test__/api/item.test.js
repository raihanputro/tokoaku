const Request = require('supertest');
const _ = require('lodash');
const QS = require('qs');

const db = require('../../models');
const GeneralHelper = require('../../server/helpers/generalHelper');
const ItemPlugin = require('../../server/api/item');
const MockItemList = require('../fixtures/database/item/itemList.json');
const MockitemDetail = require('../fixtures/database/item/itemDetail.json');

let apiUrl;
let server;
let mockItem;
let getItem;
let postItem;
let updateItem;
let deleteItem;

let bearerTokenAdmin = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJyYWloYW5wdHJvIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzA4MzQ1Njg3LCJleHAiOjE3MDg0MzIwODd9.nYMY2vwsrCx-71ZGtm058HCEmA2HzsYQteyo8vDGHA8';
let bearerTokenCustomer = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlcm5hbWUiOiJ0ZXN0Iiwicm9sZSI6IkN1c3RvbWVyIiwiaWF0IjoxNzA4Mzk1MjY5LCJleHAiOjE3MDg0ODE2Njl9.0IZAMtg6AC1az_dYCyqMbsSf06IIBur5PjRT4FOEqtA';

describe('Item', () => {
    beforeAll(() => {
        server = GeneralHelper.createTestServer('/api/item', ItemPlugin);
    });

    afterAll(async () => {
        await server.close();
    });

    describe('List', () => {
        beforeEach(() => {
            apiUrl = '/api/item/list';
            mockItem = _.cloneDeep(MockItemList);
            getItem = jest.spyOn(db.item, 'findAll');
        });

        test('Should Return 200: Get Item List', async () => {
            getItem.mockResolvedValue(mockItem);

            const response = await Request(server)
                .get(apiUrl)
                .expect(200)

            expect(!_.isEmpty(response.body)).toBeTruthy(); 
            expect(response.body.data.length).toBeGreaterThan(0); 
        });

        test('Should Return 404: Get Item List Success but Empty', async () => {
            getItem.mockResolvedValue([]);
            
            const response = await Request(server)
                .get(apiUrl)
                .expect(404)

            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });
    });

    describe('List By Author', () => {
        beforeEach(() => {
            apiUrl = '/api/item/author/1';
            mockItem = _.cloneDeep(MockItemList);
            getItem = jest.spyOn(db.item, 'findAll');
        });

        test('Should Return 200: Get Item List By Author', async () => {
            getItem.mockResolvedValue(mockItem);

            const response = await Request(server)  
                .get(apiUrl)
                .set('Authorization', bearerTokenAdmin)
                .expect(200)

            expect(!_.isEmpty(response.body)).toBeTruthy(); 
            expect(response.body.data.length).toBeGreaterThan(0);
        });

        test('Should Return 404: Get Item List By Author Not Found', async () => {
            getItem.mockResolvedValue([]);

            const response = await Request(server)
                .get(apiUrl)
                .set('Authorization', bearerTokenAdmin)
                .expect(404)
            
                expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });

        test('Should Return 401: Unauthorized', async () => {
            getItem.mockResolvedValue(mockItem);

            const response = await Request(server)  
                .get(apiUrl)
                .expect(401)

            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });
    });

    describe('Item Detail', () => {
        beforeEach(() => {
            apiUrl = '/api/item/detail/1';
            mockItem = _.cloneDeep(MockitemDetail);
            getItem = jest.spyOn(db.item, 'findOne');
        });

        test('Should Return 200: Get Item Detail', async () => {
            getItem.mockResolvedValue(mockItem);

            const response = await Request(server)  
                .get(apiUrl)
                .set('Authorization', bearerTokenAdmin)
                .expect(200)

            expect(!_.isEmpty(response.body)).toBeTruthy(); 
            expect(response.body.data.length).toBeGreaterThan(0);
        });

        test('Should Return 404: Get Item Detail Not Found', async ()  => {
            getItem.mockResolvedValue([]);

            const response = await Request(server)
                .get(apiUrl)
                .set('Authorization', bearerTokenAdmin)
                .expect(404)
            
                expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });

        test('Should Return 401: Unauthorized', async () => {
            getItem.mockResolvedValue(mockItem);

            const response = await Request(server)  
                .get(apiUrl)
                .expect(401)

            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });
    });

    describe('Add Item', () => {
        beforeEach(() => {
            apiUrl = '/api/item/add';
            mockItem = _.cloneDeep(MockitemDetail);
            postItem = jest.spyOn(db.item, 'create');
        });

        test('Should Return 200: Success Add Item', async () => {
            postItem.mockResolvedValue("Success");

            const response = await Request(server)
                .post(apiUrl)
                .set('Authorization', bearerTokenAdmin)
                .field('kategori_id', '1')
                .field('name', 'Indomie Goreng')
                .field('desc', 'Indomie Goreng sangat lezat')
                .field('price', '3000')
                .field('discount', '0')
                .field('stock', '10')
                .attach('img', './public/indomie-goreng.png')
                .expect(200)

            expect(!_.isEmpty(response.body.data)).toBeTruthy(); 
        });

        test('Should Return 400: Send Empty Payload', async () => {
            postItem.mockResolvedValue("Failed");

            const response = await Request(server)  
                .post(apiUrl)
                .set('Authorization', bearerTokenAdmin)
                .expect(400)
            
            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });

        test('Should Return 401: Not Admin', async () => {
            postItem.mockResolvedValue("Failed");

            const response = await Request(server)  
                .post(apiUrl)
                .set('Authorization', bearerTokenCustomer)
                .field('kategori_id', '1')
                .field('name', 'Indomie Goreng')
                .field('desc', 'Indomie Goreng sangat lezat')
                .field('price', '3000')
                .field('stock', '10')
                .attach('img', './public/indomie-goreng.png')
                .expect(401)

            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });

        test('Should Return 401: Unauthorized', async () => {
            postItem.mockResolvedValue("Failed");

            const response = await Request(server)  
                .post(apiUrl)
                .expect(401)

            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });
    });

    describe('Update Item', () => {
        beforeEach(() => {
            apiUrl = '/api/item/update/1';
            mockItem = _.cloneDeep(MockitemDetail);
            updateItem = jest.spyOn(db.item, 'update');
        });

        test('Should Return 200: Update Item Successfully', async () => {
            updateItem.mockResolvedValue("Success");

            const response = await Request(server)
                .patch(apiUrl)
                .set('Authorization', bearerTokenAdmin)
                .field('kategori_id', '1')
                .field('name', 'Indomie Goreng')
                .field('desc', 'Indomie Goreng sangat lezat')
                .field('price', '3000')
                .field('stock', '10')
                .attach('img', './public/indomie-goreng.png')
                .expect(200)

            expect(!_.isEmpty(response.body.data)).toBeTruthy(); 
        });

        test('Should Return 404: Item Not Found', async () => {
            postItem.mockResolvedValue("Failed");

            const response = await Request(server)
                .patch('/api/item/update/10000')
                .set('Authorization', bearerTokenAdmin)
                .field('kategori_id', '1')
                .field('name', 'Indomie Goreng')
                .field('desc', 'Indomie Goreng sangat lezat')
                .field('price', '3000')
                .field('stock', '10')
                .attach('img', './public/indomie-goreng.png')
                .expect(404)
            
            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });

        test('Should Return 401: Not Admin', async () => {
            postItem.mockResolvedValue("Failed");

            const response = await Request(server)  
                .patch(apiUrl)
                .set('Authorization', bearerTokenCustomer)
                .field('kategori_id', '1')
                .field('name', 'Indomie Goreng')
                .field('desc', 'Indomie Goreng sangat lezat')
                .field('price', '3000')
                .field('stock', '10')
                .attach('img', './public/indomie-goreng.png')
                .expect(401)

            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });

        test('Should Return 401: Unauthorized', async () => {
            postItem.mockResolvedValue("Failed");

            const response = await Request(server)  
                .patch(apiUrl)
                .field('kategori_id', '1')
                .field('name', 'Indomie Goreng')
                .field('desc', 'Indomie Goreng sangat lezat')
                .field('price', '3000')
                .field('stock', '10')
                .attach('img', './public/indomie-goreng.png')
                .expect(401)

            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });
    });

    describe('Delete Item', () => {
        beforeEach(() => {
            apiUrl = '/api/item/remove/1';
            deleteItem = jest.spyOn(db.item, 'destroy');
        });

        test('Should Return 200: Delete Item Successfully', async () => {
            deleteItem.mockResolvedValue("Success");

            const response = await Request(server)
                .delete(apiUrl)
                .set('Authorization', bearerTokenAdmin)
                .expect(200)

            expect(!_.isEmpty(response.body)).toBeTruthy(); 
        });

        test('Should Return 404: Item Not Found', async () => {
            deleteItem.mockResolvedValue("Failed");

            const response = await Request(server)
                .delete('/api/item/remove/10000')
                .set('Authorization', bearerTokenAdmin)
                .expect(404)
            
            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });

        test('Should Return 401: Not Admin', async () => {
            deleteItem.mockResolvedValue("Failed");

            const response = await Request(server)  
                .delete(apiUrl)
                .set('Authorization', bearerTokenCustomer)
                .expect(401)

            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });

        test('Should Return 401: Unauthorized', async () => {
            deleteItem.mockResolvedValue("Failed");

            const response = await Request(server)  
                .delete(apiUrl)
                .expect(401)

            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });
    });
})