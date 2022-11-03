const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Активный', 'Неактивный'],F
    },
    nds: {
        type: Number,
    },
    nspCash: {
        type: Number,
    },
    nspNotCash: {
        type: Number,
    }
});


const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;