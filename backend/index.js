const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exitHook = require('async-exit-hook');
const users = require('./app/users');
const products = require('./app/products');
const categories = require('./app/categories');
const shifts = require('./app/shifts');
const cashiers = require('./app/cashiers');
const config = require('./config');

const app = express();
const PORT = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());


app.use('/users', users);
app.use('/products', products);
app.use('/categories', categories);
app.use('/shifts', shifts);
app.use('/cashiers', cashiers);

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    app.listen(PORT, () => {
        console.log(`Server started on ${PORT} port!`);
    });

    exitHook(() => {
        mongoose.disconnect();
        console.log('MongoDb disconnect');
    });
};

run().catch(e => console.log(e));