const express = require('express');
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");
const Shift = require("../models/WorkingShift");
const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const shifts = await Shift.find().populate('cashier','username');
        res.send(shifts);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.put('/:id', auth, permit('cashier'), async (req, res) => {
    const {pin} = req.body;
    const user = req.user;
    try {
        if(user.pin === pin){
            const shift = await Shift.findByIdAndUpdate(req.params.id, {isActive:false});
            res.send(shift);
        }else{
            res.status(403).send({error: 'Wrong PIN'});
        }
    } catch (e) {
        console.log(e)
        res.status(400).send({error: e.errors});
    }
});

router.post( '/',auth, permit('cashier'), async (req, res) => {
    const {pin} = req.body;
    const user = req.user;
    try {
        if(user.pin === pin){
            const shift = new Shift({cashier: user._id});
            await shift.save();
            res.send(shift);
        }else{
            res.status(403).send({error: 'Wrong PIN'});
        }
    } catch (e) {
        console.log(e)
        res.status(400).send({error: e.errors});
    }
});


module.exports = router;