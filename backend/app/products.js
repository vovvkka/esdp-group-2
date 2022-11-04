const express = require('express');
const Product = require('../models/Product');
const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');
const path = require("path");
const multer = require("multer");
const config = require("nodemon/lib/config");
const {nanoid} = require("nanoid");

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

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();

        res.send(products);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).send({message: 'Product not found!'})
        }

        res.send(product);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/', auth, permit('admin'), upload.single('image'), async (req, res) => {
    const {category, title, barcode, priceType, price, amount, unit, status, purchasePrice} = req.body;
    const description = req.body.description;
    const image = req.file ? 'uploads/' + req.file.filename : null;

    if (!category || !title || !barcode || !priceType || !price || !amount || !unit || !status || !purchasePrice) {
        return res.status(400).send({message: 'Data not valid!'});
    }

    const productData = {
        category,
        title,
        barcode,
        priceType,
        price,
        amount,
        unit,
        status,
        purchasePrice,
        description: description || null,
        image: image || null,
    };

    try {
        const products = new Product(productData);

        await products.save();

        res.send(products);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).send({message: 'Product not found!'});
        }

        await Product.deleteOne(product);

        res.send(product);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;