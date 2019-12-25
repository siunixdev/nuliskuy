const model = require("../models");
const Sequelize = require("sequelize");
const User = model.user;
const Category = model.category;
const Article = model.article;
const Comment = model.comment;
const Follow = model.follow;

let slugify = require("slugify");

// GET LIST
exports.list = (req, res) => {
  let message = "";

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
      },
      {
        model: User,
        as: "user",
        attributes: {
          exclude: [
            "fullname",
            "username",
            "password",
            "is_published",
            "is_archived",
            "createdAt",
            "updatedAt"
          ]
        }
      }
    ]
  })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      message = error;
      res.status(500).json({ message });
    });
};

// GET DETAIL
exports.detail = (req, res) => {
  let message = "";

  Article.findOne({
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
      },
      {
        model: User,
        as: "user",
        attributes: {
          exclude: [
            "fullname",
            "username",
            "password",
            "is_published",
            "is_archived",
            "createdAt",
            "updatedAt"
          ]
        }
      }
    ],
    where: {
      slug: req.params.id
    }
  })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      message = "Bad request";
      res.status(400).json({ message });
    });
};

// SAVE
exports.save = (req, res) => {
  let message = "";
  let user_id = req.user_id;

  const {
    title,
    content,
    image,
    category_id,
    is_published,
    is_archived
  } = req.body;

  slug = slugify(title.toLowerCase());

  Article.create({
    title,
    content,
    image,
    category_id,
    slug,
    creator_user_id: user_id,
    is_published,
    is_archived
  })
    .then(data => {
      message = "Success";
      res.status(200).json({ message, data });
    })
    .catch(error => {
      message = "Server response error";
      res.status(500).json({ message });
    });
};

// UPDATE
exports.update = (req, res) => {
  let message = "";
  let user_id = req.user_id;

  const { id } = req.params;

  const {
    title,
    content,
    image,
    category_id,
    is_published,
    is_archived
  } = req.body;

  slug = slugify(title.toLowerCase());

  Article.findAll({
    where: {
      id
    }
  })
    .then(data => {
      if (!data.length) {
        message = "No data";
        res.status(200).json({ message });
      } else {
        creator_user_id = data[0].creator_user_id;
        if (user_id === creator_user_id) {
          Article.update(
            {
              title,
              content,
              image,
              category_id,
              slug,
              creator_user_id: user_id,
              is_published,
              is_archived
            },
            {
              where: { id }
            }
          )
            .then(data => {
              message = "Success";
              res.status(200).json({ message });
            })
            .catch(error => {
              message = "Bad request";
              res.status(400).json({ message });
            });
        } else {
          message = "Unauthorized";
          res.status(401).json({ message });
        }
      }
    })
    .catch(error => {
      message = "Server response error";

      res.status(500).json({ message });
    });
};

// DELETE
exports.delete = (req, res) => {
  let message = "";
  let user_id = req.user_id;

  const { id } = req.params;

  Article.findAll({
    where: {
      id
    }
  })
    .then(data => {
      if (!data.length) {
        message = "No data";
        res.status(200).json({ message });
      } else {
        creator_user_id = data[0].creator_user_id;
        if (user_id === creator_user_id) {
          Article.destroy({
            where: {
              id
            }
          })
            .then(data => {
              message = "Success";
              res.status(200).json({ message });
            })
            .catch(error => {
              message = "Bad request";
              res.status(400).json({ message });
            });
        } else {
          message = "Unauthorized";
          res.status(401).json({ message });
        }
      }
    })
    .catch(error => {
      res.status(500).json({
        massage: "Server response error!"
      });
    });
};

// GET RELATED ARTICLE LIST
exports.get_related_article_list = (req, res) => {
  let message = "";
  const { category_id } = req.params;

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
        },
        where: {
          slug: category_id
        }
      },
      {
        model: User,
        as: "user",
        attributes: {
          exclude: [
            "fullname",
            "username",
            "password",
            "is_published",
            "is_archived",
            "createdAt",
            "updatedAt"
          ]
        }
      }
    ],
    order: [Sequelize.fn("RAND")],
    limit: 3
  })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      message = error;
      res.status(500).json({ message });
    });
};
