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

router.put('/:id/unblock', auth, permit('cashier'), async (req, res) => {
    const {pin} = req.body;
    const user = req.user;
    try {
        const shift = await Shift.findById(req.params.id);

        if (!shift) {
            return res.status(404).send({message: 'Working Shift not found!'})
        }
        if(user.pin === pin){
            shift.isBlocked = false;
            res.send(shift);
        }else{
            res.status(403).send({error: 'Wrong PIN'});
        }
    } catch (e) {
        console.log(e)
        res.status(400).send({error: e.errors});
    }
});

router.put('/:id/block', auth, permit('cashier'), async (req, res) => {
    const user = req.user;
    try {
        const shift = await Shift.findById(req.params.id);

        if (!shift) {
            return res.status(404).send({message: 'Working Shift not found!'})
        }
        if(user._id.equals(shift.cashier)){
            shift.isBlocked = true;
            await shift.save();
            res.send(shift);
        }else{
            res.status(403).send({error: 'Shift can not be blocked'});
        }
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

router.put('/:id', auth, permit('cashier'), async (req, res) => {
    const user = req.user;
    try {
        const shift = await Shift.findById(req.params.id);

        if (!shift) {
            return res.status(404).send({message: 'Working Shift not found!'})
        }
        if(user._id.equals(shift.cashier)){
            shift.isActive = false;
            await shift.save();
            res.send(shift);
        }else{
            res.status(403).send({error: 'Shift can not be closed'});
        }
    } catch (e) {
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