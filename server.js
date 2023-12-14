const express = require("express");
require("./config/mongo");
const route = require("./config/routes");
const dotenv = require("dotenv");
dotenv.config();
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");

const app = express();

const port = process.env.PORT;

app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(route);

app.listen(port, console.log(`app is on ${port}`));
