const router = require("express").Router();
const User = require("../../models/User");

router.get('/', async (req, res) => {
    const users = await User.find();
    const tags = users.map(a => a.favouriteTags);

    // var freq = {};
    // tags.forEach(element => {
    //     if (!freq[element]) {
    //         freq[element] = 0;
    //     }
    //     freq[element] += 1;
    // });

    // var items = Object.keys(freq).map(function(key) {
    //     return [key, freq[key]];
    //   });

    // items.sort(function(first, second) {
    //     return second[1] - first[1];
    // });

    res.send(tags.slice(0, 6));
});

module.exports = router;