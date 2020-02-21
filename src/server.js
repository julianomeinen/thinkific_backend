const express = require("express");
const db = require("./database/config");
const mongoose = require("mongoose");

class App {
  constructor() {
    this.express = express();
    this.database();
    this.middlewares();
    this.routes();

    // Config to heroku.com
    let port = process.env.PORT;
    if (port == null || port == "") {
      port = 3000;
    }

    this.express.listen(port, () =>
      console.log('API runnig on port ' + port)
    );
  }

  database() {
    mongoose.connect(db.uri, { useNewUrlParser: true, useUnifiedTopology: true });
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require("./routes"));
  }

}
module.exports = new App().express;