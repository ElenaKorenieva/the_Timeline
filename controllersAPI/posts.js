const Post = require("../model/schema");
const Comment = require("../model/commentSchema");
const HttpError = require("../helpers/httpError");

const getMainPageAPI = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("comments", "comment")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    throw HttpError(500, "Internal Server Error");
  }
};

const createPostAPI = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    throw HttpError(500, "Internal Server Error");
  }
};

const deletePostAPI = async (req, res) => {
  try {
    const { postId } = req.params;
    await Post.findByIdAndDelete(postId);
    res.status(200).json({
      message: "Post deleted",
    });
  } catch (error) {
    throw HttpError(404, "Not found");
  }
};

const getUpdatedPostAPI = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    res.status(200).json(post);
  } catch (error) {
    throw HttpError(404, "Not found");
  }
};

const editPostAPI = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndUpdate(postId, req.body);
    res.status(200).json(post);
  } catch (error) {
    throw HttpError(404, "Not found");
  }
};

module.exports = {
  getMainPageAPI,
  createPostAPI,
  deletePostAPI,
  getUpdatedPostAPI,
  editPostAPI,
};
