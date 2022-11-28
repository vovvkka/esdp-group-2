const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');
const {openShift, closeShift, withdrawCash, purchase, returnPurchase, insertCash} = require("../config");
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
        enum: [openShift, closeShift, withdrawCash, insertCash, purchase, returnPurchase],
        required: true,
    },
    dateTime: Date.now(),
    additionalInfo: {
        type: Object,
    },
});

OperationSchema.plugin(idValidator, {message : 'Bad ID value for {PATH}'});

OperationSchema.plugin(AutoIncrement, {inc_field: 'operationNumber'});
const Operation = mongoose.model('Operation', OperationSchema);


module.exports = Operation;
