const mongoose = require("mongoose");
const moment = require("moment");
const schema = mongoose.Schema;

function generateRandomNumber() {
  return Math.floor(Math.random() * 1000);
}

const postSchema = new schema(
  {
    name: {
      type: String,
    },

    post: {
      type: String,
      required: true,
    },
    randomUser: {
      type: Number,
      default: generateRandomNumber,
    },
    getDate: {
      type: Date,
      default: Date.now,
      get: function (createdAt) {
        return moment(createdAt).format("MMMM Do YYYY, h:mm:ss a");
      },
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("postsSchema", postSchema);
