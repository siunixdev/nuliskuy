const model = require("../models");
const user = model.user;
const Category = model.category;
const article = model.article;
const comment = model.comment;
const follow = model.follow;

// GET LIST
exports.list = (req, res) => {
  let message = "";

  Category.findAll({
    attributes: {
      exclude: ["is_published", "is_archived", "createdAt", "updatedAt"]
    }
  })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      message = "Server response error";
      res.status(500).json({ message });
    });
};

// GET DETAIL
exports.detail = (req, res) => {
  let message = "";

  Category.findOne({
    attributes: {
      exclude: ["is_published", "is_archived", "createdAt", "updatedAt"]
    },
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
  Category.create(req.body)
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

  const { id } = req.params;

  Category.update(req.body, {
    where: { id }
  })
    .then(data => {
      message = "Success";
      res.status(200).json({ message });
    })
    .catch(error => {
      message = "Server response error";
      res.status(500).json({ message });
    });
};

// DELETE
exports.delete = (req, res) => {
  let message = "";

  const { id } = req.params;

  Category.findAll({
    where: {
      id
    }
  })
    .then(data => {
      if (!data.length) {
        message = "No data";
        res.status(200).json({ message });
      } else {
        Category.destroy({
          where: {
            id
          }
        })
          .then(category => {
            message = "Success";
            res.status(200).json({ message });
          })
          .catch(error => {
            message = "Bad request";
            res.status(400).json({ message });
          });
      }
    })
    .catch(error => {
      res.status(500).json({
        massage: "Server response error!"
      });
    });
};
