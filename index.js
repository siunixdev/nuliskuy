require("express-group-routes");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

// Controller
const categoryController = require("./controller/category");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("This is nulisKuy!");
});

app.group("/api/v1", router => {
  router.get("/categories", categoryController.list);
  router.get("/category/:id", categoryController.detail);
  router.post("/category/", categoryController.save);
  router.delete("/category/:id", categoryController.delete);
  router.patch("/category/:id", categoryController.update);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
