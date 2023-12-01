const mongoose = require("mongoose");
const moment = require("moment");
const Joi = require("joi");
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
      minLength: 25,
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
    comments: [
      {
        type: schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  post: Joi.string().min(25).required().messages({
    "any.required": "The post length must be at least 25 characters long",
  }),
});

const schemas = {
  joiSchema,
};

const Post = mongoose.model("Post", postSchema);

module.exports = {
  Post,
  schemas,
};
