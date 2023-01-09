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
    if(req.query.title){
        query.title=req.query.title;
    }
    const options = {
        populate: {path: 'shift', select: 'shiftNumber'},
        sort: {operationNumber: -1},
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
router.get("/report/:id", auth, async (req, res) => {
    const shiftId = req.params.id;

    try {
        const shift = await Shift.findById(shiftId).select('cashier shiftNumber createdAt isActive').populate('cashier','displayName');

        if (shift) {
            if (!shift.isActive) {
                return res.status(403).send({message: 'Operation can not be done!'});
            }
        } else {
            return res.status(404).send({message: 'Shift not found!'});
        }
        const operations = await Operation.find({shift:shiftId});
        let salesNum = 0;
        let returnsNum = 0;
        let salesTotal = 0;
        let returnsTotal = 0;
        operations.forEach((value) => {
            if(value.title===config.operations.purchase) {
                salesNum++;
                salesTotal+=value.additionalInfo.amountOfMoney;
            }else if(value.title===config.operations.returnPurchase) {
                returnsNum++;
                returnsTotal+=value.additionalInfo.amountOfMoney;
            }
        });

        res.send({shift,cash:operations[operations.length-1].additionalInfo.cash,salesNum,salesTotal,returnsNum,returnsTotal});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post("/", auth, permit('cashier'), async (req, res) => {
    const title = req.body.title;
    const shiftId = req.body.shiftId;

    try {
        const shift = await Shift.findById(shiftId);

        if (shift) {
            if (!shift.isActive) {
                return res.status(403).send({message: 'Operation can not be done!'});
            }
        } else {
            return res.status(404).send({message: 'Shift not found!'});
        }

        if (title === config.operations.purchase) {
            const {customerInfo, purchaseInfo, total, discount} = req.body;

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
                additionalInfo: {customer: customerInfo, completePurchaseInfo, discount, amountOfMoney: total, cash: cashBefore}
            });
            await operation.save();

            await res.send(operation);
        } else if (title === 'returnPurchaseCheck') {
            const {checkNumber, barcode, quantity} = req.body;

            const purchase = await Operation.findOne({operationNumber: checkNumber});
            if (!purchase || purchase.title !== config.operations.purchase) {
                return res.status(404).send({message: 'Wrong receipt number'});
            }
            const item = purchase.additionalInfo.completePurchaseInfo.filter(i => i.barcode === barcode);

            if (!item.length) {
                return res.status(404).send({message: 'Wrong product'});
            }

            if(item[0].returned){
                if (quantity > item[0].quantity-item[0].returned) {
                    return res.status(400).send({message: 'Wrong amount'});
                }
            }
            if (quantity > item[0].quantity) {
                return res.status(400).send({message: 'Wrong amount'});
            }
            await res.send({total: item[0].price - (item[0].price * quantity * item[0].discount) / 100});
        } else if (title === config.operations.returnPurchase) {
            const {checkNumber, barcode, quantity, total} = req.body;
            const purchase = await Operation.findOne({operationNumber: checkNumber});
            const purchaseInfo = purchase.additionalInfo.completePurchaseInfo.map(i => {
                if(i.barcode === barcode){
                    if(i.returned){
                        i.returned=i.returned+quantity;
                    }else {
                        i.returned = quantity;
                    }
                    return i;
                }else{
                    return i;
                }
            });
            await Operation.findByIdAndUpdate(purchase._id, {...purchase, completePurchaseInfo:purchaseInfo});


            const item = await Product.findOne({barcode: barcode});
            await Product.findByIdAndUpdate(item._id, {amount: item.amount + quantity});

            const cash = await Cash.findOne();
            const cashBefore = cash.cash;
            cash.cash = cashBefore - (+total);
            await cash.save();
            const operation = new Operation({
                shift: shift._id,
                title: config.operations.returnPurchase,
                dateTime: Date.now(),
                additionalInfo: {barcode, quantity, checkNumber, amountOfMoney: total, cash: cashBefore}
            });
            await operation.save();

            await res.send(operation);
        } else {
            return res.status(404).send({message: 'Wrong type of operation'});
        }

    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});
module.exports = router;
