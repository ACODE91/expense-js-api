const mySqlDatabase = require("../databases/expensedb.js");
const _ = require("lodash");
const MandatoryColumns = require("../constants/constants.js");
const TotalsColumns = require("../constants/totals-columns.constants.js");

class TableRowsDataService {
  fetchRows({ customerId }) {
    return new Promise((resolve, reject) => {
      mySqlDatabase.query(`SELECT *, DATE_FORMAT(date, '%m/%d/%Y') AS date FROM expensetable WHERE customerId=${customerId}`, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    })
  }

  insertRow({ customerId, expense, payment, description, date }) {
    const columns = _.values(MandatoryColumns);
    const values = _.values(arguments[0]);
    const formattedColumns = this.formatColumns(columns);
    const formattedValues = this.formatValues(values);
    mySqlDatabase.query(
      `INSERT INTO expensetable (${formattedColumns}) VALUES(${formattedValues})`,
      (err, result) => {
        if (err) throw err;
      }
    );
  }

  updateTotals({ customerId, expense, payment }) {
    const columns = _.values(TotalsColumns);
    const values = _.values(arguments[0]);
    const formattedColumns = this.formatColumns(columns);
    const formattedValues = this.formatValues(values);

    mySqlDatabase.query(
      `INSERT INTO totals (${formattedColumns}) VALUES(${formattedValues})`,
      (err, result) => {
        if (err) throw err;
      }
    );
  }

  formatColumns(inputArray) {
    return inputArray.join(",");
  }

  formatValues(valuesArray) {
    _.forEach(valuesArray, (value, index, array) => {
      if (typeof value === "string") {
        array[index] = `"${value}"`;
      }
    });

    return valuesArray.join(",");
  }
}

module.exports = new TableRowsDataService();
