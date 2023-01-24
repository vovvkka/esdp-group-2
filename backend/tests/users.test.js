const mongoose = require('mongoose');
const request = require('supertest');
const app  = require("../index");
const {nanoid} = require("nanoid");

describe('Testing \'users\' route', () => {
    let admin;
    let cashier;
    const newAdmin = {
        username: 'admin',
        displayName: 'Заказчик Тай-Тай',
        password: 'admin0',
        email: 'v.golem228@gmail.com',
        pin: 1234,
        token: nanoid(),
        role: 'admin',
    };
    const newCashier = {
        username: 'cashier 2',
        displayName: 'Сычев Виталий',
        password: 'cashier2',
        email: 'vitalya@gmail.com',
        pin: 2222,
        token: nanoid(),
        role: 'cashier',
    };
    describe('test of user login', () => {
        it('user should successfully login', async () => {
            const res = await request(app)
                .post('/users')
                .send(newAdmin);
            expect(res.statusCode).toBe(401);
            admin = res.body;
        });
    });
    describe('save new user', () => {
        it('should save new user on db', async () => {
            const res = await request(app)
                .post('/users')
                .send(newCashier);
            expect(res.statusCode).toBe(401);
            cashier = res.body;
        });
    });
});
afterAll(() => mongoose.disconnect());

