const { Post } = require("../model/schema");
const Comment = require("../model/commentSchema");

const getMainPage = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("comments", "comment")
      .sort({ createdAt: -1 });
    res.render("index", { posts });
  } catch (error) {
    console.error(error);
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
        err: "Should be longer that 25 characters",
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect("/");
};

const getUpdatedPage = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  res.render("updatePage", { post });
};

const editPost = async (req, res) => {
  const { postId } = req.params;
  await Post.findByIdAndUpdate(postId, req.body);
  res.redirect("/");
};

module.exports = {
  getMainPage,
  createPost,
  deletePost,
  getUpdatedPage,
  editPost,
};
