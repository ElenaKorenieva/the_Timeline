const mongoose = require("mongoose");
const moment = require("moment/moment");
const schema = mongoose.Schema;

const commentSchema = new schema({
  comment: {
    type: String,
    require: true,
  },
  create_at: {
    type: Date,
    default: Date.now,
    get: function (create_at) {
      return moment(create_at).format("MMMM Do YY,h:mm a");
    },
  },
  post: {
    type: schema.Types.ObjectId,
    ref: "Post",
  },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
