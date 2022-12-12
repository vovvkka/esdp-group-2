const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');
const mongoosePaginate = require('mongoose-paginate');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

// const validatePhone = value => {
//     const pattern = /^(\+[(]\d{2,3}[)])( \d{3}){3}$/;
//     if (value === "") {
//         return true;
//     }
//     if (!pattern.test(value)) return false;
// };
const validateEmail = value => {
    const pattern = /^([a-zA-Z0-9]+[_.]?[a-zA-Z0-9])+@([a-zA-Z]{2,5})\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    if (value === "") {
        return true;
    }
    if (!pattern.test(value)) return false;
};
const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        min: 1,
        max: 100,
        required: true,
    }, phone: {
        type: String,
        // validate: {
        //     validator: validatePhone,
        //     message: 'Неправильный формат номера!',
        // }
    },
    address: String,
    email: {
        type: String,
        validate: {
            validator: validateEmail,
            message: 'Неправильный формат email!'
        }
    },
    image: String,
}, {
    timestamps: true,
});

CustomerSchema.plugin(idValidator, {message: 'Bad ID value for {PATH}'});
CustomerSchema.plugin(AutoIncrement, {inc_field: 'customerNumber'});
CustomerSchema.plugin(mongoosePaginate);
const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
