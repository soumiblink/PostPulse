const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");
const axios = require("axios");
require("dotenv").config();

const app = express();

/* ---------------- CORS ---------------- */

const allowedOrigins = [
  "http://localhost:5173",
  "https://post-pulse-cyan.vercel.app",
  process.env.CLIENT_URL?.replace(/\/$/, ""),
].filter(Boolean).filter((v, i, arr) => arr.indexOf(v) === i);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true,
}));

app.use(express.json());

/* ---------------- MONGODB ---------------- */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.error("MongoDB Error:", err.message));

/* ---------------- HTTP SERVER ---------------- */

const server = http.createServer(app);

/* ---------------- WEBSOCKET ---------------- */

const wss = new WebSocket.Server({ server });
const clients = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);
  ws.on("close", () => clients.delete(ws));
});

const broadcast = (data) => {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

/* ---------------- HEALTH CHECK ---------------- */

app.get("/", (req, res) => {
  const dbState = mongoose.connection.readyState;
  res.json({ status: "ok", db: dbState === 1 ? "connected" : "disconnected" });
});

/* ---------------- DB GUARD ---------------- */

app.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: "Database not connected yet, please retry" });
  }
  next();
});

/* ---------------- ROUTES ---------------- */

const routes = require("./routes")(broadcast);
app.use("/api", routes);

/* ---------------- INIT POSTS ---------------- */

const Post = require("./models/Post");

app.post("/api/posts/init", async (req, res) => {
  try {
    const existing = await Post.find();
    if (existing.length > 0) return res.json(existing);

    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");

    const mapped = response.data.map(({ userId, id, title, body }) => ({
      userId,
      id,
      title,
      body,
    }));

    const posts = await Post.insertMany(mapped, { ordered: false });
    res.json(posts);
  } catch (err) {
    console.error("Init error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- START ---------------- */

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
