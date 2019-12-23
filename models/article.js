"use strict";
module.exports = (sequelize, DataTypes) => {
  const article = sequelize.define(
    "article",
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      image: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      slug: DataTypes.STRING,
      creator_user_id: DataTypes.INTEGER,
      is_published: DataTypes.BOOLEAN,
      is_archived: DataTypes.BOOLEAN
    },
    {}
  );
  article.associate = function(models) {
    // associations can be defined here
  };
  return article;
};
