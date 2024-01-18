const mysql = require("mysql2/promise");

let IncomeStore = () => ({
  async getIncomes(pagina) {
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
        `select * from income order by income.date DESC LIMIT ${limit} OFFSET ${offset};`
      );

      const [countRows, countFields] = await db.execute(
        "select count(*) as count from income"
      );

      await db.end();
      return { data: rows, count: countRows.pop().count };
    } catch (error) {
      console.log(error);
      throw { statuscode: 500, body: { error: "Algo ha salido mal" } };
    }
  },
  async addIncome(income) {
    try {
      const db = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "root",
        database: "gestordegastos",
      });
      let monto = income.amount.replace(/,/g, "");

      let insert = `insert into income(title, date, amount, type, category, description)
      values ('${income.title}', '${income.date}',${monto}, '${
        income.type || ""
      }', '${income.category}', '${income.description}')`;

      const [rows, fields] = await db.execute(insert);
      await db.end();

      return rows.insertId;
    } catch (error) {
      console.log(error);
      throw { statuscode: 500, body: { error: "Algo ha salido mal" } };
    }
  },
  async deleteIncome(id, cb) {
    try {
      const db = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "root",
        database: "gestordegastos",
      });

      // simple query
      const [rows, fields] = await db.execute(
        `delete from income where id = ${id}`
      );
      await db.end();
      return rows;
    } catch (error) {
      throw { statuscode: 500, body: { error: "Algo ha salido mal" } };
    }
  },
});

module.exports = IncomeStore;
