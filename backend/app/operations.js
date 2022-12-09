const express = require("express");
const Operation = require("../models/Operation");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const operations = await Operation.find();
        res.send(operations);
    } catch (e) {
        res.status(400).send(e);
    }
})
module.exports = router;
