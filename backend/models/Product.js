const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    barcode: {
        type: Number,
        required: true
    },
    priceType: {
        type: String,
        enum: ['Фиксированная', 'Свободная'],
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    amount: {
        type: Number,
        required: true
        min: 0
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
    image: String,
});

ProductSchema.plugin(idValidator, {message : 'Bad ID value for {PATH}'});
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
