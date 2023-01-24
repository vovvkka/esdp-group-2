const mongoose = require('mongoose');
const request = require('supertest');
const app  = require("../index");

describe('Testing \'users\' route', () => {
    let admin;

    describe('POST /users/sessions', () => {
        it('user should successfully login', async () => {
            const res = await request(app)
                .post('/users/sessions')
                .send({
                    username: 'admin',
                    password: 'admin0',
                });
            expect(res.statusCode).toBe(200);
            admin = res.body;
        });
    });

    describe('POST /users', () => {
        it('creation cashiers', async () => {
            const res = await request(app)
                .post('/users')
                .send({
                    username: 'casie2sdsrs2',
                    password: 'cashirsdf2s222',
                    displayName: 'c2assdfrs2000',
                    pin: '1434',
                    role: 'cashier',
                    email: 'e2i2222sdf23l@gmail.com',
                })
                .set({Authorization: admin.user.token });
            expect(res.statusCode).toBe(200);
        });
    });
});

afterAll(() => mongoose.disconnect());