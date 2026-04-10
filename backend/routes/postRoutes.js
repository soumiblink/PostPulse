const express = require("express");
const router = express.Router();
const { initPosts, getAllPosts, getPostById } = require("../controllers/postController");

router.get("/init", initPosts);
router.get("/", getAllPosts);
router.get("/:id", getPostById);

module.exports = router;
