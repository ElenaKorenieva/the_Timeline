const Post = require("../model/schema");
const Comment = require("../model/commentSchema");
const User = require("../model/userModel");

// const getAllPosts = async (req, res) => {
//   try {
//     const posts = await Post.find({})
//       .populate("owner")
//       .populate("comments", "comment")
//       .sort({ createdAt: -1 });
//     console.log("posts", posts);
//     res.render("index", { title: "Home", posts, err: "" });
//   } catch (err) {
//     res.status(500).send("Internal Server Error");
//   }
// };

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("owner", "userName email")
      .populate("comments", "comment")
      .sort({ createdAt: -1 });
    console.log("posts", posts);
    res.render("allPosts", { title: "allPosts", posts, err: "" });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

const getMainPage = (req, res) => {
  res.render("index");
};

const createPost = async (req, res) => {
  console.log(req.params);
  try {
    if (req.body.post.length >= 25) {
      const newPost = {
        post: req.body.post,
        owner: req.params.userId,
      };
      const post = new Post(newPost);
      await post.save();
      res.redirect("/home");
    } else {
      const posts = await Post.find({}).sort({ createdAt: -1 });
      res.render("index", {
        title: "Home",
        posts,
        err: "Should be longer than 25 characters",
      });
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    await Post.findByIdAndDelete(postId);
    res.redirect("/home");
  } catch (err) {
    res.status(404).send("Not found");
  }
};

const getUpdatedPage = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    res.render("updatePage", { post });
  } catch (err) {
    res.status(404).send("Not found");
  }
};

const editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndUpdate(postId, req.body);
    res.redirect("/all-posts");
  } catch (err) {
    res.status(404).send("Not found");
  }
};

module.exports = {
  getMainPage,
  getPosts,
  createPost,
  backToHomePage,
  deletePost,
  getUpdatedPage,
  editPost,
};
