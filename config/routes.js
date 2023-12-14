const express = require("express");
const route = express.Router();
const funController = require("../controllers/controller");
const commentController = require("../controllers/commentController");
const postControllerAPI = require("../controllersAPI/posts");
const commentControllerAPI = require("../controllersAPI/comments");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

// Browser Routes:
route.get("/", auth.checkUserLogIn, userController.renderSigninPage);
route.post("/signup", auth.isAuth, userController.signupUser);
route.post("/login", auth.isAuth, userController.loginUser);
route.get("/logout", userController.logOut);

route.get("/home", auth.isLoggedInUser, funController.getMainPage);

route.post("/posts/:userId", funController.createPost);
route.get("/all-posts", auth.isLoggedInUser, funController.getPosts);
route.post(
  "/posts/:postId/create-comment",
  auth.isLoggedInUser,
  commentController.createComment
);
route.delete("/posts/:postId", funController.deletePost);
route.get("/posts/:postId/update-post", funController.getUpdatedPage);
route.post("/post/:postId/edit-post", funController.editPost);

// API routes
route.get("/api", postControllerAPI.getMainPageAPI);
route.post("/api", postControllerAPI.createPostAPI);
route.post(
  "/api/posts/:postId/create-comment",
  commentControllerAPI.createCommentAPI
);
route.post("/api/posts/:postId", postControllerAPI.deletePostAPI);
route.get(
  "/api/posts/:postId/update-post",
  postControllerAPI.getUpdatedPostAPI
);
route.post("/api/post/:postId/edit-post", postControllerAPI.editPostAPI);

module.exports = route;
