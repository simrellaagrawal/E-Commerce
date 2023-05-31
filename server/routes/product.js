const router = require("express").Router();
const Product = require("../Schema/Product");
const { verifyTokenAndAuthorization } = require("./verifyToken");

//CREATE PRODUCT
router.post("/", async (req, res) => {
  const {
    productId,
    cat,
    name,
    price,
    brand,
    stock,
    type,
    rating,
    image,
    video,
    doc,
  } = req.body;
  try {
    var id = "ID" + Math.floor(Math.random() * 10000000);
    const newProduct = new Product({
      productId: id,
      cat: cat,
      name: name,
      price: price,
      brand: brand,
      stock: stock,
      type: type,
      rating: rating,
      image: image,
      video: video,
      doc: doc,
    });
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//UPDATE PRODUCT

router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product.username === req.body.username) {
      const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateProduct);
    } else {
      res.status(401).json("You can update only your product!");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product.username === req.body.username) {
      try {
        await product.deleteOne();
        res.status(200).json("product has been deleted!");
      } catch (err) {
        res.status(500).json(err.message);
      }
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//GET product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//GET ALL product
router.get("/", async (req, res) => {
  const username = req.query.user;
  const cat = req.query.cat;
  const type = req.query.type;
  const approval = req.query.approval;
  try {
    let products;
    if (cat) {
      products = await Product.find({ cat: cat, approval: true });
    } else if (type) {
      products = await Product.find({ type: type, approval: true });
    } else {
      products = await Product.find({ approval: true });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
//to approved the products
router.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json(err.message);
    }
    product.approval = true;
    await product.save();

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
module.exports = router;
