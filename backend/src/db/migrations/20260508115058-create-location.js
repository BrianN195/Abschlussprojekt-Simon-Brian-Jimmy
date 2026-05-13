"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("location", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      region: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      latitude: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },

      longitude: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },

      depth: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },

      // 🆕 Location-Typ
      type: {
        type: Sequelize.ENUM("reef", "wreck", "cave", "wall", "sandbank"),
        allowNull: false,
        defaultValue: "reef",
      },

      // 🆕 Bild
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("location");
  },
};
