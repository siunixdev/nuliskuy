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
  };
  return comment;
};
