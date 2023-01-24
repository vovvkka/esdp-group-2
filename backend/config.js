const path = require('path');
const rootPath = __dirname;
let dbUrl = 'mongodb://127.0.0.1/esdp';
let port = 8000;

const openShift = 'Открытие смены';
const closeShift = 'Закрытие смены';
const withdrawCash = 'Изъятие наличных';
const insertCash = 'Внесение наличных';
const purchase = 'Продажа';
const returnPurchase = 'Возврат продажи';

if(process.env.NODE_ENV === 'test') {
    dbUrl = 'mongodb://127.0.0.1/esdptest';
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