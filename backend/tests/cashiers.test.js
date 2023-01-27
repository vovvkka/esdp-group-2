const mongoose = require('mongoose');
const request = require('supertest');
const app  = require("../index");

describe('Testing cashiers routes', () => {
    let cashiers;
    let cash;
    let shifts;
    let Xreport;

    describe('POST /users/sessions', () => {
        it('Login as cashier', async () => {
            const res = await request(app)
                .post('/users/sessions')
                .send({
                    username: 'cashier 1',
                    password: 'cashier1',
                });
            expect(res.statusCode).toBe(200);
            cashiers = res.body;
        });
    });

    describe('POST /shifts', () => {
        it('Open shift', async () => {
            const res = await request(app)
                .post('/shifts')
                .send({
                    pin: '1111'
                })
                .set({Authorization: cashiers.user.token});
            expect(res.statusCode).toBe(200);
            shifts = res.body;
        });
    });

    describe('GET /cash', () => {
        it('Get all the money', async () => {
            const res = await request(app)
                .get('/cash')
                .set({Authorization: cashiers.user.token});
            expect(res.statusCode).toBe(200);
            cash = res.body;
        });
    });

    describe('PUT /cash add cash', () => {
        it('Insert cash', async () => {
            const res = await request(app)
                .put('/cash')
                .send({
                    title: 'Внесение наличных',
                    shiftId: shifts._id,
                    amountOfMoney: '200',
                    comment: '123',
                })
                .set({Authorization: cashiers.user.token});
            expect(res.statusCode).toBe(200);
            cash = res.body;
        });
    });

    describe('PUT /cash del cash', () => {
        it('Withdraw cash', async () => {
            const res = await request(app)
                .put('/cash')
                .send({
                    title: 'Изъятие наличных',
                    shiftId: shifts._id,
                    amountOfMoney: '200',
                    comment: '1232',
                })
                .set({Authorization: cashiers.user.token});
            expect(res.statusCode).toBe(200);
            cash = res.body;
        });
    });

    describe('GET /operations', () => {
        it('Get X-report', async () => {
            const res = await request(app)
                .get(`/operations/report/${shifts._id}`)
                .set({Authorization: cashiers.user.token});
            expect(res.statusCode).toBe(200);
            Xreport = res.body;
        });
    });

    describe('PUT /shifts', () => {
        it('Closing the shift', async () => {
            const res = await request(app)
                .put(`/shifts/${shifts._id}`)
                .set({Authorization: cashiers.user.token});
            expect(res.statusCode).toBe(200);
            shifts = res.body;
        });
    });
});

afterAll(() => mongoose.disconnect());