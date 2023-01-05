const path = require('path');
const rootPath = __dirname;
let dbUrl = 'mongodb://localhost/esdp';
let port = 8000;

const openShift = 'Открытие смены';
const closeShift = 'Закрытие смены';
const withdrawCash = 'Изъятие наличных';
const insertCash = 'Внесение наличных';
const purchase = 'Продажа';
const returnPurchase = 'Возврат продажи';

if(process.env.NODE_ENV === 'test') {
    dbUrl = 'mongodb://localhost/esdp-test';
    port = 8010;
}
module.exports = {
    rootPath,
    port,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: dbUrl,
        options: {useNewUrlParser: true},
    },
    operations: {
        openShift,
        closeShift,
        withdrawCash,
        insertCash,
        purchase,
        returnPurchase
    }
};