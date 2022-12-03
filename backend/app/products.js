const express = require('express');
const Product = require('../models/Product');
const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');
const path = require("path");
const multer = require("multer");
const config = require("../config");
const {nanoid} = require("nanoid");
const User = require("../models/User");

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
        const token = req.get('Authorization');
        const user = await User.findOne({token});

        const {page, perPage} = req.query;
        const query = {};
        const options = {
            populate: {path: 'category', select: 'title'},
            page: parseInt(page) || 1,
            limit: parseInt(perPage) || 30
        };

        if (!user || user.role === 'cashier') {
            query.status = "Активный"
            if (!user) {
                options.select = "category title description price amount unit image"
            }
        }

        if (req.query.category && req.query.key) {
            isNaN(+req.query.key) ? query.title = {
                $regex: req.query.key,
                $options: 'i'
            } : query.barcode = {$regex: +req.query.key, $options: 'i'};
            query.category = req.query.category;
        }

        if (req.query.category) {
            query.category = req.query.category;
        }

        if (req.query.key) {
            isNaN(+req.query.key) ? query.title = {
                $regex: req.query.key,
                $options: 'i'
            } : query.barcode = {$regex: +req.query.key, $options: 'i'};
        }

        const products = await Product.paginate(query, options);
        res.send(products);
    } catch (e) {
        res.status(400).send(e);
    }
});


router.get('/:id', async (req, res) => {
    try {
        const token = req.get('Authorization');
        const user = await User.findOne({token});

        let product;

        if (user) {
            product = await Product.findById(req.params.id).populate({path: 'category', select: 'title'});
        } else {
            product = await Product.findById(req.params.id).select('category title description price amount unit image').populate({
                path: 'category',
                select: 'title'
            });
        }

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

router.put('/:id', auth, permit('admin'), upload.single('image'), async (req, res) => {
    const {category, title, barcode, priceType, price, amount, unit, status, purchasePrice} = req.body;
    const description = req.body.description;

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
    };

    if (req.file) {
        productData.image = 'uploads/' + req.file.filename;
    }

    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404).send({message: 'Product not found!'});
        }

        const updateProduct = await Product
            .findByIdAndUpdate(req.params.id, productData);

        res.send(updateProduct);
    } catch {
        res.sendStatus(500);
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