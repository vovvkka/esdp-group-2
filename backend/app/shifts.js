const express = require('express');
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");
const Shift = require("../models/Shift");
const Operation = require("../models/Operation");
const Cash = require("../models/Cash");
const config = require("../config");
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const {page, perPage} = req.query;
    const query = {};
    const options = {
        populate: {path: 'cashier', select: 'displayName'},
        sort: {shiftNumber: -1},
        page: parseInt(page) || 1,
        limit: parseInt(perPage) || 30
    };

    try {
        const shifts = await Shift.paginate(query, options);
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
        if (user.pin === pin) {
            shift.isBlocked = false;
            await shift.save();
            res.send(shift);
        } else {
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
        if (user._id.equals(shift.cashier)) {
            shift.isBlocked = true;
            await shift.save();
            res.send(shift);
        } else {
            res.status(403).send({error: 'Shift can not be blocked'});
        }
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

router.put('/:id', auth, permit('cashier'), async (req, res) => {
    try {
        const user = req.user;
        const shift = await Shift.findById(req.params.id);

        if (!shift) {
            return res.status(404).send({message: 'Working Shift not found!'})
        }

        if (user._id.toString() !== shift.cashier.toString()) {
            return res.status(403).send({error: 'Shift can not be closed'});
        }

        shift.isActive = false;
        await shift.save();

        const cash = await Cash.findOne();

        const operationData = {
            shift: shift._id,
            title: config.operations.closeShift,
            dateTime: new Date(),
            additionalInfo: {cash: cash.cash},
        };

        const operation = new Operation(operationData);
        await operation.save();

        res.send(shift);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

router.post('/', auth, permit('cashier'), async (req, res) => {
    try {
        const {pin} = req.body;
        const user = req.user;

        if (user.pin !== pin) {
            return res.status(403).send({error: 'Wrong PIN'});
        }

        const cash = await Cash.findOne();

        const shift = new Shift({cashier: user._id});
        await shift.save();

        const operationData = {
            shift: shift._id,
            title: config.operations.openShift,
            dateTime: new Date(),
            additionalInfo: {cash: cash.cash},
        };

        const operation = new Operation(operationData);
        await operation.save();

        res.send(shift);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});


module.exports = router;