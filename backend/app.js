const express = require("express");
const cors = require("cors");
const user = require("./user");
const app = express();
const morgan = require("morgan");
const _ = require("lodash");
const fileUpload = require("express-fileupload");

require("dotenv").config();

const PORT = process.env.PORT;

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app.use(morgan("dev"));

// Serve public folder
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send("API - Gestor de Gastos");
});

user(app);

const server = () => {
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
};

server();
