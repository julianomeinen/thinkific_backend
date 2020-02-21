const express = require("express");
const routes = express.Router();

routes.get("/", function(req, res) {
  return res.send("Running ok. Please, call the correct endpoint: current, next or current (POST with current parameter) ");
});

const SequenceController = require("./app/controller/SequenceController");

routes.get("/current", SequenceController.current);
routes.post("/current", SequenceController.setCurrent);
routes.get("/next", SequenceController.next);

// Just test
// routes.post("/new", SequenceController.store);

module.exports = routes;