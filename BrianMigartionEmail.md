# Fürs adden der verifikation:
- npx sequelize-cli migration:generate --name add-isVerified-to-users
- npx sequelize-cli migration:generate --name create-email-verification-tokens

- user Migratins bearbeiten (oder neu erstellen? gpt fragen)
    - ```ts
        await queryInterface.addColumn(
        "Users",
        "isVerified",
        {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        }
        );
- migration für token bearbeiten:
    - ```ts
            await queryInterface.createTable(
          "EmailVerificationTokens",
          {
            id: {
              type: Sequelize.INTEGER,
              autoIncrement: true,
              primaryKey: true,
            },

            token: {
              type: Sequelize.STRING,
              allowNull: false,
            },

            expiresAt: {
              type: Sequelize.DATE,
              allowNull: false,
            },

            UserId: {
              type: Sequelize.INTEGER,

              references: {
                model: "Users",
                key: "id",
              },

              onDelete: "CASCADE",
            },

            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
          }
        );
- migratin ausführen: npx sequelize-cli db:migrate