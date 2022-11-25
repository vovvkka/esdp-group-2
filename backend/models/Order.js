const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;


const validatePhone = value => {
    const pattern = /^(\+[(]\d{2,3}[)])( \d{3}){3}$/;

    if (!pattern.test(value)) return false;
};

const ProductsSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        min: 1,
    },
});

const OrderSchema  = new Schema({
    customer: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    order: [ProductsSchema],
    status: {
        type: String,
        required: true,
        default: 'Новый',
        enum: ['Новый', 'Собран','Закрыт'],
    },
},{
    timestamps:true,
});

OrderSchema.plugin(AutoIncrement, {inc_field: 'orderNumber'});
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;