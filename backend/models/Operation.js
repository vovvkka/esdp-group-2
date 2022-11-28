const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');
const config = require('../config');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const OperationSchema = new Schema({
    shift: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Shift',
    },
    title: {
        type: String,
        enum: [
            config.operations.openShift,
            config.operations.closeShift,
            config.operations.withdrawCash,
            config.operations.insertCash,
            config.operations.purchase,
            config.operations.returnPurchase
        ],
        required: true,
    },
    dateTime: Date.now(),
    additionalInfo: {
        type: Object,
    },
});

OperationSchema.plugin(idValidator, {message: 'Bad ID value for {PATH}'});

OperationSchema.plugin(AutoIncrement, {inc_field: 'operationNumber'});
const Operation = mongoose.model('Operation', OperationSchema);


module.exports = Operation;
