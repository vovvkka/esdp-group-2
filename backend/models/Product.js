const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');
const mongoosePaginate = require('mongoose-paginate');
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
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async value => {
                const category = await Product.findOne({barcode: value});

                if (category) return false;
            },
            message: 'Продукт с таким баркодом уже существует.',
        }
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
        required: true,
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
    image: [{type:String}],
},{
    timestamps: true
});

ProductSchema.plugin(idValidator, {message : 'Bad ID value for {PATH}'});
ProductSchema.plugin(mongoosePaginate);
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
