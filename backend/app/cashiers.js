const express = require('express');
const User = require("../models/User");
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const cashiers = await User.find({role: {$eq: 'cashier'}});
        const user = cashiers.findById(req.params.id);
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;