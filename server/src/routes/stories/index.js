var express = require('express');
var router = express.Router();
const Story = require("../../models/story");
const User = require("../../models/User");

router.post("/", async (req, res) => {
    const story = new Story(req.body);
    await story.save();
    res.send("Succes");
});

router.get("/", async (req, res) => {
    const stories = await Story.find();
    res.send(stories);
});

router.get("/:title/:email", async (req, res) => {
    const story = await Story.findOne({title:req.params.title});
    const user = await User.findOne({email:req.params.email});
    if (!user.likedStories.includes(story.title)) {
        story.likes+=1;
        user.likedStories.push(story.title);
        story.tags.forEach(element => {
            user.favouriteTags.push(element);
        });
    } 
    else {
        story.likes-=1;
        user.likedStories.remove(story.title);
        // story.tags.forEach(element => {
        //     user.favouriteTags.remove(element)
        // });
    }
    
    await story.save();
    await user.save();
    res.send("Succes");
});

module.exports = router