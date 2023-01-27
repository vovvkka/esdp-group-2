const mongoose = require('mongoose');
const request = require('supertest');
const app  = require("../index");

describe('Testing \'admin\' route', () => {
    let admin;

    describe('POST /users/sessions', () => {
        it('user should successfully login', async () => {
            const res = await request(app)
                .post('/users/sessions')
                .send({
                    username: 'admin',
                    password: 'admin',
                });
            expect(res.statusCode).toBe(200);
            admin = res.body;
        });
    });

    describe('PUT /admin/password', () => {
        it('Reset password for admin', async () => {
            const res = await request(app)
                .put('/admin/password')
                .send({
                    oldPassword: 'admin',
                    newPassword: 'admin0',
                    newPasswordRepeat: 'admin0',
                })
                .set({Authorization: admin.user.token });
            expect(res.statusCode).toBe(200);
        });
    });

    describe('PUT /admin', () => {
        it('', async () => {
            const res = await request(app)
                .put('/admin')
                .send({
                    displayName: 'admin0',
                    email: 'admin2002@gmail.com',
                    username: 'Заказчик'
                })
                .set({Authorization: admin.user.token });
            expect(res.statusCode).toBe(200);
        });
    });
});

afterAll(() => mongoose.disconnect());