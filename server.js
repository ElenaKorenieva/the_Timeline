const express = require("express");
require("./config/mongo");
const route = require("./config/routes");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const port = process.env.PORT;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(route);

app.listen(port, console.log(`app is on ${port}`));
