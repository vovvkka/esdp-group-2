const express = require('express');
const User = require("../models/User");
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");
const router = express.Router();

router.get('/',auth,permit('admin'), async (req, res) => {
    try {
        const cashiers = await User.find({role: {$eq: 'cashier'},isFired: false});

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
        if (cashier.isFired) {
            return res.status(404).send({message: 'Cashier not found!'});
        }
        if (!cashier) {
            return res.status(404).send({message: 'Cashier not found!'});
        }

        res.send(cashier);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.put('/:id',auth,permit('admin'), async (req, res) => {
    const {username, password, email, displayName, pin} = req.body;
    const userData = {username, password, email, displayName, pin};

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

router.delete('/:id',auth,permit('admin'), async (req, res) => {
    try {
        const cashier = await User.findById(req.params.id);

        if (!cashier) {
            return res.status(404).send({message: 'Cashier not found!'});
        }
        await User.findByIdAndUpdate(req.params.id, {"isFired": true});

        res.send({message: 'Delete successful!'});
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

module.exports = router;