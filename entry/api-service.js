/**
 * Module dependencies.
 */
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const mySqlDatabase = require("../databases/expensedb.js");
const chalk = require("chalk");

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({
  path: ".env.properties"
});

/**
 * Controllers (route handlers).
 */

const RowsController = require("../controllers/rows.controller");

/**
 * Create Express server.
 */
const app = express();

app.use(logger("dev"));
app.use(logger("combined"));
app.set("port", process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);

/**
 * Connect to MySQL
 */
mySqlDatabase.connect(err => {
  if (err) throw err;
  console.log("Connected to mySql");
});

app.get(RowsController.path, RowsController.controller);

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(
    "%s App is running at http://localhost:%d in %s mode",
    chalk.green("✓"),
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});
