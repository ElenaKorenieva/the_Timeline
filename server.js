const express = require("express");
require("./config/mongo");
const route = require("./config/routes");
const dotenv = require("dotenv");
dotenv.config();
const methodOverride = require("method-override");

const app = express();

const port = process.env.PORT;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(route);

app.listen(port, console.log(`app is on ${port}`));
