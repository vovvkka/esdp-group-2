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

module.exports = router;