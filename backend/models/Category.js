const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        required: true,
        enum: ['Активный', 'Неактивный'],
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