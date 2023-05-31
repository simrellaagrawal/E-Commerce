const router = require("express").Router();
const Order = require("../Schema/Order");

//CREATE POST
router.post("/", async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;
  const newOrder = new Order.create({
    shippingInfo,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    _userId,
  });
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//DELETE order
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    try {
      await order.deleteOne();
      res.status(200).json("order has been deleted!");
    } catch (err) {
      res.status(500).json(err.message);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//GET order
// router.get("/:id", async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     res.status(200).json(order);
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// });
// //GET ALL order
// router.get("/", async (req, res) => {
//   const username = req.query.user;
//   const orderCat = req.query.orderCat;
//   const type = req.query.type;
//   try {
//     let orders;
//     if (username) {
//       orders = await Order.find({ username: username });
//     } else if (orderCat) {
//       orders = await Order.find({ orderCat: orderCat });
//     } else if (type) {
//       orders = await Order.find({ type: type });
//     } else {
//       orders = await Order.find();
//     }
//     // const orders = await order.find();
//     res.status(200).json(orders);
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// });

module.exports = router;
