"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("animal_translation", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      animalId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "animal", key: "id" },
        onDelete: "CASCADE",
      },
      locale: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: { type: Sequelize.STRING, allowNull: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      habitat: { type: Sequelize.STRING, allowNull: true },
      diet: { type: Sequelize.STRING, allowNull: true },
      category: { type: Sequelize.STRING, allowNull: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
    await queryInterface.addIndex("animal_translation", ["animalId", "locale"], {
      unique: true,
      name: "animal_translation_animal_locale_unique",
    });
    await queryInterface.addIndex("animal_translation", ["locale"], {
      name: "animal_translation_locale_idx",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("animal_translation");
  },
};