// const router = require("express").Router();
// const Category = require("../Schema/Category");

// //CREATE
// router.post("/", async (req, res) => {
//   const newCat = new Category(req.body);
//   try {
//     const savedCat = await newCat.save();
//     res.status(200).json(savedCat);
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// });
// //GET ALL
// router.get("/", async (req, res) => {
//   const newCat = new Category(req.body);
//   try {
//     const cats = await Category.find();
//     res.status(200).json(cats);
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// })
// module.exports = router;
