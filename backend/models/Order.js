const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const validatePhone = value => {
    const pattern = /^(\+[(]\d{2,3}[)]) (\d{3}){3}$/;

    if (!pattern.test(value)) return false;
};

const ProductsSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    amount: {
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
        validate: {
            validator: validatePhone(),
            message: 'Неправильный формат номера!',
        }
    },
    order: [ProductsSchema],
    status: {
        type: String,
        required: true,
        default: 'новый',
        enum: ['новый', 'собран','закрыт'],
    },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;