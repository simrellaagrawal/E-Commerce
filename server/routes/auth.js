const User = require("../Schema/User");
const Admin = require("../Schema/Admin");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const Otp = require("../Schema/Otp");
const jwt = require("jsonwebtoken");

dotenv.config();

const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

//verify
router.post("/verify", (req, res) => {
  const otp = req.body.otp;
  const user_id = req.body.id;
  //matcing otps of user and database
  if (!otp) {
    res.status(422).json({ error: "Please fill the OTP" });
  }
  
  try {
    Otp.findOne({ user_id: user_id, otp: otp }, (err) => {
      if (err) {
        console.log(err);
      } else {
        const accessToken = jwt.sign(
          {
            id: user_id,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        res.status(200).json({ accessToken });
      }
    });
  } catch (err) {
    res.status(500).json(err.message)
  }
});

// USER_REGISTRATION
router.post("/register", async (req, res) => {
  const { username, email, phone } = req.body;

  if (!username || !phone) {
    res.status(422).json({ error: "Please fill the details" });
  }
  try {
    const userExist = await User.findOne({ phone: phone });
    if (userExist) {
      return res.status(422).json({ error: "Phone number already been used" });
    }

    const newUser = new User({
      phone: phone,
      username: username,
    });i
    newUser.save(async (err, data) => {
      if (err) {
        res.status(400).json(err.message);
      } else {
        const number = req.body.phone;
        //geterating random number
        let randomN = Math.floor(Math.random() * 90000) + 10000;
        //sending random number to user number using twilio
        const otp = await Otp.create({
          otp: randomN,
          user_id: data._id,
        });
        client.messages
          .create({ body: randomN, from: "+13855267571", to: number })
          .then(() => {
            console.log("send success fully");
            res.status(200).json("verify");
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//USER_LOGIN
router.post("/login", async (req, res) => {
  const { username, phone } = req.body;
  if (!phone) {
    res.status(422).json({ error: "Please fill the details" });
  }
  try {
    User.findOne({ phone: phone }, async (err, user) => {
      if (err) {
        res.status(400).json(err.message);
      } else {
        const number = req.body.phone;
        //geterating random number
        let randomN = Math.floor(Math.random() * 90000) + 10000;
        //sending random number to user number using twilio
        const otp = await Otp.create({
          otp: randomN,
          user_id: user._id,
        });
        client.messages
          .create({ body: randomN, from: "+13855267571", to: number })
          .then(() => {
            console.log("send successfully");
            res.status(200).json("verify");
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      }
    });
  } catch (err) {
    console.log(err.message);
  }
});

//ADMIN_LOGIN
router.post("/admin-login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(422).json({ error: "Please fill the details" });
    }
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res.status(400).json("email is incorrect!");
    }
    const validate = await bcrypt.compare(password, admin.password);
    if (!validate) {
      return res.status(400).json("Incorrect Password");
    } else {
      //generate access token
      const accessToken = jwt.sign(
        {
          id: admin._id,
          isAdmin: admin.isAdmin,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      res.status(200).json({ accessToken });

      // res.status(200).json("logged in");
    }
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
