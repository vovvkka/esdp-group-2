const express = require("express");
const Category = require("../models/Category");
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");
const Product = require("../models/Product");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const category = await Category.find().populate('category', 'title');
        res.send(category);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate('ancestors', 'title');

        if (!category) {
            return res.status(404).send({message: "Category not found!"});
        }

        res.send(category);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post("/", async (req, res) => {
    const {title, status, category} = req.body;
    const categoryData = {title, status, category};

    try {
        if (category) {
            const ancestor = await Category.findById(category);
            if (!ancestor) {
                return res.status(404).send({message: 'Parent Category not found!'});
            }
            if (ancestor.ancestors.length) {
                categoryData.ancestors = [...ancestor.ancestors, category];
            } else {
                categoryData.ancestors = [category];
            }
        }

        const newCategory = new Category(categoryData);
        await newCategory.save();

        res.send(newCategory);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

router.put("/:id", auth, permit("admin"), async (req, res) => {
    const {title, status, category} = req.body;
    const categoryData = {title, status, category};

    try {
        if(category===null){
            categoryData.ancestors = [];
        }else {
            const currentCategory = await Category.findById(category);

            if (!currentCategory) {
                return res.status(404).send({message: 'Category not found!'});
            }
        }
        if (category) {
            const ancestor = await Category.findById(category);
            if (!ancestor) {
                return res.status(404).send({message: 'Parent Category not found!'});
            }
            if (!ancestor.ancestors.length) {
                categoryData.ancestors = [category];
            } else {
                categoryData.ancestors = [...ancestor.ancestors, category];
            }
        }
        const editedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            categoryData
        );
        res.send(editedCategory);
    } catch (e) {
        console.log(e);
        res.status(400).send({error: e.errors});
    }
});

router.delete("/:id", auth, permit("admin"), async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        return res.status(404).send({error: "Category not found!"});
    }

    try {
        const categoryProducts = await Product.find({category});

        for (const product of categoryProducts) {
            if (category.ancestors.length) {
                await Product.updateOne(product, {category: category.ancestors[category.ancestors.length - 1]});
            } else {
                await Product.deleteOne(product);
            }
        }
        const descendants = await Category.find({ancestors: {$in: [category]}});
        for (const category of descendants) {
            await Category.updateOne(category, {ancestors: category.ancestors.slice(1)});
        }
        const children = await Category.find({category: category});
        for (const item of children) {
            await Category.updateOne(item, {category: category.category});
        }
        await Category.deleteOne({_id: req.params.id});

        res.send(category);
    } catch (e) {
        res.status(500);
    }
});

module.exports = router;
