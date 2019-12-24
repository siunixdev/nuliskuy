require("dotenv").config();
require("express-group-routes");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

// Controller
const categoryController = require("./controller/category");
const articleController = require("./controller/article");
const authController = require("./controller/auth");

// Midlleware
const authMidlleware = require("./middleware");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("This is nulisKuy!");
});

app.group("/api/v1", router => {
  router.post("/signup", authController.signUp);
  router.post("/sign", authController.sign);

  router.get("/categories", categoryController.list);
  router.get("/category/:id", categoryController.detail);
  router.post("/category/", authMidlleware.auth, categoryController.save);
  router.delete(
    "/category/:id",
    authMidlleware.auth,
    categoryController.delete
  );
  router.patch("/category/:id", authMidlleware.auth, categoryController.update);
  // router.get("/category/:id/articles", categoryController.getArticleList);

  router.get("/articles", articleController.list);
  router.get("/article/:id", articleController.detail);
  router.post("/article/", authMidlleware.auth, articleController.save);
  router.delete("/article/:id", authMidlleware.auth, articleController.delete);
  router.put("/article/:id", authMidlleware.auth, articleController.update);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
