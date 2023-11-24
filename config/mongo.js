const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => console.log(err));

module.exports = mongoose;
