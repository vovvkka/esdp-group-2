const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const WorkingShiftSchema = new Schema({
    cashier: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    openingDate: {
        type: String,
        required: true,
    },
    closingDate: {
        type: String,
        required: true,
    },
    checks: {
        type: String,
        required: true,
    },
});

WorkingShiftSchema.plugin(idValidator, {message : 'Bad ID value for {PATH}'});
const WorkingShift = mongoose.model('Product', WorkingShiftSchema);

module.exports = WorkingShift;
