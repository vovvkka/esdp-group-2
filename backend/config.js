const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: 'mongodb://localhost/esdp',
        options: {useNewUrlParser: true},
    },
};