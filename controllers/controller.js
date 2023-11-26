const { Post } = require("../model/schema");

const getMainPage = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.render("index", { posts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const postNewComment = async (req, res) => {
  try {
    if (req.body.post.length >= 25) {
      const post = new Post(req.body);
      await post.save();
      res.redirect("/");
    } else {
      console.log("The post length must be at least 25 characters long");
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getMainPage,
  postNewComment,
};
