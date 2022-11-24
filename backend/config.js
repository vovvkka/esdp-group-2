const path = require('path');
const rootPath = __dirname;
let dbUrl = 'mongodb://localhost/esdp';
let port = 8000;

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
};