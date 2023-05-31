const User = require("../Schema/User");
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");
const router = require("express").Router();

//UPDATEING USER BY USER
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.user.id === req.params.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(403).json(err);
    }
  }
});
//DELETEING USER ACCOUNT BY USER
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json("Your account has been deleted!!");
  } catch (err) {
    res.status(403).json(err.message);
  }
});

module.exports = router;
