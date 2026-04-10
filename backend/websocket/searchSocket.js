const WebSocket = require("ws");
const Post = require("../models/Post");

const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    ws.on("message", async (message) => {
      const query = message.toString();
      const results = await Post.find({
        title: { $regex: query, $options: "i" },
      });
      ws.send(JSON.stringify(results));
    });
  });
};

module.exports = setupWebSocket;
