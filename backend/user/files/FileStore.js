const mysql = require("mysql2/promise");

let FileStore = () => ({
  async getFiles(type) {
    try {
      const db = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "root",
        database: "gestordegastos",
      });

      let insert = `select * from ${type}_files`;

      const [rows, fields] = await db.execute(insert);
      await db.end();

      return rows;
    } catch (error) {
      throw { statuscode: 500, body: { error: "Algo ha salido mal" } };
    }
  },
  async addFile(file) {
    try {
      const db = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "root",
        database: "gestordegastos",
      });

      let insert = `insert into ${
        file.transactionType
      }_files(name, path, transaction,type)
      values('${file.name}', '${file.path}',${file.transaction}, '${
        file.type || "Document"
      }')`;

      const [rows, fields] = await db.execute(insert);
      await db.end();

      return rows.insertId;
    } catch (error) {
      console.log(error);
      throw { statuscode: 500, body: { error: "Algo ha salido mal" } };
    }
  },
  async deleteFile(id) {
    try {
      const db = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "root",
        database: "gestordegastos",
      });

      const [rows, fields] = await db.execute(
        `delete from expense_files where transaction = ${id}`
      );
      await db.end();
      return rows;
    } catch (error) {
      throw { statuscode: 500, body: { error: "Algo ha salido mal" } };
    }
  },
});

module.exports = FileStore;
