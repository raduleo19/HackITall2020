var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {
    res.send("[{'prajitura cu mere', '2'},{'juventus pierde', '1'},{'sebi e fraier', '3'}]");
});
module.exports = router