const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exitHook = require('async-exit-hook');
const users = require('./app/users');
const products = require('./app/products');
const categories = require('./app/categories');
const shifts = require('./app/shifts');
const orders = require('./app/orders');
const cash = require('./app/cash');

const cashiers = require('./app/cashiers');
const news = require('./app/news');
const config = require('./config');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());


app.use('/users', users);
app.use('/products', products);
app.use('/categories', categories);
app.use('/shifts', shifts);

app.use('/orders', orders);
app.use('/cashiers', cashiers);
app.use('/news', news);
app.use('/cash', cash);

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    app.listen(config.port, () => {
        console.log(`Server started on ${config.port} port!`);
    });

    exitHook(() => {
        mongoose.disconnect();
        console.log('MongoDb disconnect');
    });
};

run().catch(e => console.log(e));