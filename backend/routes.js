const express = require("express");
const Post = require("./models/Post");

module.exports = (broadcast) => {
  const router = express.Router();

  // CREATE
  router.post("/posts", async (req, res) => {
    try {
      const { title, body } = req.body;
      const newPost = new Post({ userId: 999, id: Date.now(), title, body });
      await newPost.save();
      broadcast({ type: "NEW_POST", post: newPost });
      res.json(newPost);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // UPDATE
  router.put("/posts/:id", async (req, res) => {
    try {
      const { title, body } = req.body;
      const updated = await Post.findOneAndUpdate(
        { id: req.params.id },
        { title, body },
        { new: true }
      );
      broadcast({ type: "UPDATE_POST", post: updated });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE
  router.delete("/posts/:id", async (req, res) => {
    try {
      await Post.findOneAndDelete({ id: req.params.id });
      broadcast({ type: "DELETE_POST", id: req.params.id });
      res.json({ message: "Deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET ALL
  router.get("/posts", async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET ONE
  router.get("/posts/:id", async (req, res) => {
    try {
      const post = await Post.findOne({ id: req.params.id });
      if (!post) return res.status(404).json({ error: "Not found" });
      res.json(post);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
