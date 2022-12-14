const express = require('express');
const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');
const path = require("path");
const multer = require("multer");
const config = require("../config");
const {nanoid} = require("nanoid");
const Customer = require("../models/Customer");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

router.get('/', auth, async (req, res) => {
    const {page, perPage} = req.query;

    try {
        const options = {
            page: parseInt(page) || 1,
            limit: parseInt(perPage) || 30
        };

        const customers = await Customer.paginate({}, options);
        res.send(customers);
    } catch (e) {
        res.status(500).send(e);
    }
});


router.get('/:id',auth,permit('admin'), async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).send({message: 'Customer not found!'})
        }

        res.send(customer);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/', auth, permit('admin'), upload.single('image'), async (req, res) => {
    const {name, surname, discount, phone, email, address} = req.body;
    const image = req.file ? 'uploads/' + req.file.filename : null;

    if (!name || !surname || !discount) {
        return res.status(400).send({message: 'Data not valid!'});
    }

    const customerData = {
        name,
        surname,
        discount,
        phone,
        email,
        address,
        image,
    };
    try {
        const customer = new Customer(customerData);
        await customer.save();
        res.send(customer);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.put('/:id', auth, permit('admin'), upload.single('image'), async (req, res) => {
    const {name, discount, surname, email, phone, address} = req.body;

    if (!name || !surname || !discount) {
        return res.status(400).send({message: 'Data not valid!'});
    }

    const customerData = {
        name,
        surname,
        discount,
        phone,
        email,
        address,
    };

    if (req.file) {
        customerData.image = 'uploads/' + req.file.filename;
    }

    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            res.status(404).send({message: 'Customer not found!'});
        }

        const updatedCustomer = await Customer
            .findByIdAndUpdate(req.params.id, customerData, { runValidators: true });

        res.send(updatedCustomer);
    } catch(e) {
        res.status(400).send(e);

    }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).send({message: 'Product not found!'});
        }
        await Customer.deleteOne(customer);
        res.send(customer);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;