"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("articles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.STRING
      },
      category_id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        references: {
          model: "categories",
          key: "id"
        },
        onDelete: "set null",
        onUpdate: "cascade"
      },
      slug: {
        type: Sequelize.STRING
      },
      creator_user_id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        references: {
          model: "users",
          key: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      is_published: {
        type: Sequelize.BOOLEAN
      },
      is_archived: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable("articles");
  }
};

// "use strict";
// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.createTable("articles", {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       title: {
//         type: Sequelize.STRING
//       },
//       content: {
//         type: Sequelize.TEXT
//       },
//       image: {
//         type: Sequelize.STRING
//       },
//       category_id: {
//         type: Sequelize.INTEGER,
//         references: {
//           model: "categories",
//           key: "id"
//         },
//         onDelete: "set null",
//         onUpdate: "cascade"
//       },
//       slug: {
//         type: Sequelize.STRING
//       },
//       creator_user_id: {
//         type: Sequelize.INTEGER,
//         references: {
//           model: "users",
//           key: "id"
//         },
//         onDelete: "cascade",
//         onUpdate: "cascade"
//       },
//       is_published: {
//         type: Sequelize.BOOLEAN
//       },
//       is_archived: {
//         type: Sequelize.BOOLEAN
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       }
//     });
//   },
//   down: (queryInterface, Sequelize) => {
//     return queryInterface.dropTable("articles");
//   }
// };
