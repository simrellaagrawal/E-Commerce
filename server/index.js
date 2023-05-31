const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const adminRoute = require("./routes/admin");
const userRoute = require("./routes/user");
const payRoute = require("./routes/payment");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "intern",
  })
  .then(console.log("MongoDB connection Successfull"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Files have been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/admin", adminRoute);
app.use("/api/users", userRoute);
app.use("/api/payment", payRoute);

const PORT = process.env.PORT || "5000";
app.listen(PORT, () => {
  console.log("connected");
});
