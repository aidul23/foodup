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

router.put(
  "/pay",
  handler(async (req, res) => {
    const { paymentId } = req.body;
    const order = await OrderModel.findOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });

    if (!order) {
      res.status(400).send("Order not found!");
      return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    res.send(order._id);
  })
);

router.get(
  "/newOrderForCurrentUser",
  handler(async (req, res) => {
    const order = await OrderModel.findOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });

    if (order) res.send(order);
    else res.status(400).send();
  })
);

module.exports = router;
