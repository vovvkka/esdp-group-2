const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exitHook = require('async-exit-hook');

const config = require('./config');

const app = express();
const PORT = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

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