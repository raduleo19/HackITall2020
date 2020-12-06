const router = require("express").Router();
const User = require("../../models/User");

router.get('/', async (req, res) => {
    const users = await User.find();
    const tags = users.map(a => a.favouriteTags);

    var freq = {};
    for (var i = 0; i < tags.length; i++) {
        var tag = tags[i];
        if (freq[tag]) {
           freq[tag]++;
        } else {
           freq[tag] = 1;
        }
    }

    var items = Object.keys(freq).map(function(key) {
        return [key, dict[key]];
      });

    items.sort(function(first, second) {
        return second[1] - first[1];
    });

    res.send(items.slice(0, 5));
});

module.exports = router;