"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("animal", {
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

      scientificName: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      category: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      dangerLevel: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      size: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      weight: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      habitat: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      bestViewingTime: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },

      depthRange: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      diet: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      isSchooling: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("animal");
  },
};
