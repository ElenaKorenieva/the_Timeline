const express = require("express");
const route = express.Router();
const funController = require("../controllers/controller");
const commentController = require("../controllers/commentController");

route.get("/", funController.getMainPage);
route.post("/", funController.createPost);
route.post("/posts/:postId/create-comment", commentController.createComment);
route.delete("/posts/:postId", funController.deletePost);
route.get("/posts/:postId/update-post", funController.getUpdatedPage);
route.post("/post/:postId/edit-post", funController.editPost);

module.exports = route;
