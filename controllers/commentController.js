const Comment = require("../model/commentSchema");
const { Post } = require("../model/schema");

const createComment = async (req, res) => {
  const { postId } = req.params;
  const newComment = new Comment(req.body);
  await newComment.save();
  const thePost = await Post.findById(postId);
  thePost.comments.push(newComment);
  await thePost.save();
  res.redirect("/");
};

module.exports = {
  createComment,
};
