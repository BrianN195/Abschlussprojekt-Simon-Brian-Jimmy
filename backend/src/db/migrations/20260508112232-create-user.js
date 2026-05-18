"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      passwordHash: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      profileImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      gender: {
        type: Sequelize.ENUM("male", "female", "others"),
        allowNull: true,
        defaultValue: "others",
      },

      birthDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },

      role: {
        type: Sequelize.ENUM("user", "admin", "mod"),
        allowNull: false,
        defaultValue: "user",
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
    await queryInterface.dropTable("user");
  },
};
