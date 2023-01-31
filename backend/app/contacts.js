const express = require("express");
const Contacts = require("../models/Contacts");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const contacts = await Contacts.findOne();
        res.send(contacts);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.put('/', async (req, res) => {
    const {email, phone, address} = req.body;

    const contactsData = {
        email,
        phone,
        address
    };

    try {
        const contacts = await Contacts.findOne();

        if (!contacts) {
            res.status(404).send({message: 'News not found!'});
        }
        const updateContacts = await Contacts.updateOne(contacts, contactsData);
        res.send(updateContacts);
    } catch {
        res.sendStatus(500);
    }
});

module.exports = router;