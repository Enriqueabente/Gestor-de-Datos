// STORES
const ExpenseStore = require("./ExpenseStore");
const FileStore = require("./FileStore");
// Tools
const fs = require("fs");
const mysql = require("mysql2/promise");

module.exports = (app) => {
  app.get("/api/v1/get-file", async (req, res) => {
    try {
      // Declaramos el Store y le pasamos la conexión db
      let Expensestore = ExpenseStore();
      // Consultamos los datos
      let expenses = await Expensestore.getExpenses();

      return res.status(200).json(expenses);
    } catch (error) {
      return res
        .status(error.statuscode || 500)
        .json(error.body || { error: "Algo ha salido mal" });
    }
  });
};
