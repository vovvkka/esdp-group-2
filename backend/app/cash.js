const express = require('express');
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");
const Shift = require("../models/Shift");
const Operation = require("../models/Operation");
const Cash = require("../models/Cash");
const config = require('./config');
const router = express.Router();


router.put('/', async (req, res) => {
    const {title, shiftId, amountOfMoney} = req.body;
    try {
        const shift = await Shift.findById(shiftId);

        if (!shift && shift.isActive) {
            return res.status(404).send({message: 'Operation can not be done!'})
        }
        if(title===config.insertCash){
            const cash = await Cash.findOne();
            const recentCash = cash.cash;
            cash.cash = recentCash + amountOfMoney;
            await cash.save();
            const operation = new Operation({shift:shift._id,title:config.insertCash,additionalInfo: {recentCash,amountOfMoney}})
            res.send(operation);
        }else{
            res.status(403).send({error: 'Shift can not be closed'});
        }
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});


module.exports = router;