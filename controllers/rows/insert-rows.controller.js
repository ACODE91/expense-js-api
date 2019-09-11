const TableRowsDataService = require("../../dataservices/table-rows.dataservice");

/**
 * Insert row into expensedb.
 */
function InsertRowsController(req, res) {
  const body = req.body;
  const requestBody = { ...body };
  TableRowsDataService.insertRow(requestBody);
  res.sendStatus(200);
}

module.exports = {
  path: "/rows/insertrow",
  controller: InsertRowsController
};
