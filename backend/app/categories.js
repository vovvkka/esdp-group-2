const express = require("express");
const Category = require("../models/Category");
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");
const Product = require("../models/Product");
const SubCategory = require("../models/SubCategory");
const router = express.Router();

router.get("/", async (req, res) => {
   try {
      const category = await Category.find();
      res.send(category);
   } catch (e) {
      res.status(400).send(e);
   }
});

router.get("/:id", async (req, res) => {
   try {
      const category = await Category.findById(req.params.id);

      if (!category) {
         return res.status(404).send({ message: "Category not found!" });
      }

      res.send(category);
   } catch (e) {
      res.status(400).send(e);
   }
});

router.post("/", auth, permit("admin"), async (req, res) => {
   const { title, status, nds, nspCash, nspNotCash } = req.body;
   const categoryData = { title, status, nds, nspCash, nspNotCash };

   try {
      const category = new Category(categoryData);
      await category.save();

      res.send(category);
   } catch (e) {
      res.status(400).send({ error: e.errors });
   }
});

router.post("/subcategory", auth, permit("admin"), async (req, res) => {
   const { category, title, status, nds, nspCash, nspNotCash } = req.body;
   const subCategoryData = {
      category,
      title,
      status,
      nds,
      nspCash,
      nspNotCash,
   };

   try {
      const subCategory = new SubCategory(subCategoryData);
      await subCategory.save();

      res.send(subCategory);
   } catch (e) {
      res.status(400).send({ error: e.errors });
   }
});

router.put("/:id", auth, permit("admin"), async (req, res) => {
   const { title, status, nds, nspCash, nspNotCash } = req.body;
   const categoryData = { title, status, nds, nspCash, nspNotCash };

   try {
      const category = await Category.findByIdAndUpdate(
         req.params.id,
         categoryData
      );
      res.send(category);
   } catch (e) {
      res.status(400).send({ error: e.errors });
   }
});

router.delete("/:id", auth, permit("admin"), async (req, res) => {
   const category = await Category.findById(req.params.id);

   if (!category) {
      return res.status(404).send({ error: "Photo not found!" });
   }

   try {
      const categoryProducts = await Product.find({ category });

      for (const product of categoryProducts) {
         await Product.updateOne(product, { category: null });
      }

      await Category.deleteOne({ _id: req.params.id });

      res.send(category);
   } catch (e) {
      res.status(500);
   }
});

module.exports = router;
