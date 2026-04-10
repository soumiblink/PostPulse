const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");

const app = express();
app.use(cors());
app.use(express.json());

// Mongo connect
mongoose
  .connect("mongodb://127.0.0.1:27017/postpulse")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.error(err));

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Store clients
let clients = [];

wss.on("connection", (ws) => {
  console.log("Client connected");
  clients.push(ws);
  ws.on("close", () => {
    clients = clients.filter((c) => c !== ws);
  });
});

// Broadcast function
const broadcast = (data) => {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// Routes — pass broadcast to avoid circular dependency
const routes = require("./routes")(broadcast);
app.use("/api", routes);

// Init posts route
const axios = require("axios");
const Post = require("./models/Post");

app.post("/api/posts/init", async (req, res) => {
  try {
    const existing = await Post.find();
    if (existing.length > 0) return res.json(existing);
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const posts = await Post.insertMany(response.data);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
server.listen(5000, () => {
  console.log("Server + WebSocket running on http://localhost:5000");
});
