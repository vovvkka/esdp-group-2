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
    if (req.query.to && req.query.to !== 'null') {
        query.dateTime = {'$lte': new Date(req.query.to)};
    }
    if (req.query.from) {
        query.dateTime = {'$gte': new Date(req.query.from)};
    }
    if (req.query.to && req.query.from && req.query.to !== 'null') {
        query.dateTime = {'$gte': new Date(req.query.from), '$lte': new Date(req.query.to)};
    }
    if (req.query.title) {
        query.title = req.query.title;
    }

    const options = {
        populate: {
            path: 'shift',
            select: 'shiftNumber cashier',
            populate: {
                path: 'cashier', select: 'displayName'
            }
        },
        sort: {operationNumber: -1},
        page: parseInt(page) || 1,
        limit: parseInt(perPage) || 20
    };

    try {
        const operations = await Operation.paginate(query, options);
        res.send(operations);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get("/reports", auth, async (req, res) => {
    const query = {};
    if (req.query.from) {
        query.dateTime = {'$gte': new Date(req.query.from)};
    }
    if (req.query.to && req.query.to !== 'null') {
        query.dateTime = {'$lte': new Date(req.query.to)};
    }
    if (req.query.to && req.query.from && req.query.to !== 'null') {
        query.dateTime = {'$gte': new Date(req.query.from), '$lte': new Date(req.query.to)};
    }
    query.title = {'$in': [config.operations.purchase, config.operations.returnPurchase]};
    try {
            const reports = await Operation.aggregate([
                {$match: query},
                {
                    $group: {
                        _id: {$dateToString: {format: "%Y-%m-%d", date: "$dateTime"}},
                        sales: {$sum: {$cond: [{$eq: ["$title", config.operations.purchase]}, "$additionalInfo.amountOfMoney", 0]}},
                        returns: {$sum: {$cond: [{$eq: ["$title", config.operations.returnPurchase]}, "$additionalInfo.amountOfMoney", 0]}},
                        salesPurchasePriceTotal: {$sum: {$cond: [{$eq: ["$title", config.operations.purchase]}, "$additionalInfo.purchasePriceTotal", 0]}},
                        returnsPurchasePriceTotal: {$sum: {$cond: [{$eq: ["$title", config.operations.returnPurchase]}, "$additionalInfo.purchasePriceTotal", 0]}}
                    }
                },
                {
                    $addFields: {
                        totalSales: {$subtract: ['$sales', '$returns']},
                        totalPurchasePriceTotal: {$subtract: ['$salesPurchasePriceTotal', '$returnsPurchasePriceTotal']},
                    }
                },
                {
                    $addFields: {
                        totalProfit: {$subtract: ['$totalSales', '$totalPurchasePriceTotal']},
                    }
                },
                {
                    $project: {
                        returns: 0,
                        sales: 0,
                        returnsPurchasePriceTotal: 0,
                        salesPurchasePriceTotal: 0,
                        totalPurchasePriceTotal: 0
                    }
                }
            ]);
            await Promise.all(
            reports.map(async i=>{
                    const start = i._id;
                    const query={};
                query.title = {'$in': [config.operations.purchase, config.operations.returnPurchase]};
                    query.dateTime = {
                        '$gte': new Date(start),
                        '$lte': new Date(new Date(new Date(start).setDate(new Date(start).getDate() + 1)))
                    };
                    const operations = await Operation.aggregate([
                        {$match: query},
                        {
                            $group:
                                {
                                    _id: {$dateToString: {format: "%Y-%m-%d", date: "$dateTime"}},
                                    itemsSold: {$addToSet: {$cond: [{$eq: ["$title", config.operations.purchase]}, "$additionalInfo.completePurchaseInfo", '$$REMOVE']}},
                                    itemsReturned: {$addToSet: {$cond: [{$eq: ["$title", config.operations.returnPurchase]}, "$additionalInfo", '$$REMOVE']}}

                                },
                        }, {
                            $project: {
                                _id: '$_id',
                                itemsSold: {
                                    $reduce: {
                                        input: "$itemsSold",
                                        initialValue: [],
                                        in: {$concatArrays: ["$$value", "$$this"]}
                                    }
                                },
                                itemsReturned: '$itemsReturned'
                            }
                        }
                    ]);
                    const sales = {};

                    operations[0].itemsSold.forEach(e => {
                        const o = sales[e._id] = sales[e._id] || {...e, quantity: 0, totalDiscount: 0}
                        o.quantity += e.quantity;
                        o.totalDiscount += e.quantity * e.price * e.discount / 100;
                        delete o.discount;
                        delete o.barcode;
                    });
                    operations[0].itemsReturned.forEach(e => {
                        if (sales[e._id]) {
                            sales[e._id].quantity -= e.quantity;
                            sales[e._id].totalDiscount -= e.price * e.quantity - e.amountOfMoney;
                        }
                    });
                    return i.additonalInfo=Object.values(sales);

            }));
            res.send(reports);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get("/report/:id", auth, async (req, res) => {
    const shiftId = req.params.id;

    try {
        const shift = await Shift.findById(shiftId).select('cashier shiftNumber createdAt isActive').populate('cashier', 'displayName');

        if (shift) {
            if (!shift.isActive) {
                return res.status(403).send({message: 'Operation can not be done!'});
            }
        } else {
            return res.status(404).send({message: 'Shift not found!'});
        }
        const operations = await Operation.find({shift: shiftId});
        let salesNum = 0;
        let returnsNum = 0;
        let salesTotal = 0;
        let returnsTotal = 0;
        operations.forEach((value) => {
            if (value.title === config.operations.purchase) {
                salesNum++;
                salesTotal += value.additionalInfo.amountOfMoney;
            } else if (value.title === config.operations.returnPurchase) {
                returnsNum++;
                returnsTotal += value.additionalInfo.amountOfMoney;
            }
        });
        const cash = await Cash.findOne();
        res.send({shift,cash:cash.cash,salesNum,salesTotal,returnsNum,returnsTotal});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get("/report-z/:id", auth, async (req, res) => {
    const shiftId = req.params.id;

    try {
        const shift = await Shift.findById(shiftId).select('cashier shiftNumber updatedAt isActive').populate('cashier', 'displayName');

        if (shift) {
            if (shift.isActive) {
                return res.status(403).send({message: 'Operation can not be done!'});
            }
        } else {
            return res.status(404).send({message: 'Shift not found!'});
        }
        const reportSales = await Operation.aggregate([
            {$match: {title: config.operations.purchase}},
            {$lookup: {from: 'shifts', localField: 'shift', foreignField: '_id', as: 'shiftInfo'}},
            {$match: {'shiftInfo.shiftNumber': {$lte: shift.shiftNumber}}},
            {$group: {_id: null, total: {$sum: "$additionalInfo.amountOfMoney"}, count: {$sum: 1}}}
        ]);
        const reportReturns = await Operation.aggregate([
            {$match: {title: config.operations.returnPurchase}},
            {$group: {_id: null, total: {$sum: "$additionalInfo.amountOfMoney"}, count: {$sum: 1}}}
        ]);

        let salesNum = 0;
        let returnsNum = 0;
        let salesTotal = 0;
        let returnsTotal = 0;

        const operations = await Operation.find({shift: shiftId});
        operations.forEach((value) => {
            if (value.title === config.operations.purchase) {
                salesNum++;
                salesTotal += value.additionalInfo.amountOfMoney;
            } else if (value.title === config.operations.returnPurchase) {
                returnsNum++;
                returnsTotal += value.additionalInfo.amountOfMoney;
            }
        });

        const report = {};
        if (reportReturns.length) {
            report.returnsCount = reportReturns[0].count;
            report.returnsTotal = reportReturns[0].total;
        }
        if (reportSales.length) {
            report.salesCount = reportSales[0].count;
            report.salesTotal = reportSales[0].total;
        }

        res.send({
            report,
            shift,
            cash: operations[operations.length - 1].additionalInfo.cash,
            salesNum,
            salesTotal,
            returnsNum,
            returnsTotal
        });
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
                    return {
                        ...i,
                        price: i.price,
                        purchasePrice: item.purchasePrice,
                        title: item.title,
                        barcode: item.barcode
                    }
                }));

            const cash = await Cash.findOne();
            const cashBefore = cash.cash;
            cash.cash = cashBefore + (+total);
            await cash.save();
            let profit = 0;
            completePurchaseInfo.forEach(i => profit += i.quantity * i.purchasePrice);
            const operation = new Operation({
                shift: shift._id,
                title: config.operations.purchase,
                dateTime: Date.now(),
                additionalInfo: {
                    customer: customerInfo,
                    completePurchaseInfo,
                    discount,
                    amountOfMoney: total,
                    purchasePriceTotal: profit,
                    cash: cashBefore
                }
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

            if (item[0].returned) {
                if (quantity > item[0].quantity - item[0].returned) {
                    return res.status(400).send({message: 'Wrong amount'});
                }
            }
            if (quantity > item[0].quantity) {
                return res.status(400).send({message: 'Wrong amount'});
            }
            await res.send({total: Math.round(item[0].price - (item[0].price * quantity * item[0].discount) / 100)});
        } else if (title === config.operations.returnPurchase) {
            const {checkNumber, barcode, quantity, total} = req.body;
            const purchase = await Operation.findOne({operationNumber: checkNumber});
            const purchaseInfo = purchase.additionalInfo.completePurchaseInfo.map(i => {
                if (i.barcode === barcode) {
                    if (i.returned) {
                        i.returned = i.returned + quantity;
                    } else {
                        i.returned = quantity;
                    }
                    return i;
                } else {
                    return i;
                }
            });
            await Operation.findByIdAndUpdate(purchase._id, {...purchase, completePurchaseInfo: purchaseInfo});


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
                additionalInfo: {
                    _id: item._id,
                    barcode,
                    price: item.price,
                    purchasePrice: item.purchasePrice,
                    quantity,
                    purchasePriceTotal: quantity * item.purchasePrice,
                    checkNumber,
                    amountOfMoney: total,
                    cash: cashBefore
                }
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
