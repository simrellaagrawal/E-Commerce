const User = require("../Schema/User");
const Admin = require("../Schema/Admin");
const Product = require("../Schema/Product");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdminAuthorization,
} = require("./verifyToken");
const router = require("express").Router();

//GET USER
router.get("/find/:id", verifyTokenAndAdminAuthorization, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
//GET ALL USERS
router.get("/", async (req, res) => {
  const query = req.body.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

//GET USER STATS(total number of user per month)
router.get("/stats", verifyTokenAndAdminAuthorization, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      {
        $match: { createdAt: { $gte: lastYear } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETING USER ACCOUNT BY ADMIN
router.delete("/:id", verifyTokenAndAdminAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Your account has been deleted!!");
  } catch (err) {
    res.status(403).json(err.message);
  }
});

//DELETE PRODUCTS
router.delete("/:id", verifyTokenAndAdminAuthorization, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    try {
      await product.deleteOne();
      res.status(200).json("product has been deleted!");
    } catch (err) {
      res.status(500).json(err.message);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
