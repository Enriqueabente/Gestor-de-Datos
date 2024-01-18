// STORES
const ExpenseStore = require("./ExpenseStore");
const FileStore = require("../files/FileStore");

module.exports = (app) => {
  app.get("/api/v1/get-expenses", async (req, res) => {
    try {
      let { pagina = 1 } = req.query;
      // Declaramos los Stores
      let Expensestore = ExpenseStore();
      let fileStore = FileStore();
      // Consultamos los datos
      let expenses = await Expensestore.getExpenses(pagina);
      let files = await fileStore.getFiles("expense");

      let { data = [], count = {} } = expenses;

      // Construimos el array de respuesta
      let builtData = [];
      for (let index = 0; index < data.length; index++) {
        const expense = data[index];

        builtData.push({
          amount: expense.amount,
          category: expense.category,
          date: expense.date,
          description: expense.description,
          id: expense.id,
          title: expense.title,
          type: expense.type,
          files: files.filter((e) => e.transaction == expense.id),
        });
      }

      return res.status(200).json({ builtData, count, pagina });
    } catch (error) {
      return res
        .status(error.statuscode || 500)
        .json(error.body || { error: "Algo ha salido mal" });
    }
  });
  app.post("/api/v1/add-expense", async (req, res) => {
    try {
      let {
        title = "",
        amount = 0,
        type = "",
        category = "",
        description = "",
      } = req.body;

      //validations
      if (!title || !category) {
        throw {
          statuscode: 400,
          body: { error: "All fields are required!" },
        };
      }
      if (amount <= 0 || !amount === "number") {
        throw {
          statuscode: 400,
          body: { error: "Amount must be a positive number!" },
        };
      }

      // Configure Stores
      let expenseStore = ExpenseStore();
      let fileStore = FileStore();

      // Adding Expense
      let insertId = await expenseStore.addExpense({
        title,
        amount,
        type,
        category,
        description,
      });

      // Store file if needed
      // Getting Date
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let fecha = day + "-" + month + "-" + year;

      let dest_path = "";
      if (!!req.files) {
        try {
          let file = req.files.comprobante;

          dest_path =
            "./public/" + file.mimetype + "/" + fecha + "/doc_" + file.name;
          file.mv(dest_path);

          await fileStore.addFile({
            name: "doc_" + file.name,
            path: dest_path,
            transaction: insertId,
            type: file.mimetype,
            transactionType: "expense",
          });
        } catch (error) {
          throw { statuscode: 500, body: { error: "Algo ha salido mal" } };
        }
      }

      return res.status(200).json((success = true));
    } catch (error) {
      return res
        .status(error.statuscode || 500)
        .json(error.body || { error: "Algo ha salido mal" });
    }
  });
  app.delete("/api/v1/delete-expense/:id", async (req, res) => {
    try {
      let { id = "" } = req.params;

      let Expensestore = ExpenseStore();
      let fileStore = FileStore();

      await fileStore.deleteFile(id);
      await Expensestore.deleteExpense(id);

      return res.status(200).json((success = true));
    } catch (error) {
      return res
        .status(error.statuscode || 500)
        .json(error.body || { error: "Algo ha salido mal" });
    }
  });
};
