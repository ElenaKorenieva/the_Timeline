const mongoose = require("mongoose");
const moment = require("moment");
const schema = mongoose.Schema;

const postSchema = new schema(
  {
    owner: {
      type: schema.Types.ObjectId,
      ref: "user",
    },
    post: {
      type: String,
      required: true,
      minLength: 25,
    },
    getDate: {
      type: Date,
      default: Date.now,
      get: function (createdAt) {
        return moment(createdAt).format("MMMM Do YYYY, h:mm:ss a");
      },
    },
    comments: [
      {
        type: schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
