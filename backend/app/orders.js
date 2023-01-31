const express = require("express");
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");
const Order = require("../models/Order");
const Product = require("../models/Product");
const router = express.Router();

router.get("/", auth, permit("admin"), async (req, res) => {
   try {
      const { page, perPage } = req.query;
      const query = {};
      const options = {
         populate: { path: "order.product", select: "title" },
         sort: { orderNumber: -1 },
         page: parseInt(page) || 1,
         limit: parseInt(perPage) || 10,
      };

      if (req.query.status === "active") {
         query.status = { $ne: "Закрыт" };
      } else if (req.query.status === "closed") {
         query.status = "Закрыт";
      }

      const orders = await Order.paginate(query, options);

      res.send(orders);
   } catch (e) {
      res.status(500).send(e);
   }
});

router.get("/:id", auth, permit("admin"), async (req, res) => {
   try {
      const order = await Order.findById(req.params.id).populate(
         "order.product",
         "title price"
      );

      if (!order) {
         return res.status(404).send({ message: "Order not found!" });
      }

      res.send(order);
   } catch (e) {
      res.status(400).send(e);
   }
});

router.post("/", async (req, res) => {
   try {
      const { customer, phone, order, address, comment } = req.body;
   if (!customer || !phone || !address || !order.length) {
      return res.status(400).send({ error: "Data not valid" });
   }

   const orderWithPrice = await Promise.all(order.map(async i=> {
      const item = await Product.findById(i.product);
      if(i.quantity>item.amount) throw({error: 'Data not valid'});
       return {...i, price: item.price}
   }));
      const orderData = {
      customer,
      phone,
      address,
      order:orderWithPrice,
      comment,
   };
      const orderNew = new Order(orderData);
      await orderNew.save();
      await  res.send(orderNew);
   } catch (e) {
      console.log(e);
      res.status(400).send(e);
   }
});

router.put("/:id/changeStatus", auth, permit("admin"), async (req, res) => {
   try {
      const { status } = req.body;

      const order = await Order.findById(req.params.id);

      if (!order) return res.status(404).send({ message: "Заказ не найден!" });

      if (!req.body.status)
         return res.status(400).send({ message: "Выберите статус." });

      if (order.status === "Закрыт")
         return res.status(400).send({
            message: "Вы не можете изменить статус закрытого заказа.",
         });

      if (order.status === status)
         return res.status(400).send({ message: "Статус не изменился." });

      order.status = status;
      await order.save();

      res.send(order);
   } catch (e) {
      res.status(400).send({ error: e.errors });
   }
});

module.exports = router;
