const mySqlDatabase = require("../databases/expensedb.js");
const _ = require("lodash");
const MandatoryColumns = require("../constants/constants.js");

class TableRowsDataService {
  async fetchRows() {
    await mySqlDatabase.query(`SELECT * FROM expensetable;`, function(err, result) {
      if (err) throw err;
      return result;
    });
  }

  async insertRow({ customerId, expense, payment, description, date }) {
    const columns = _.values(MandatoryColumns);
    const values = _.values(arguments[0]);
    const formattedColumns = this.formatColumns(columns);
    const formattedValues = this.formatValues(values);
    await mySqlDatabase.query(
      `INSERT INTO expensetable (${formattedColumns}) VALUES(${formattedValues})`,
      function(err, result) {
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
