const express = require("express");
require("./config/mongo");
const route = require("./config/routes");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(route);
const port = process.env.PORT;
app.listen(port, console.log(`app is on ${port}`));

app.get("/", (req, res) => {});
