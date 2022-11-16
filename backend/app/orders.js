const express = require('express');
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");
const Order = require("../models/Order");
const router = express.Router();

router.get('/', auth, permit('admin'), async (req, res) => {
    try {
        const query = {};
        if (req.query.status) {
            query.category = req.query.status;
        }
        const orders = await Order.find(query);
        res.send(orders);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('order.styledProduct', 'title price');

        if (!order) {
            return res.status(404).send({message: 'Order not found!'})
        }

        res.send(order);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/', async (req, res) => {
    const {customer, phone, products} = req.body;
    if (!req.body.customer || !req.phone || !req.products.length) res
        .status(400)
        .send({error: 'Data not valid'});

    const orderData = {
        customer,
        phone,
        products: products,
    };
    try {
        const order = new Order(orderData);
        await order.save();

        res.send(order);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

router.put('/:id/collect', auth, permit('admin'), async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if(!order){
            return res.status(404).send({message: 'Order not found!'})
        }
        if(order.status === 'новый'){
            order.status = 'собран';
            await order.save();
        }
        res.send(order);
    } catch (e) {
        console.log(e)
        res.status(400).send({error: e.errors});
    }
});

router.put('/:id/close', auth, permit('admin'), async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if(!order){
            return res.status(404).send({message: 'Order not found!'})
        }
        if(order.status === 'собран'){
            order.status = 'закрыт';
            await order.save();
        }
        res.send(order);
    } catch (e) {
        console.log(e)
        res.status(400).send({error: e.errors});
    }
});


module.exports = router;