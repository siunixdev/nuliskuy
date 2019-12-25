"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("follows", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        references: {
          model: "users",
          key: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      following_user_id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        references: {
          model: "users",
          key: "id"
        },
        onDelete: "set null",
        onUpdate: "cascade"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("follows");
  }
};
