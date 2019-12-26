require("dotenv").config();
require("express-group-routes");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;

// Controller
const categoryController = require("./controller/category");
const articleController = require("./controller/article");
const userController = require("./controller/user");
const followController = require("./controller/follow");
const commentController = require("./controller/comment");
const authController = require("./controller/auth");

// Midlleware
const authMidlleware = require("./middleware");

app.use(bodyParser.json());
app.use(cors());

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
  router.get("/category/:id/articles", categoryController.getArticleList);

  router.get("/articles", articleController.list);
  router.get("/article/:id", articleController.detail);
  router.get(
    "/article/:category_id/related",
    articleController.get_related_article_list
  );
  router.post("/article/", authMidlleware.auth, articleController.save);
  router.delete("/article/:id", authMidlleware.auth, articleController.delete);
  router.put("/article/:id", authMidlleware.auth, articleController.update);

  router.get("/articles/:article_id/comments", commentController.list);
  router.get(
    "/article/:article_id/comment/:id",
    authMidlleware.auth,
    commentController.detail
  );
  router.post(
    "/article/:article_id/comment",
    authMidlleware.auth,
    commentController.save
  );
  router.delete(
    "/article/:article_id/comment/:id",
    authMidlleware.auth,
    commentController.delete
  );
  router.put(
    "/article/:article_id/comment/:id",
    authMidlleware.auth,
    commentController.update
  );

  router.get("/user/:user_id/articles", userController.article_list);

  router.get("/:user_id/followers", followController.list);
  router.post("/follow/", authMidlleware.auth, followController.save);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
