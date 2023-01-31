const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;


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
    price: {
        type: Number,
        required: true,
        min: 0
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
        enum: ['Новый', 'Собран', 'Закрыт'],
    },
    comment: String,
    dateTime: {
        type: Date,
        required: true,
        default: new Date(),
    }
});

OrderSchema.plugin(AutoIncrement, {inc_field: 'orderNumber'});
OrderSchema.plugin(mongoosePaginate);
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;