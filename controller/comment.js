const model = require("../models");
const User = model.user;
const Category = model.category;
const Article = model.article;
const Comment = model.comment;
const Follow = model.follow;

// GET LIST
exports.list = (req, res) => {
  let message = "";

  const { article_id } = req.params;

  Comment.findAll({
    attributes: {
      exclude: ["article_id", "creator_user_id", "is_published", "is_archived"]
    },
    include: [
      {
        model: Article,
        as: "article",
        attributes: {
          exclude: [
            "category_id",
            "content",
            "image",
            "creator_user_id",
            "slug",
            "is_published",
            "is_archived",
            "createdAt",
            "updatedAt"
          ]
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
      article_id
    }
  })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      message = "Server response error";
      res.status(500).json({ error });
    });
};

// GET DETAIL
exports.detail = (req, res) => {
  let message = "";

  Comment.findOne({
    attributes: {
      exclude: ["is_published", "is_archived", "createdAt", "updatedAt"]
    },
    include: [
      {
        model: Article,
        as: "article",
        attributes: {
          exclude: [
            "content",
            "image",
            "creator_user_id",
            "is_published",
            "is_archived",
            "createdAt",
            "updatedAt"
          ]
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
      id: req.params.id
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

  const { comment, article_id, is_published, is_archived } = req.body;

  Comment.create({
    comment,
    article_id,
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

  const { comment, article_id, is_published, is_archived } = req.body;

  Comment.findAll({
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
          Comment.update(
            {
              comment,
              article_id,
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

  Comment.findAll({
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
          Comment.destroy({
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
