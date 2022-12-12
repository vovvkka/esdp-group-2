const express = require("express");
const Operation = require("../models/Operation");
const router = express.Router();

router.get("/", async (req, res) => {
    const {page, perPage} = req.query;
    const query = {};
    const options = {
        populate: {path: 'shift', select: 'shiftNumber'},
        page: parseInt(page) || 1,
        limit: parseInt(perPage) || 30
    };

    try {
        const operations = await Operation.paginate(query, options);
        res.send(operations);
    } catch (e) {
        res.status(400).send(e);
    }
})
module.exports = router;
