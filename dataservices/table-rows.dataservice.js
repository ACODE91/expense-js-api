const mySqlDatabase = require('../databases/expensedb.js');

function fetchRows() {
  // mySqlDatabase.query(`SELECT * FROM expense table`, function(err, result) {
  //   if (err) throw err;
  //   return result;
  // });
}

module.exports = fetchRows;
