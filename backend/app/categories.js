const express = require('express');
const Category = require("../models/Category");
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const category = await Category.find();
        res.send(category);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).send({message: 'Category not found!'})
        }

        res.send(category);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.put('/:id', auth, permit('admin'), async (req, res) => {
    const {title, status} = req.body;
    const categoryData = {title, status};

    try {
        const category = await Category.findByIdAndUpdate(req.params.id,categoryData);
        res.send(category);

    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

router.post('/', auth, permit('admin'), async (req, res) => {
    const {title, status} = req.body;
    const categoryData = {title, status};

    try {
        const category = new Category(categoryData);
        await category.save();

        res.send(category);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        return res.status(404).send({error: 'Photo not found!'});
    }

    try {
        await Category.deleteOne({_id: req.params.id});

        res.send('Delete successful!');
    } catch (e) {
        res.status(500);
    }
});

module.exports = router;