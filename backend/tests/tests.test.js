const mongoose = require('mongoose');
const request = require('supertest');
const app  = require("../index");

// Cashier Tests

describe('Testing cashier routes', () => {
    let cashiers;
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

    describe('DELETE /sessions', () => {
        it('Logout from cashier account', async () => {
            const res = await request(app)
                .delete('/users/sessions')
                .set({Authorization: cashiers.user.token});
            expect(res.statusCode).toBe(200);
            cashiers = res.body;
        });
    });
});

// Admin Tests

describe('Testing admin routes', () => {
    let admin;
    let cashiers;
    let categories;

    describe('POST /users/sessions', () => {
        it('Login as admin', async () => {
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

    describe('GET /admin', () => {
        it('Get info for admin', async () => {
            const res = await request(app)
                .get('/admin')
                .set({Authorization: admin.user.token});
            expect(res.statusCode).toBe(200);
            adminInfo = res.body;
        });
    });

    describe('PUT /admin', () => {
        it('Change admin details', async () => {
            const res = await request(app)
                .put('/admin')
                .send({
                    displayName: 'admin',
                    email: 'admin2023@gmail.com',
                    username: 'admin2023',
                })
                .set({Authorization: admin.user.token});
            expect(res.statusCode).toBe(200);
        });
    });

    describe('PUT /admin/password', () => {
        it('Change admin password', async () => {
            const res = await request(app)
                .put('/admin/password')
                .send({
                    oldPassword: 'admin0',
                    newPassword: 'admin',
                    newPasswordRepeat: 'admin',
                })
                .set({Authorization: admin.user.token});
            expect(res.statusCode).toBe(200);
        });
    });

    describe('GET /cashiers', () => {
        it('Get all cashiers', async () => {
            const res = await request(app)
                .get('/cashiers')
                .set({Authorization: admin.user.token});
            expect(res.statusCode).toBe(200);
            cashiers = res.body;
        });
    });

    describe('GET /cashiers/:id', () => {
        it('Get cashier', async () => {
            const res = await request(app)
                .get(`/cashiers/${cashiers[0]._id}`)
                .set({Authorization: admin.user.token});
            expect(res.statusCode).toBe(200);
        });
    });

    describe('PUT /cashiers/:id', () => {
        it('Change cashier details', async () => {
            const res = await request(app)
                .put(`/cashiers/${cashiers[0]._id}`)
                .send({
                    username: 'Vasa',
                    password: '123456789',
                    email: 'vasa@gmail.com',
                    displayName: 'Вася',
                    pin: '1234',
                })
                .set({Authorization: admin.user.token});
            expect(res.statusCode).toBe(200);
        });
    });

    describe('DELETE /cashiers/:id', () => {
        it('Delete cashier', async () => {
            const res = await request(app)
                .delete(`/cashiers/${cashiers[0]._id}`)
                .set({Authorization: admin.user.token});
            expect(res.statusCode).toBe(200);
        });
    });

    describe('GET /categories', () => {
        it('Get all categories', async () => {
            const res = await request(app)
                .get('/categories')
            expect(res.statusCode).toBe(200);
            categories = res.body;
        });
    });

    describe('GET /categories/:id', () => {
        it('Get category', async () => {
            const res = await request(app)
                .get(`/categories/${categories[0]._id}`)
            expect(res.statusCode).toBe(200);
        });
    });

    describe('POST /categories', () => {
        it('Create category', async () => {
            const res = await request(app)
                .post('/categories')
                .send({
                    title: 'asd',
                    status: 'Активный',
                    category: categories[0]._id,
                })
                .set({Authorization: admin.user.token});
            expect(res.statusCode).toBe(200);
        });
    });

    describe('PUT /categories/:id', () => {
        it('Edit category', async () => {
            const res = await request(app)
                .put(`/categories/${categories[0]._id}`)
                .send({
                    title: 'asd222',
                    status: 'Неактивный',
                    category: categories[1]._id,
                })
                .set({Authorization: admin.user.token});
            expect(res.statusCode).toBe(200);
        });
    });

    describe('DELETE /categories/:id', () => {
        it('Delete category', async () => {
            const res = await request(app)
                .delete(`/categories/${categories[0]._id}`)
                .set({Authorization: admin.user.token});
            expect(res.statusCode).toBe(200);
        });
    });
});

afterAll(() => mongoose.disconnect());