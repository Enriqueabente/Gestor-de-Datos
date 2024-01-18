const ExpenseRoutes = require("./expenses/ExpenseRoutes");
const IncomeRoutes = require("./incomes/IncomeRoutes");

module.exports = (app) => {
  IncomeRoutes(app);
  ExpenseRoutes(app);
};
