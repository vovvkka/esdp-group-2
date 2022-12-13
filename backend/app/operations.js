const express = require("express");
const Operation = require("../models/Operation");
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");
const Shift = require("../models/Shift");
const config = require("../config");
const router = express.Router();

router.get("/", auth, async (req, res) => {
    const {page, perPage} = req.query;
    const query = {};
    const options = {
        populate: {path: 'shift', select: 'shiftNumber'},
        page: parseInt(page) || 1,
        limit: parseInt(perPage) || 30
    };

    try {
        const operations = await Operation.paginate(query, options);
        res.send(operations);
    } catch (e) {
        res.status(400).send(e);
    }
});
router.post("/", auth,permit('cashier'), async (req, res) => {
    const {title, shiftId, customerInfo, purchaseInfo} = req.body;
    try {
        const shift = await Shift.findById(shiftId);
        if (shift) {
            if (!shift.isActive) {
                return res.status(403).send({message: 'Operation can not be done!'});
            }
        }
        if (title === config.operations.purchase) {
            const operation = new Operation({
                shift: shift._id,
                title: config.operations.insertCash,
                dateTime: Date.now(),
                additionalInfo: {customerInfo,purchaseInfo}
            });
            await operation.save();
            res.send(operation);
        }  else {
            return res.status(404).send({message: 'Wrong type of operation'});
        }

    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});
module.exports = router;
