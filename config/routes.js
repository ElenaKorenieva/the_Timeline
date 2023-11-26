const express = require("express");
const route = express.Router();
const funController = require("../controllers/controller");

route.get("/", funController.getMainPage);
route.post("/", funController.postNewComment);

module.exports = route;
