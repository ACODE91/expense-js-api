const TableRowsDataService = require("../../dataservices/table-rows.dataservice");

/**
 * Fetch rows from expensedb.
 */
function ReadRowsController(req, res) {
  const rows = TableRowsDataService.fetchRows({ ...req.params });
  rows.then((rowsData) => {
    res.send(rowsData);
  });
}

module.exports = {
  path: "/rows/fetchrows/:customerId",
  controller: ReadRowsController
};
