const mysql = require("mysql2/promise");

let ExpenseStore = () => ({
  async getExpenses(pagina) {
    try {
      const db = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "root",
        database: "gestordegastos",
      });

      let limit = 10;
      let offset = limit * (pagina - 1);

      const [rows, fields] = await db.execute(
        `SELECT * from expense order by expense.date DESC LIMIT ${limit} OFFSET ${offset};`
      );

      const [countRows, countFields] = await db.execute(
        "select count(*) as count from expense"
      );

      await db.end();

      return { data: rows, count: countRows.pop().count };
    } catch (error) {
      console.log(error);
      throw { statuscode: 500, body: { error: "Algo ha salido mal" } };
    }
  },
  async addExpense(expense) {
    try {
      // Generamos la conexión a la DB
      const db = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "root",
        database: "gestordegastos",
      });

      let monto = income.amount.replace(/,/g, "");

      let insert = `insert into expense(title, amount, type, category, description)
      values ('${expense.title}', ${monto}, '${expense.type || ""}', '${
        expense.category
      }', '${expense.description}')`;

      const [rows, fields] = await db.execute(insert);
      await db.end();

      return rows.insertId;
    } catch (error) {
      throw { statuscode: 500, body: { error: "Algo ha salido mal" } };
    }
  },
  async deleteExpense(id) {
    try {
      const db = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "root",
        database: "gestordegastos",
      });

      const [rows, fields] = await db.execute(
        `delete from expense where id = ${id}`
      );
      await db.end();

      return rows;
    } catch (error) {
      throw { statuscode: 500, body: { error: "Algo ha salido mal" } };
    }
  },
});

module.exports = ExpenseStore;
