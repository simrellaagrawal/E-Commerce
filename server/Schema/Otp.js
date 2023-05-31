const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema(
  {
    otp: {
      type: Number,
      required: true,
    },
    user_id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
    },
    createAt:{
      type:Date,
      default:()=>Date.now(),
      index:{expires:"10m"}
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Otp", OtpSchema);
