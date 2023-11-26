const postsSchema = require("../model/schema");

const getMainPage = async (req, res) => {
  try {
    const posts = await postsSchema.find().sort({ createdAt: -1 });
    res.render("index", { posts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const postNewComment = async (req, res) => {
  try {
    const post = new postsSchema(req.body);
    await post.save();
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getMainPage,
  postNewComment,
};
