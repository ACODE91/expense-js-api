/**
 * Module dependencies.
 */
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const mySqlDatabase = require("../databases/expensedb.js");
const chalk = require("chalk");
const morgan = require("morgan");
const cors = require("cors");

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({
  path: ".env.properties"
});

/**
 * Controllers (route handlers).
 */

const ReadRowsController = require("../controllers/rows/read-rows.controller");
const InsertRowsController = require("../controllers/rows/insert-rows.controller");
/**
 * Create Express server.
 */
const app = express();

app.use(logger("dev"));
app.use(logger("combined"));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("port", process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);

/**
 * Connect to MySQL
 */
mySqlDatabase.connect(err => {
  if (err) throw err;
  console.log(chalk.green("✓"), "Connected to mySql");
});

app.get(ReadRowsController.path, ReadRowsController.controller);
app.post(InsertRowsController.path, bodyParser.json(), InsertRowsController.controller);

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