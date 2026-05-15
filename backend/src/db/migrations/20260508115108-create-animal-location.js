'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('animal_location', {
      animalId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'animal',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },

      locationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'location',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },

      rarity: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      uniqueKeys: {
        animal_location_unique: {
          fields: ['animalId', 'locationId'],
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('animal_location');
  },
};