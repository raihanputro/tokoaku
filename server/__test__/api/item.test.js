const Request = require('supertest');
const _ = require('lodash');
const QS = require('qs');

const db = require('../../models');
const GeneralHelper = require('../../server/helpers/generalHelper');
const ItemPlugin = require('../../server/api/item');
const MockItemsWithAssocList = require('../fixtures/database/itemsWithAssoc.json');
const MockitemDetail = require('../fixtures/database/itemDetail.json');

let apiUrl;
let server;
let mockItem;
let getItem;
let postItem;

let bearerTokenAdmin = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyYWloYW53b3JrczQ2MUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCQ2WVdPY1plaVRSYmZxLmFqWXRpZE9PRGxXZHpFL1RZNVpNRkNTWDVZTEFQVjMwc0VVMlNOVyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNzgzMTcxNSwiZXhwIjoxNzA3OTE4MTE1fQ.WOHq95WteXIxiREU5QpfQv5lf8RpdC7V6nk9mTJflEM';
let bearerTokenCustomer = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJmYXJyYXNAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkOUo1eEp6dEgxY3NvNng2VC9MSDAvZWN4Yk9GR09qTXJpMjVxbXBLLmZjY1FnRlZpVWhXbXUiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3MDc4MzE4MDgsImV4cCI6MTcwODE5MTgwOH0._bTQGO_191ok8xJ3a5heHEYQA2NmRmX0VX1ugaLODfE';

describe('Item', () => {
    beforeAll(() => {
        server = GeneralHelper.createTestServer('/item', ItemPlugin);
    });

    afterAll(async () => {
        await server.close();
    });

    describe('List', () => {
        beforeEach(() => {
            apiUrl = '/item/list';
            mockItem = _.cloneDeep(MockItemsWithAssocList);
            getItem = jest.spyOn(db.item, 'findAll');
        });

        test('Should Return 200: Get Item List', async () => {
            getItem.mockResolvedValue(mockItem);

            const response = await Request(server)
                .get(apiUrl)
                .expect(200)
            
            expect(!_.isEmpty(response.body)).toBeTruthy(); 
            expect(response.body.result.length).toBeGreaterThan(0); 
        });

        test('Should Return 404: Get Item List Success but Empty', async () => {
            getItem.mockResolvedValue([]);
            
            const response = await Request(server)
                .get(apiUrl)
                .expect(404)

            expect(_.isEmpty(response.body.result)).toBeTruthy(); 
        });
    });

    describe('List By Author', () => {
        beforeEach(() => {
            apiUrl = '/item/author/1';
            mockItem = _.cloneDeep(MockItemsWithAssocList);
            getItem = jest.spyOn(db.item, 'findAll');
        });

        test('Should Return 200: Get Item List By Author', async () => {
            getItem.mockResolvedValue(mockItem);

            const response = await Request(server)  
                .get(apiUrl)
                .set('Authorization', bearerTokenAdmin)

            expect(!_.isEmpty(response.body)).toBeTruthy(); 
            expect(response.body.result.length).toBeGreaterThan(0);
        });

        test('Should Return 404: Get Item List By Author Not Found', async () => {
            getItem.mockResolvedValue([]);

            const response = await Request(server)
                .get(apiUrl)
                .set('Authorization', bearerTokenAdmin)
                .expect(404)

                expect(_.isEmpty(response.body.result)).toBeTruthy(); 
        });

        test('Should Return 401: Unauthorized', async () => {
            getItem.mockResolvedValue(mockItem);

            const response = await Request(server)  
                .get(apiUrl)
                .expect(401)

            expect(_.isEmpty(response.body.result)).toBeTruthy(); 
        });
    });

    describe('Item Detail', () => {
        beforeEach(() => {
            apiUrl = '/item/detail/1';
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
            expect(response.body.result.length).toBeGreaterThan(0);
        });

        test('Should Return 404: Get Item Detail Not Found', async ()  => {
            getItem.mockResolvedValue([]);

            const response = await Request(server)
                .get(apiUrl)
                .set('Authorization', bearerTokenAdmin)
                .expect(404)
            
                expect(_.isEmpty(response.body.result)).toBeTruthy(); 
        });

        test('Should Return 401: Unauthorized', async () => {
            getItem.mockResolvedValue(mockItem);

            const response = await Request(server)  
                .get(apiUrl)
                .expect(401)

            expect(_.isEmpty(response.body.result)).toBeTruthy(); 
        });
    });

    describe('Add Item', () => {
        beforeEach(() => {
            apiUrl = '/item/add';
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
                .field('stock', '10')
                .attach('img', './public/indomie-goreng.png')
                .expect(200)

            console.log('response:', response.body)

            expect(!_.isEmpty(response.body)).toBeTruthy(); 
        });
    });
})