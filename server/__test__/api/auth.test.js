const Request = require('supertest');
const _ = require('lodash');
const QS = require('qs');

const db = require('../../models');
const GeneralHelper = require('../../server/helpers/generalHelper');
const AuthPlugin = require('../../server/api/auth');

let apiUrl;
let server;
let registerUser;
let loginUser;

describe('Auth', () => {
    beforeAll(() => {
        server = GeneralHelper.createTestServer('/api/auth', AuthPlugin);
    });

    afterAll(async () => {
        await server.close();
        jest.clearAllMocks();
    });

    describe('Register', () => {
        beforeEach(() => {
            apiUrl = '/api/auth/register',
            registerUser = jest.spyOn(db.user, 'create')
        });

        afterAll(async () => {
            await server.close();
            jest.clearAllMocks();
        });

        test('Should Return 200: User Register Successfylly', async () => {
            const response = await Request(server)
                .post(apiUrl)
                .send({
                    email: 'test@gmail.com',
                    username: 'test',
                    password: 'test040601.',
                    confirmPassword: 'test040601.',
                    role: 'Admin'
                });

            expect(!_.isEmpty(response.body)).toBeTruthy(); 
        });

        test('Should Return 400: Email has been registered', async () => {
            const response = await Request(server)
                .post(apiUrl)
                .send({
                    email: 'raihanworks461@gmail.com',
                    username: 'test',
                    password: 'test040601.',
                    confirmPassword: 'test040601.',
                    role: 'Admin'
                })
                .expect(400);

            expect(!_.isEmpty(response.body)).toBeTruthy(); 
        });
    });

    describe('Login', () => {
        beforeEach(() => {
            apiUrl = '/api/auth/login',
            loginUser = jest.spyOn(db.user, 'findOne')
        });

        afterAll(async () => {
            await server.close();
            jest.clearAllMocks();
        });

        test('Should Return 200: Login Successfylly', async () => {
            const response = await Request(server)
                .post(apiUrl)
                .send({
                    email: 'raihanworks461@gmail.com',
                    password: 'RaihanPutro040601.'
                })
                .expect(200)

            expect(!_.isEmpty(response.body.token)).toBeTruthy(); 
        });

        test('Should Return 400: Wrong Password', async () => {
            const response = await Request(server)
                .post(apiUrl)
                .send({
                    email: 'raihanworks461@gmail.com',
                    password: 'RaihanPutro040601',
                })
                .expect(400)
            
            expect(response.body.message === "Wrong password!").toBeTruthy(); 
        });

        test('Should Return 400: Email not registered', async () => {
            const response = await Request(server)
                .post(apiUrl)
                .send({
                    email: 'raihanorks461@gmail.com',
                    password: 'RaihanPutro040601',
                })
                .expect(400)

            expect(response.body.message === "Email not registered!").toBeTruthy(); 
        });
    });
});