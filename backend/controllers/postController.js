const Post = require("../models/Post");
const fetchPosts = require("../utils/fetchPosts");

// INIT POSTS
exports.initPosts = async (req, res) => {
  try {
    const existing = await Post.find();
    if (existing.length > 0) {
      return res.json({ message: "Already initialized" });
    }
    const posts = await fetchPosts();
    await Post.insertMany(posts);
    res.json({ message: "Posts stored successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL POSTS
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE POST
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({ id: req.params.id });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
