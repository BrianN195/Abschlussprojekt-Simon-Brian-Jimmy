'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      WITH ranked_favorites AS (
        SELECT
          ctid,
          ROW_NUMBER() OVER (
            PARTITION BY "userId", "animalId"
            ORDER BY ctid
          ) AS row_number
        FROM "user_favorite_animal"
      )
      DELETE FROM "user_favorite_animal" AS ufa
      USING ranked_favorites AS rf
      WHERE ufa.ctid = rf.ctid
        AND rf.row_number > 1;
    `);

    await queryInterface.addIndex('user_favorite_animal', ['userId', 'animalId'], {
      unique: true,
      name: 'user_favorite_animal_userId_animalId_unique',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex(
      'user_favorite_animal',
      'user_favorite_animal_userId_animalId_unique'
    );
  },
};