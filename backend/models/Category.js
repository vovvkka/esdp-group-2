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
        enum: ['Активный', 'Неактивный'],
        required: true,
    },
    nds: {
        type: Number,
    },
    nspCash: {
        type: Number,
    },
    nspNotCash: {
        type: Number,
    },
    timestamps: true,
});


const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;