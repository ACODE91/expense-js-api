const TableRowsDataService = require("../dataservices/table-rows.dataservice");

/**
 * Fetch rows from expensedb.
 */
function RowsController(req, res) {
  const rows = TableRowsDataService.fetchRows();
  res.send(rows);
}

module.exports = {
  path: "/rows/fetchrows/:customerId",
  controller: RowsController
};
