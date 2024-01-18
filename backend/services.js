var Service = require("node-windows").Service;

// Create a new service object
var svc = new Service({
  name: "API",
  description: "React App - API",
  script: "C:\\Users\\Gabriel\\projects\\gestor_de_gastos\\backend\\app.js",
});

svc.on("install", function () {
  svc.start();
});

svc.install();
