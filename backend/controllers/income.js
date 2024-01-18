// const IncomeSchema= require("../models/IncomeModel")
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
});

exports.addIncome = async (req, res) => {
  console.log("addIncome");
  const { title, amount, category, description, date } = req.body;

  //   const income = IncomeSchema({
  //       title,
  //       amount,
  //       category,
  //       description,
  //       date
  //   })
  const income = {
    title,
    amount,
    category,
    description,
    date,
  };

  try {
    //validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }

    // await income.save()
    let sql_query = `insert into incomes(title, amount, category, descripcion) values ('${title}', ${amount}, '${category}', '${description}')`;
    console.log(sql_query);
    connection.query(sql_query, function (err, results, fields) {
      console.log(results);
      console.log(fields);
    });

    res.status(200).json({ message: "Income Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

  console.log(income);
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Income Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};
