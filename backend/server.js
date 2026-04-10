const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const WebSocket = require("ws");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// =========================
// CONNECT MONGODB (MODERN)
// =========================
mongoose
  .connect("mongodb://127.0.0.1:27017/postpulse")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.error(err));

// =========================
// MODEL
// =========================
const Post = mongoose.model("Post", {
  userId: Number,
  id: Number,
  title: String,
  body: String,
});

// =========================
// ROUTES
// =========================

// INIT POSTS (fetch + save)
app.post("/api/posts/init", async (req, res) => {
  try {
    const existing = await Post.find();
    if (existing.length > 0) {
      return res.json(existing);
    }
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const posts = await Post.insertMany(response.data);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL POSTS
app.get("/api/posts", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

// GET SINGLE POST
app.get("/api/posts/:id", async (req, res) => {
  const post = await Post.findOne({ id: req.params.id });
  res.json(post);
});

// =========================
// START SERVER
// =========================
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// =========================
// WEBSOCKET SERVER
// =========================
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  ws.on("message", async (message) => {
    try {
      const { query } = JSON.parse(message);
      const posts = await Post.find({
        title: { $regex: query, $options: "i" },
      }).limit(10);
      ws.send(JSON.stringify(posts));
    } catch (err) {
      ws.send(JSON.stringify({ error: err.message }));
    }
  });
});
