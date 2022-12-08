const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactsSchema = new Schema({
    address: [{type: String, required: true}],
    phone: [{type: String, required: true}],
    email: [{type: String, required: true}],
    instagram: String,
},{
    timestamps: true
});

const Contacts = mongoose.model('Contacts', ContactsSchema);

module.exports = Contacts;