const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  userName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  // posts: [
  //   {
  //     type: schema.Types.ObjectId,
  //     ref: "Post",
  //   },
  // ],
});

module.exports = mongoose.model("user", userSchema);
