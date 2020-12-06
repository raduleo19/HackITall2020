var express = require('express');
var router = express.Router();
const Story = require("../../models/story");

router.post("/", async (req, res) => {
    const story = new Story(req.body);
    await story.save();
    res.send("Succes");
});

router.get("/", async (req, res) => {
    const stories = await Story.find();
    res.send(stories);
});

router.get("/:title", async (req, res) => {
    const story = await Story.findOne({title:req.params.title});
    story.likes+=1;
    await story.save();
    res.send("Succes");
});

module.exports = router