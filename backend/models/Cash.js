const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CashSchema = new Schema({
    cash: {
        type: Number,
        required: true,
        min:0,
    },
},{
    timestamps: true
});

const Cash = mongoose.model('Cash', CashSchema);

module.exports = Cash;