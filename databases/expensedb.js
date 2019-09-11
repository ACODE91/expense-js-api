const mySql = require("mysql");
const mySqlDatabase = mySql.createConnection({});

module.exports = mySqlDatabase;
