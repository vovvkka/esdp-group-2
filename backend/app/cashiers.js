const express = require('express');
const User = require("../models/User");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const cashiers = await User.find({role: {$eq: 'cashier'}});

        if (!cashiers) {
            return res.status(404).send({message: 'Кассир не найден.'});
        }

        res.send(cashiers);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const cashier = await User.findById(req.params.id);

        if (!cashier) {
            return res.status(404).send({message: 'Кассир не найден.'});
        }

        res.send(cashier);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.put('/:id', async (req, res) => {
    const {username, password, displayName, pin, role} = req.body;
    const userData = {username, password, displayName, pin, role};

    try {
        const cashier = await User.findById(req.params.id);

        if (!cashier) {
            return res.status(404).send({message: 'Кассир не найден.'});
        }

        await User.findByIdAndUpdate(req.params.id, userData);

        res.send({message: 'Edit successful!'});
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

module.exports = router;