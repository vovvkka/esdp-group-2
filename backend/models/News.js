const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validateMinLength = async value => {
    const length = value.length < 10;

    if (length) return false;
};

const NewsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        validate: {
            validator: validateMinLength,
            message: "Минимальное количество символов - 10"
        }
    },
    image: String,
    published: {
        type: Boolean,
        default:false,
    }
},{
    timestamps: true
});

const News = mongoose.model('News', NewsSchema);

module.exports = News;