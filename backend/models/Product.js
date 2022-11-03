const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    description: {
        type: String
    },
    image: String,
    barcode: {
        type: Number,
        required: true
    },
    priceType: {
        type: String,
        enum: ['Фиксированная', 'Свободная'],
        required: true
    },
    unit: {
        type: String,
        required: true,
        enum: ['шт.', 'уп.']
    },
    status: {
        type: String,
        required: true,
        enum: ['Активный', 'Неактивный'],
    },
    purchasePrice: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
});

ProductSchema.plugin(idValidator, {message : 'Bad ID value for {PATH}'});
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;