const Request = require('supertest');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const db = require('../../models');
const GeneralHelper = require('../../server/helpers/generalHelper');
const ItemPlugin = require('../../server/api/item');
const MockItemsWithAssocList = require('../fixtures/database/itemsWithAssoc.json');

let apiUrl;
let server;
let query;
let mockItemsWithAssocList;
let getItemList;

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
            query = {
                offset: 0,
                limit: 20
            };
            mockItemsWithAssocList = _.cloneDeep(MockItemsWithAssocList);
            getItemList = jest.spyOn(db.item, 'findAll');
        });

        test('Should Return 200: Get Item List', async () => {
            getItemList.mockResolvedValue(mockItemsWithAssocList);

            const response = await Request(server)
                .get(apiUrl)
                .expect(200);

            console.log('Response Body:', response.body); // Log the response body
            console.log('Response length:', response.body.result.length); // Log the response body

            expect(!_.isEmpty(response.body)).toBeTruthy(); // Check if response body is empty
            expect(response.body.result.length).toBeGreaterThan(0); // Check the 
        });
    })
})