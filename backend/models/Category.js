const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
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
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
    },
    ancestors: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    status: {
        type: String,
        enum: ['Активный', 'Неактивный'],
        required: true,
    },
}, {
    timestamps: true
});


CategorySchema.plugin(AutoIncrement, {inc_field: 'categoryNumber'});
const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;