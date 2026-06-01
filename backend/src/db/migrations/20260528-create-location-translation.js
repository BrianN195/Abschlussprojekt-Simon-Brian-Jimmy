"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("location_translation", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      locationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "location", key: "id" },
        onDelete: "CASCADE",
      },
      locale: { type: Sequelize.STRING, allowNull: false },
      name: { type: Sequelize.STRING, allowNull: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      region: { type: Sequelize.STRING, allowNull: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
    await queryInterface.addIndex("location_translation", ["locationId", "locale"], {
      unique: true,
      name: "location_translation_location_locale_unique",
    });
    await queryInterface.addIndex("location_translation", ["locale"], {
      name: "location_translation_locale_idx",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("location_translation");
  },
};