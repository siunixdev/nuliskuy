const model = require("../models");
const Sequelize = require("sequelize");
const User = model.user;
const Category = model.category;
const Article = model.article;
const Comment = model.comment;
const Follow = model.follow;

// GET ARTICLE BY USER
exports.get_related_article_list = (req, res) => {
  let message = "";
  const { user_id } = req.params;

  Article.findAll({
    attributes: {
      exclude: [
        "category_id",
        "creator_user_id",
        "is_published",
        "is_archived",
        "createdAt",
        "updatedAt"
      ]
    },
    include: [
      {
        model: Category,
        as: "category",
        attributes: {
          exclude: ["is_published", "is_archived", "createdAt", "updatedAt"]
        }
      }
    ],
    where: {
      creator_user_id: user_id
    }
  })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      message = error;
      res.status(500).json({ message });
    });
};
