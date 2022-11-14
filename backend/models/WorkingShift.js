const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const WorkingShiftSchema = new Schema({
    cashier: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    isActive: {
        type: Boolean,
        required:true,
        default:true,
    },
    isBlocked: {
        type: Boolean,
        required:true,
        default:false,
    },
},{
   timestamps:true,
});

WorkingShiftSchema.plugin(idValidator, {message : 'Bad ID value for {PATH}'});
WorkingShiftSchema.plugin(AutoIncrement, {inc_field: 'shiftNumber'});
const WorkingShift = mongoose.model('WorkingShift', WorkingShiftSchema);


module.exports = WorkingShift;
