const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactsSchema = new Schema({
    address: [{type: String, required: true}],
    phone: [{type: String, required: true}],
    email: String,
    instagram: String,
},{
    timestamps: true
});

const Contacts = mongoose.model('Contacts', ContactsSchema);

module.exports = Contacts;