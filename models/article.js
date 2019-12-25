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
    article.belongsTo(models.category, {
      foreignKey: "category_id",
      as: "category",
      sourceKey: "id"
    });

    article.belongsTo(models.user, {
      foreignKey: "creator_user_id",
      as: "user",
      sourceKey: "id"
    });

    article.hasMany(models.comment, {
      as: "comment",
      foreignKey: "article_id"
    });
  };

  return article;
};
