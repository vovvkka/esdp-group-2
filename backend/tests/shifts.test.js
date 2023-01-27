const mongoose = require('mongoose');
const request = require('supertest');
const app  = require("../index");

describe('Testing \'shifts\' route', () => {
    let cashier;
    let shifts;

    describe('POST /users/sessions', () => {
        it('user should successfully login', async () => {
            const res = await request(app)
                .post('/users/sessions')
                .send({
                    username: 'cashier 1',
                    password: 'cashier1',
                });
            expect(res.statusCode).toBe(200);
            cashier = res.body;
        });
    });

    describe('POST /shifts', () => {
        it('Shift opening test', async () => {
            const res = await request(app)
                .post('/shifts')
                .send({
                    pin: '1111'
                })
                .set({Authorization: cashier.user.token});
            expect(res.statusCode).toBe(200);
            shifts = res.body;
        });
    });

    describe('POST /shifts/:id', () => {
        it('Shift closing test', async () => {
            const res = await request(app)
                .put(`/shifts/${shifts._id}`)
                .set({Authorization: cashier.user.token});
            expect(res.statusCode).toBe(200);
        });
    });
});

afterAll(() => mongoose.disconnect());