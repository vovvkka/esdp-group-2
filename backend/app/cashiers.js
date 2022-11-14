const express = require('express');
const User = require("../models/User");
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const cashiers = await User.find({role: {$eq: 'cashier'}});

        if (!cashiers) {
            return res.status(404).send({message: 'Cashier not found!'});
        }

        res.send(cashiers);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;