const router = require("express").Router();

// @route /api/user
router.use("/profile", require("./profile"));
router.use("/signup", require("./signup"));
router.use("/login", require("./login"));
router.use("/signout", require("./signout"));

module.exports = router;
