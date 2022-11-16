const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: String,
},{
    timestamps: true
});

const News = mongoose.model('News', NewsSchema);

module.exports = News;