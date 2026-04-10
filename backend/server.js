const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const postRoutes = require("./routes/postRoutes");
const setupWebSocket = require("./websocket/searchSocket");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/posts", postRoutes);

const server = app.listen(process.env.PORT || 5000, () => {
  console.log("Server running 🚀");
});

setupWebSocket(server);
