const express = require("express");
const routes = express.Router();

routes.get("/", function(req, res) {
  return res.send("running ok");
});

const SequenceController = require("./app/controller/SequenceController");

routes.get("/current", SequenceController.current);

module.exports = routes;