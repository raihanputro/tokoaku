const Request = require('supertest');
const _ = require('lodash');
const QS = require('qs');

const db = require('../../models');
const GeneralHelper = require('../../server/helpers/generalHelper');
const CategoryPlugin = require('../../server/api/category');
const MockCategoryList = require('../fixtures/database/category/categoryList.json');
const MockCategoryDetail = require('../fixtures/database/category/categoryDetail.json');

let apiUrl;
let server;
let mockCategory;
let getCategory;
let postCategory;
let updateCategory;
let deleteCategory;

let bearerTokenAdmin = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJyYWloYW5wdHJvIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzA4MzQ1Njg3LCJleHAiOjE3MDg0MzIwODd9.nYMY2vwsrCx-71ZGtm058HCEmA2HzsYQteyo8vDGHA8';
let bearerTokenCustomer = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ0ZXN0Iiwicm9sZSI6IkN1c3RvbWVyIiwiaWF0IjoxNzA4NDE4MTE4LCJleHAiOjE3MDg1MDQ1MTh9._2Df1nkXwnbugFdhihUWgi4dmEnvMw8nrKmHyk-hOUc';


describe('Category', () => {
    beforeAll(() => {
        server = GeneralHelper.createTestServer('/api/category', CategoryPlugin);
    });

    afterAll(async () => {
        await server.close();
    });

    describe('List', () => {
        beforeEach(() => {
            apiUrl = '/api/category/list';
            mockCategory = _.cloneDeep(MockCategoryList);
            getCategory = jest.spyOn(db.category, 'findAll');
        });

        test('Should Return 200: Get Category List', async () => {
            getCategory.mockResolvedValue(mockCategory);

            const response = await Request(server)
                .get(apiUrl)
                .expect(200)

            expect(!_.isEmpty(response.body)).toBeTruthy(); 
            expect(response.body.data.length).toBeGreaterThan(0); 
        });

        test('Should Return 404: Get Item List Success but Empty', async () => {
            getCategory.mockResolvedValue([]);
            
            const response = await Request(server)
                .get(apiUrl)
                .expect(404)

            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });
    });

    describe('Category Detail', () => {
        beforeEach(() => {
            apiUrl = '/api/category/detail/1';
            mockCategory = _.cloneDeep(MockCategoryDetail);
            getCategory = jest.spyOn(db.item, 'findOne');
        });

        test('Should Return 200: Get Category Detail Successfully', async () => {
            getCategory.mockResolvedValue(mockCategory);

            const response = await Request(server)  
                .get(apiUrl)
                .set('Authorization', bearerTokenAdmin)
                .expect(200)

            expect(!_.isEmpty(response.body)).toBeTruthy(); 
        });

        test('Should Return 404: Get Category Detail Not Found', async ()  => {
            getCategory.mockResolvedValue([]);

            const response = await Request(server)
                .get('/api/category/detail/10000')
                .set('Authorization', bearerTokenAdmin)
                .expect(404)
            
                expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });

        test('Should Return 401: Not Admin', async () => {
            getCategory.mockResolvedValue(mockCategory);

            const response = await Request(server)  
                .get(apiUrl)
                .set('Authorization', bearerTokenCustomer)
                .expect(401)

            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });

        test('Should Return 401: Unauthorized', async () => {
            getCategory.mockResolvedValue(mockCategory);

            const response = await Request(server)  
                .get(apiUrl)
                .expect(401)

            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });
    });

    describe('Add Category', () => {
        beforeEach(() => {
            apiUrl = '/api/category/add';
            postCategory = jest.spyOn(db.category, 'create');
        });

        test('Should Return 200: Success Add Category', async () => {
            postCategory.mockResolvedValue("Success");

            const response = await Request(server)
                .post(apiUrl)
                .set('Authorization', bearerTokenAdmin)
                .field('name', 'Atk')
                .attach('icon', './public/code.png')
                .expect(200)

            expect(response.body.message === 'Create category successfully!').toBeTruthy(); 
        });

        test('Should Return 400: Send Empty Payload', async () => {
            postCategory.mockResolvedValue("Failed");

            const response = await Request(server)  
                .post(apiUrl)
                .set('Authorization', bearerTokenAdmin)
                .expect(400)
            
            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });

        test('Should Return 401: Not Admin', async () => {
            postCategory.mockResolvedValue("Failed");

            const response = await Request(server)  
                .post(apiUrl)
                .set('Authorization', bearerTokenCustomer)
                .field('name', 'Atk')
                .attach('icon', './public/code.png')
                .expect(401)

            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });

        test('Should Return 401: Unauthorized', async () => {
            postCategory.mockResolvedValue("Failed");

            const response = await Request(server)  
                .post(apiUrl)
                .expect(401)

            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });
    });

    describe('Update Item', () => {
        beforeEach(() => {
            apiUrl = '/api/category/update/1';
            mockCategory = _.cloneDeep(MockCategoryDetail);
            updateCategory = jest.spyOn(db.category, 'update');
        });

        test('Should Return 200: Update Category Successfully', async () => {
            updateCategory.mockResolvedValue("Success");

            const response = await Request(server)
                .patch(apiUrl)
                .set('Authorization', bearerTokenAdmin)
                .field('name', 'Alat Tulis')
                .attach('icon', './public/code.png')
                .expect(200)

            expect(!_.isEmpty(response.body.data)).toBeTruthy(); 
        });

        test('Should Return 404: Category Not Found', async () => {
            updateCategory.mockResolvedValue("Failed");

            const response = await Request(server)
                .patch('/api/category/update/10000')
                .set('Authorization', bearerTokenAdmin)
                .field('name', 'Alat Tulis')
                .attach('icon', './public/code.png')
                .expect(404)
            
            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });

        test('Should Return 401: Not Admin', async () => {
            updateCategory.mockResolvedValue("Failed");

            const response = await Request(server)  
                .patch(apiUrl)
                .set('Authorization', bearerTokenCustomer)
                .field('name', 'Alat Tulis')
                .attach('icon', './public/code.png')
                .expect(401)

            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });

        test('Should Return 401: Unauthorized', async () => {
            updateCategory.mockResolvedValue("Failed");

            const response = await Request(server)  
                .patch(apiUrl)
                .field('name', 'Alat Tulis')
                .attach('icon', './public/code.png')
                .expect(401)

            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });
    });

    describe('Delete Category', () => {
        beforeEach(() => {
            apiUrl = '/api/category/remove/1';
            deleteCategory = jest.spyOn(db.category, 'destroy');
        });

        test('Should Return 200: Delete Item Successfully', async () => {
            deleteCategory.mockResolvedValue("Success");

            const response = await Request(server)
                .delete(apiUrl)
                .set('Authorization', bearerTokenAdmin)
                .expect(200)

            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });

        test('Should Return 404: Category Not Found', async () => {
            deleteCategory.mockResolvedValue("Failed");

            const response = await Request(server)
                .delete('/api/category/remove/10000')
                .set('Authorization', bearerTokenAdmin)
                .expect(404)
            
            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });

        test('Should Return 401: Not Admin', async () => {
            deleteCategory.mockResolvedValue("Failed");

            const response = await Request(server)  
                .delete(apiUrl)
                .set('Authorization', bearerTokenCustomer)
                .expect(401)

            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });

        test('Should Return 401: Unauthorized', async () => {
            deleteCategory.mockResolvedValue("Failed");

            const response = await Request(server)  
                .delete(apiUrl)
                .expect(401)

            expect(_.isEmpty(response.body.data)).toBeTruthy(); 
        });
    });
})