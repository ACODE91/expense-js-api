const mySqlDatabase = require("../databases/expensedb.js");

class TableRowsDataService {
  fetchRows() {
    mySqlDatabase.query(`SELECT * FROM expensetable;`, function(err, result) {
      if (err) throw err;
      return result;
    });
  }
}

module.exports = new TableRowsDataService();
