const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
    title: String,
    description: String,
    author: String,
    tags: [String],
    likes: Number,
    img: String,
  });

module.exports = mongoose.model("Story", StorySchema);