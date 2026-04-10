const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");
const axios = require("axios");
require("dotenv").config();

const app = express();

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true
}));

app.use(express.json());

/* ---------------- MONGODB ---------------- */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.error("MongoDB Error:", err));

/* ---------------- HTTP SERVER ---------------- */

const server = http.createServer(app);

/* ---------------- WEBSOCKET SERVER ---------------- */

const wss = new WebSocket.Server({ server });

const clients = new Set();

wss.on("connection", (ws) => {
  console.log("Client connected 🔌");
  clients.add(ws);

  ws.on("close", () => {
    clients.delete(ws);
    console.log("Client disconnected ❌");
  });
});

/* ---------------- BROADCAST FUNCTION ---------------- */

const broadcast = (data) => {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

/* ---------------- ROUTES ---------------- */

const routes = require("./routes")(broadcast);
app.use("/api", routes);

/* ---------------- INIT POSTS ROUTE ---------------- */

const Post = require("./models/Post");

app.post("/api/posts/init", async (req, res) => {
  try {
    const existing = await Post.find();
    if (existing.length > 0) return res.json(existing);

    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    const posts = await Post.insertMany(response.data);

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- START SERVER ---------------- */

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});