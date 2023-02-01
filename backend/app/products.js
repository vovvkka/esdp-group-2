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
        const sort={};
        if(req.query.price) {
            sort.price=req.query.price;
        }
        if(req.query.date) {
            sort.updatedAt=req.query.date;
        }
        const options = {
            populate: {
                path: 'category', select: 'title ancestors status',
                populate: {
                    path: 'ancestors',
                    select: 'title status',
                }
            },
            page: parseInt(page) || 1,
            limit: parseInt(perPage) || 15,
            sort:sort
        };

        if (!user || user.role === 'cashier' || req.query.store) {
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
                query.category = {$in:[req.query.category,...descendants]};
            } else {
                query.category = req.query.category;
            }
        }

        if (req.query.category) {
            if (descendants.length) {
                query.category = {$in:[req.query.category,...descendants]};
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
        if(req.query.store){
            const arr = products.docs.filter(i=> {
                if(i.category.status === 'Активный'){
                    if(i.category.ancestors.length){
                        const status = i.category.ancestors.reduce((acc, value) => {
                            if(value.status === 'Неактивный'){
                                return acc+1;
                            }else{
                                return acc;
                            }
                        }, 0);
                        if(status===0){
                            return i;
                        }
                    }else {
                        return i;
                    }
                }
            });
            return res.send({...products,docs:arr});
        }
        res.send(products);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/main', async (req, res) => {
    try {
        const query = {};
        let descendants;
        if (req.query.category) {
            descendants = await Category.find({ancestors: {$in: [req.query.category]}});
        }
        if (req.query.category) {
            if (descendants.length) {
                const index = descendants.map(function(e) { return e.status; }).indexOf('Неактивный');
                if(index>0) {
                    query.category = {$in: [req.query.category,...descendants.slice(0, index)]};
                }else{
                    query.category = {$in: [req.query.category,...descendants]};
                }
            } else {
                const category = await Category.findById(req.query.category);
                if(category.status === "Активный") {
                    query.category = req.query.category;
                }
            }
        }
        query.status = "Активный";
        query.amount = {$gte: 1};
        const products = await Product.find(query).sort({updatedAt:'desc'})
            .select("category title description price amount unit image").populate({
                path: 'category',
                select: 'status ancestors',
                populate : {
                    path : 'ancestors',
                    select: 'status'
                }}).limit(15);

        let arr;
        if(!req.query.category){
            arr = products.filter(i=> {
                if(i.category.status === 'Активный'){
                    if(i.category.ancestors.length){
                        const status = i.category.ancestors.reduce((acc, value) => {
                            if(value.status === 'Неактивный'){
                                return acc+1;

                            }else{
                                return acc;
                            }
                        }, 0);
                        if(status===0){
                            return i;
                        }
                    }else {
                        return i;
                    }
                }
            });
            return res.send(arr);
        }else{
            return res.send(products);
        }
    } catch (e) {
        res.status(400).send(e);
    }
});
router.get('/search', async (req, res) => {
    try {
        const query = {};
        if (req.query.key) {
            query.title = {
                $regex: req.query.key,
                $options: 'i'
            }
        }
        query.status = "Активный";
        query.amount = {$gte: 1};
        const products = await Product.find(query).select("category title description image").populate({
            path: 'category',
            select: 'status ancestors',
            populate : {
                path : 'ancestors',
                select: 'status'
            }
        }).limit(5);
        let arr;
        if(products.length) {
            arr = products.filter(i=> {
                if(i.category.status === 'Активный'){
                    if(i.category.ancestors.length){
                        const status = i.category.ancestors.reduce((acc, value) => {
                            if(value.status === 'Неактивный'){
                                return acc+1;

                            }else{
                                return acc;
                            }
                        }, 0);
                        if(status===0){
                            return i;
                        }
                    }else {
                        return i;
                    }
                }
            });
            return res.send(arr);
        }else {
            return res.send(products);
        }
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
        console.log(products);
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
    if (req.files.length) {
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