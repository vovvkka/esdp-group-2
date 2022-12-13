const express = require('express');
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");
const Shift = require("../models/Shift");
const Operation = require("../models/Operation");
const Cash = require("../models/Cash");
const config = require('../config');
const router = express.Router();

router.get('/', auth, permit('cashier'), async (req, res) => {
    try {
        const cash = await Cash.findOne();
        res.send({cash: cash.cash});
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

router.put('/', auth, permit('cashier'), async (req, res) => {
    const {title, shiftId, amountOfMoney, comment} = req.body;
    try {
        const shift = await Shift.findById(shiftId);
        if (shift) {
            if (!shift.isActive) {
                return res.status(403).send({message: 'Operation can not be done!'});
            }
        }
        const cash = await Cash.findOne();
        if (title === config.operations.insertCash) {
            const cashBefore = cash.cash;
            cash.cash = cashBefore + (+amountOfMoney);
            await cash.save();
            const operation = new Operation({
                shift: shift._id,
                title: config.operations.insertCash,
                dateTime: Date.now(),
                additionalInfo: {cashBefore, amountOfMoney, cash: cash.cash}
            });
            await operation.save();
            res.send(operation);
        } else if (title === config.operations.withdrawCash) {
            const cashBefore = cash.cash;
            cash.cash = cashBefore - (+amountOfMoney);
            await cash.save();
            const operation = new Operation({
                shift: shift._id,
                title: config.operations.withdrawCash,
                dateTime: Date.now(),
                additionalInfo: {cashBefore, amountOfMoney, cash: cash.cash, comment}
            });
            await operation.save();
            res.send(operation);
        } else {
            return res.status(404).send({message: 'Wrong type of operation'});
        }
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});


module.exports = router;