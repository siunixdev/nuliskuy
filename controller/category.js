const model = require("../models");
const user = model.user;
const Category = model.category;
const article = model.article;
const comment = model.comment;
const follow = model.follow;

// GET LIST
exports.list = (req, res) => {
  Category.findAll({
    attributes: {
      exclude: ["is_published", "is_archived", "createdAt", "updatedAt"]
    }
  })
    .then(category => {
      res.status(200).json(category);
    })
    .catch(error => {
      res.status(400).json({ message: "Bad request" });
    });
};

// GET DETAIL
exports.detail = (req, res) => {
  Category.findOne({
    attributes: {
      exclude: ["is_published", "is_archived", "createdAt", "updatedAt"]
    },
    where: {
      id: req.params.id
    }
  })
    .then(category => {
      res.status(200).json(category);
    })
    .catch(error => {
      res.status(400).json({ message: "Bad request" });
    });
};

// SAVE
exports.save = (req, res) => {
  Category.create(req.body).then(category => {
    res.status(200).json({ category });
  });
};

// UPDATE
exports.update = (req, res) => {
  Category.update(req.body, {
    where: { id: req.params.id }
  }).then(category => {
    res.status(200).json({ category });
  });
};

// DELETE
exports.delete = (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(category => {
      res.status(200).json({ category });
    })
    .catch(error => {
      res.status(400).json({ message: "Bad request" });
    });
};
