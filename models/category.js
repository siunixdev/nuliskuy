"use strict";
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    "category",
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      is_published: DataTypes.BOOLEAN,
      is_archived: DataTypes.BOOLEAN
    },
    {}
  );
  category.associate = function(models) {
    // associations can be defined here
    category.hasMany(models.article, {
      as: "article",
      foreignKey: "category_id"
    });
  };
  return category;
};
