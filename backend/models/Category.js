const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async value => {
                const category = await Category.findOne({title: value});

                if (category) return false;
            },
            message: 'Категория с таким названием уже существует.',
        }
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

},{
    timestamps: true
});


const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;