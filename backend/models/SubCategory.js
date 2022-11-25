const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
    },
    title: {
        type: String,
        required: true,
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
    timestamps:true,
});

const SubCategory = mongoose.model('SubCategory', SubCategorySchema);

module.exports = SubCategory;
