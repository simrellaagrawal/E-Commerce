const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    // _userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    cat: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      // required: false,
    },
    video: {
      type: String,
      // required: true,
      default: "",
    },
    approval: {
      type: Boolean,
      default: false,
    },
    doc: {
      type: String,
      default: "",

      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
