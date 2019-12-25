"use strict";
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define(
    "comment",
    {
      article_id: DataTypes.INTEGER,
      creator_user_id: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
      is_published: DataTypes.BOOLEAN,
      is_archived: DataTypes.BOOLEAN
    },
    {}
  );
  comment.associate = function(models) {
    // associations can be defined here
    comment.belongsTo(models.article, {
      foreignKey: "article_id",
      as: "article",
      sourceKey: "id"
    });

    comment.belongsTo(models.user, {
      foreignKey: "creator_user_id",
      as: "user",
      sourceKey: "id"
    });
  };
  return comment;
};
