const { Router } = require("express");
const handler = require("express-async-handler");
const authMid = require("../middlewares/auth.mid");
const OrderModel = require("../models/order.model");
const OrderStatus = require("../constants/orderStatus");
const router = Router();

router.use(authMid);

router.post(
  "/create",
  handler(async (req, res) => {
    const order = req.body;
    if (order.items.length <= 0) res.status(400).send("Cart is empty!");

    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });

    const newOrder = new OrderModel({ ...order, user: req.user.id });
    await newOrder.save();
    res.send(newOrder);
  })
);

module.exports = router;
