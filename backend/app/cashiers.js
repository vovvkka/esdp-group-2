const express = require('express');
const User = require("../models/User");
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");
const router = express.Router();

router.get('/',auth,permit('admin'), async (req, res) => {
    try {
        const cashiers = await User.find({role: {$eq: 'cashier'}});

        if (!cashiers) {
            return res.status(404).send({message: 'Cashier not found!'});
        }

        res.send(cashiers);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/:id',auth,permit('admin'), async (req, res) => {
    try {
        const cashier = await User.findById(req.params.id);

        if (!cashier) {
            return res.status(404).send({message: 'Cashier not found!'});
        }

        res.send(cashier);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.put('/:id',auth,permit('admin'), async (req, res) => {
    const {username, password, displayName, pin} = req.body;
    const userData = {username, password, displayName, pin};

    try {
        const cashier = await User.findById(req.params.id);

        if (!cashier) {
            return res.status(404).send({message: 'Cashier not found!'});
        }
        if (!password){
            delete userData.password;
        }
        await User.findByIdAndUpdate(req.params.id,userData);

        res.send({message: 'Edit successful!'});
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

module.exports = router;