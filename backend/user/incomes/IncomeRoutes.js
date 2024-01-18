// STORES
const IncomeStore = require("./IncomeStore");
const FileStore = require("../files/FileStore");

module.exports = (app) => {
  app.get("/api/v1/get-incomes", async (req, res) => {
    try {
      let { pagina = 1 } = req.query;
      // Declaramos los stores
      let incomestore = IncomeStore();
      let fileStore = FileStore();
      // Realizamos la consulta
      let incomes = await incomestore.getIncomes(pagina);
      let files = await fileStore.getFiles("income");

      let { data = [], count = {} } = incomes;

      // Construimos el array de respuesta
      let builtData = [];
      for (let index = 0; index < data.length; index++) {
        const income = data[index];

        builtData.push({
          amount: income.amount,
          category: income.category,
          date: income.date,
          description: income.description,
          id: income.id,
          title: income.title,
          type: income.type,
          files: files.filter((e) => e.transaction == income.id),
        });
      }

      return res.status(200).json({ builtData, count, pagina });
    } catch (error) {
      console.log(error);
      return res
        .status(error.statuscode || 500)
        .json(error.body || { error: "Algo ha salido mal" });
    }
  });
  app.post("/api/v1/add-income", async (req, res) => {
    try {
      let {
        title = "",
        date = "",
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
      let incomeStore = IncomeStore();
      let fileStore = FileStore();

      // Adding Expense
      let insertId = await incomeStore.addIncome({
        title,
        amount,
        type,
        date,
        category,
        description,
      });

      // Store file if needed
      // Getting Date
      let newFecha = new Date();
      let year = newFecha.getFullYear();
      let month = newFecha.getMonth();
      let day = newFecha.getDate();
      let fecha = day + "-" + month + "-" + year;

      let dest_path = "";

      if (!!req.files.factura) {
        try {
          let file = req.files.factura;

          dest_path =
            "./public/" + file.mimetype + "/" + fecha + "/doc_" + file.name;
          await file.mv(dest_path);

          await fileStore.addFile({
            name: "doc_" + file.name,
            path: dest_path,
            transaction: insertId,
            type: file.mimetype,
            transactionType: "income",
          });
        } catch (error) {
          throw { statuscode: 500, body: { error: "Algo ha salido mal" } };
        }
      }

      if (!!req.files.comprobante) {
        try {
          let file = req.files.comprobante;

          dest_path =
            "./public/" + file.mimetype + "/" + fecha + "/doc_" + file.name;
          await file.mv(dest_path);

          await fileStore.addFile({
            name: "doc_" + file.name,
            path: dest_path,
            transaction: insertId,
            type: file.mimetype,
            transactionType: "income",
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
  app.post("/api/v1/update-income", async (req, res) => {
    try {
      let {
        title = "",
        date = "",
        amount = 0,
        type = "",
        category = "",
        description = "",
        id = "",
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
      let incomeStore = IncomeStore();
      let fileStore = FileStore();

      // Adding Expense
      await incomeStore.updateIncome({
        title,
        amount,
        type,
        date,
        category,
        description,
        id,
      });

      return res.status(200).json((success = true));
    } catch (error) {
      return res
        .status(error.statuscode || 500)
        .json(error.body || { error: "Algo ha salido mal" });
    }
  });
  app.delete("/api/v1/delete-income/:id", async (req, res) => {
    try {
      let { id = "" } = req.params;

      let incomeStore = IncomeStore();
      let fileStore = FileStore();

      await fileStore.deleteFile(id);
      await incomeStore.deleteIncome(id);

      return res.status(200).json((success = true));
    } catch (error) {
      return res
        .status(error.statuscode || 500)
        .json(error.body || { error: "Algo ha salido mal" });
    }
  });
};
