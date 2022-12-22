const express = require('express');
const Product = require('../models/Product');
const Category = require('../models/Category');
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
        let descendants;
        const {page, perPage} = req.query;
        const query = {};
        if (req.query.category) {
            descendants = await Category.find({ancestors: {$in: [req.query.category]}});
        }
        const options = {
            populate: {
                path: 'category', select: 'title ancestors',
                populate: {
                    path: 'ancestors',
                    select: 'title',
                }
            },
            page: parseInt(page) || 1,
            limit: parseInt(perPage) || 30
        };

        if (!user || user.role === 'cashier') {
            query.status = "Активный";
            query.amount = {$gte: 1};
            if (!user) {
                options.select = "category title description price amount unit image";
            }
        }

        if (req.query.category && req.query.key) {
            isNaN(+req.query.key) ? query.title = {
                $regex: req.query.key,
                $options: 'i'
            } : query.barcode = {$regex: +req.query.key, $options: 'i'};
            if (descendants.length) {
                query.category = {$in: descendants};
            } else {
                query.category = req.query.category;
            }
        }

        if (req.query.category) {
            if (descendants.length) {
                query.category = {$in: descendants};
            } else {
                query.category = req.query.category;
            }
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
router.get('/search', async (req, res) => {
    try {
        const query = {};
        if (req.query.key) {
            isNaN(+req.query.key) ? query.title = {
                $regex: req.query.key,
                $options: 'i'
            } : null
        }
        const products = await Product.find(query).limit(5);
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
            product = await Product.findById(req.params.id).populate({
                path: 'category',
                select: 'title'
            });
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

router.post('/', auth, permit('admin'), upload.array('image', 5), async (req, res) => {
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
    if (req.files) {
        productData.image = req.files.map(i => 'uploads/' + i.filename);
    }
    try {
        const products = new Product(productData);
        await products.save();
        res.send(products);
    } catch (e) {

        res.status(400).send(e);
    }
});

router.put('/:id', auth, permit('admin'), upload.array('image', 5), async (req, res) => {
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
    if (req.files) {
        productData.image = req.files.map(i => 'uploads/' + i.filename);
    }

    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).send({message: 'Product not found!'});
        }

        const updateProduct = await Product
            .findByIdAndUpdate(req.params.id, productData);

        res.send(updateProduct);
    } catch (e) {
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