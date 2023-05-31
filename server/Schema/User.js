const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    days: {
      type: Number,
      default: 0,
    },
    verificationExpires: {
      type: Date,
      default: () => new Date(+new Date() + 10 * 60 * 1000),
    },
  },
  { timestamps: true }
);

UserSchema.index(
  { verificationExpries: 1 },
  {
    expireAfterSeconds: 0,
    partialFilterExpression: { registrationConfirmed: false },
  }
);

module.exports = mongoose.model("User", UserSchema);
