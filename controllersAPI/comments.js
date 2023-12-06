const Comment = require("../model/commentSchema");
const Post = require("../model/schema");
const HttpError = require("../helpers/httpError");

const createCommentAPI = async (req, res) => {
  try {
    const { postId } = req.params;
    const newComment = new Comment(req.body);
    await newComment.save();
    const thePost = await Post.findById(postId);
    thePost.comments.push(newComment);
    await thePost.save();
    res.status(200).json(thePost);
  } catch (error) {
    throw HttpError(404, "Not found");
  }
};

module.exports = {
  createCommentAPI,
};
