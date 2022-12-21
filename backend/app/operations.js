const express = require("express");
const Operation = require("../models/Operation");
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");
const Shift = require("../models/Shift");
const Cash = require("../models/Cash");
const config = require("../config");
const Product = require("../models/Product");
const router = express.Router();

router.get("/", auth, async (req, res) => {
    const {page, perPage} = req.query;
    const query = {};
    const options = {
        populate: {path: 'shift', select: 'shiftNumber'},
        sort: {operationNumber:-1},
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
router.post("/", auth, permit('cashier'), async (req, res) => {
    const {title, shiftId, customerInfo, purchaseInfo, total} = req.body;

    try {
        const shift = await Shift.findById(shiftId);

        if (shift) {
            if (!shift.isActive) {
                return res.status(403).send({message: 'Operation can not be done!'});
            }
        }

        if (title === config.operations.purchase) {
            const completePurchaseInfo = await Promise.all(
                purchaseInfo.map(async i => {
                        const item = await Product.findById(i._id);
                        if (i.quantity > item.amount) {
                            throw({error: 'Data not valid'});
                        }
                        await Product.findByIdAndUpdate(i._id, {amount: item.amount - i.quantity});
                        return {...i, price: item.price, title: item.title, barcode: item.barcode}
                }));

            const cash = await Cash.findOne();
            const cashBefore = cash.cash;
            cash.cash = cashBefore + (+total);
            await cash.save();
            const operation = new Operation({
                shift: shift._id,
                title: config.operations.purchase,
                dateTime: Date.now(),
                additionalInfo: {customer: customerInfo, completePurchaseInfo, amountOfMoney: total, cash: cashBefore}
            });
            await operation.save();

            await res.send(operation);
        } else {
            return res.status(404).send({message: 'Wrong type of operation'});
        }

    } catch (e) {
        res.status(400).send(e);
    }
});
module.exports = router;
