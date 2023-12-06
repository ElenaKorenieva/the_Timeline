const Post = require("../model/schema");
const Comment = require("../model/commentSchema");

const getMainPage = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("comments", "comment")
      .sort({ createdAt: -1 });
    res.render("index", { posts, err: "" });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

const createPost = async (req, res) => {
  try {
    if (req.body.post.length >= 25) {
      const post = new Post(req.body);
      await post.save();
      res.redirect("/");
    } else {
      const posts = await Post.find({}).sort({ createdAt: -1 });
      res.render("index", {
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
    res.redirect("/");
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
    res.redirect("/");
  } catch (err) {
    res.status(404).send("Not found");
  }
};

module.exports = {
  getMainPage,
  createPost,
  deletePost,
  getUpdatedPage,
  editPost,
};
