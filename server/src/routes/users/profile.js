const router = require("express").Router();
const User = require("../../models/User");
const auth = require("../../middleware/auth");

// get the current user
router.get("/", auth, async (req, res) => {
  const { _id } = req.decoded;
  const user = await User.findOne({ _id });
  const data = {
    _id,
    "first name": user.first,
    "last name": user.last,
    date: user.date,
  };
  res.status(200).send(data);
});

module.exports = router;
