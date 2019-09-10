const fetchRows = require("../dataservices/table-rows.dataservice");

/**
 * Fetch rows from expensedb.
 */
function RowsController(req, res) {
  const rows = fetchRows();
  console.log(rows, 'wat my rows');
  res.send("Working state");
}

module.exports = {
  path: "/rows/fetchrows/:customerId",
  controller: RowsController
};
