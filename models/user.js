"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      fullname: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      is_published: DataTypes.BOOLEAN,
      is_archived: DataTypes.BOOLEAN
    },
    {}
  );
  user.associate = function(models) {
    // associations can be defined here
    user.hasMany(models.article, {
      as: "article",
      foreignKey: "creator_user_id"
    });

    user.hasMany(models.comment, {
      as: "comment",
      foreignKey: "creator_user_id"
    });

    user.hasMany(models.follow, {
      as: "follower",
      foreignKey: "following_user_id"
    });
  };
  return user;
};
