const Comment = require("../model/commentSchema");
const Post = require("../model/schema");

const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const newComment = new Comment(req.body);
    await newComment.save();
    const thePost = await Post.findById(postId);
    thePost.comments.push(newComment);
    await thePost.save();
    res.redirect("/all-posts");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createComment,
};
