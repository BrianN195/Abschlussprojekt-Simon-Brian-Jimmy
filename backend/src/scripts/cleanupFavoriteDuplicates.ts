import dotenv from "dotenv";
import { QueryTypes } from "sequelize";
import { sequelize } from "../db/config/database";

dotenv.config();

type DuplicateGroup = {
  userId: number;
  animalId: number;
  duplicateCount: string;
};

async function cleanupFavoriteDuplicates() {
  await sequelize.authenticate();

  const duplicateGroups = await sequelize.query<DuplicateGroup>(
    `
      SELECT
        "userId" AS "userId",
        "animalId" AS "animalId",
        COUNT(*)::text AS "duplicateCount"
      FROM "user_favorite_animal"
      GROUP BY "userId", "animalId"
      HAVING COUNT(*) > 1
      ORDER BY "userId", "animalId"
    `,
    { type: QueryTypes.SELECT }
  );

  if (duplicateGroups.length === 0) {
    console.log("No duplicate favorite entries found.");
    await sequelize.close();
    return;
  }

  const duplicateRows = await sequelize.query<{ id: number }>(
    `
      WITH ranked_favorites AS (
        SELECT
          ctid,
          "userId",
          "animalId",
          ROW_NUMBER() OVER (
            PARTITION BY "userId", "animalId"
            ORDER BY ctid
          ) AS row_number
        FROM "user_favorite_animal"
      )
      DELETE FROM "user_favorite_animal" AS ufa
      USING ranked_favorites AS rf
      WHERE ufa.ctid = rf.ctid
        AND rf.row_number > 1
      RETURNING 1
    `,
    { type: QueryTypes.SELECT }
  );

  console.log(`Found ${duplicateGroups.length} duplicate favorite group(s).`);
  console.log(`Removed ${duplicateRows.length} duplicate row(s).`);

  for (const group of duplicateGroups) {
    console.log(
      `Kept one entry for userId=${group.userId}, animalId=${group.animalId} (had ${group.duplicateCount} rows).`
    );
  }

  await sequelize.close();
}

cleanupFavoriteDuplicates().catch(async (error) => {
  console.error("Failed to cleanup favorite duplicates:", error);
  await sequelize.close().catch(() => undefined);
  process.exitCode = 1;
});