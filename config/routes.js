const express = require("express");
const route = express.Router();
const funController = require("../controllers/controller");

route.get("/", funController.getMainPage);
route.post("/ds", funController.postSomething);

module.exports = route;
