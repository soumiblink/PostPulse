const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId: Number,
  id: Number,
  title: String,
  body: String,
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);
