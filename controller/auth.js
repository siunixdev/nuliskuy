// require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const model = require("../models");
const User = model.user;
const Category = model.category;
const Article = model.article;
const Comment = model.comment;
const Follow = model.follow;
const saltRound = 10; //process.env.SALT_ROUND;
const secretKey = "siunix"; //process.env.SECRET_KEY;

exports.signUp = (req, res) => {
  let message = "";
  const { fullname, username, email, password } = req.body;

  User.findAll({
    where: {
      username
    }
  })
    .then(data => {
      if (data.length > 0) {
        message = "Username has been taken";
        res.status(200).json({ message });
      } else {
        User.findAll({
          where: {
            email
          }
        })
          .then(data => {
            if (data.length > 0) {
              message = "Email has been registered";
              res.status(200).json({ message });
            } else {
              bcrypt.genSalt(saltRound, (err, salt) => {
                if (err) {
                  message = "Server response error";
                  res.status(500).json({ message });
                } else {
                  bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                      message = "Server response error";
                      res.status(500).json({ message });
                    } else {
                      User.create({
                        fullname: fullname,
                        username: username,
                        email: email,
                        password: hash,
                        is_published: 1,
                        is_archived: 0
                      })
                        .then(user => {
                          if (user) {
                            message = "Success";
                            const token = jwt.sign({ id: user.id }, secretKey);
                            res.status(200).json({ message, token });
                          } else {
                            message = "Bad request";
                            res.status(400).json({ message });
                          }
                        })
                        .catch(error => {
                          message = "Server response error";
                          res.status(500).json({ message });
                        });
                    }
                  });
                }
              });
            }
          })
          .catch(error => {
            message = "Bad request";
            res.status(400).json({ message });
          });
      }
    })
    .catch(error => {
      message = "Server response error";
      res.status(500).json({ message });
    });
};

exports.sign = (req, res) => {
  let message = "";
  const { email, password } = req.body;

  User.findOne({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    where: {
      email: email
    }
  })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            message = "Bad request";
            res.status(400).json({ message });
          } else if (!isMatch) {
            message = "Password doesn't match";
            res.status(200).json({ message });
          } else {
            message = "Success";
            const token = jwt.sign({ id: user.id }, secretKey);
            res.status(200).json({ email, token });
          }
        });
      } else {
        message = "Wrong email or password!";
        res.status(500).json({ message });
      }
    })
    .catch(error => {
      message = "Server response error";
      res.status(500).json({ message });
    });
};
