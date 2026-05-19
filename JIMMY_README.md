## Datenbank
 - **Prostgrespl**: Neueste Version runtergeladen und eingerichtet soweit ich konnte. (?? dbAdmin ??)

## Backend
- **UserModel**: Gender und Geburtsdatum-Felder hinzugefügt.
- **Auth-Routen**: Registrierung und Login um Gender/BirthDate erweitert.
- **Server-Setup**: Sequelize-Sync für Tabellenaktualisierung.

## Frontend
- **Public/images**: 3 neue generierte Bilder für Background Landing-, Registrierung- und Profil page erstellt.
- **AuthService**: Register-Funktion um Gender und BirthDate erweitert.
- **RegisterPage**: Passwort-Wiederholung, Gender-Dropdown, Geburtsdatum hinzugefügt.
- **Register-CSS**: Placeholder zentriert, Design für Inputs/Selects angepasst.

Füge hier die konkreten Dateipfade ein, damit du jederzeit zum Code springen kannst!

---

**Remote vs Local — Frontend Vergleich (automatisch erstellt)**

Datum: 2026-05-16

Übersicht der lokal veränderten Frontend-Dateien (heute):

- [frontend/src/styles/login.css](frontend/src/styles/login.css) — lokal geändert
- [frontend/src/styles/register.css](frontend/src/styles/register.css) — lokal geändert
- [frontend/src/styles/landing.css](frontend/src/styles/landing.css) — lokal geändert
- [frontend/src/pages/LoginPage.tsx](frontend/src/pages/LoginPage.tsx) — lokal geändert
- [frontend/src/pages/RegisterPage.tsx](frontend/src/pages/RegisterPage.tsx) — lokal geändert

Neuer Plan:

- Catalog fällt weg

- Wetter Container ist schon gemacht/ Wir noch nicht richtig angezeigt und design nochmal überfliegen !!prüfen und reparieren!!

- comments geht dirakt nach animals. dort soll/kann kommentiert werden.

- Mein Auftrag: Container favoutites auf der main Page coden und einfügen. Alles Was unter animals per checkbox ausgewählt wird muss dann auf der mainPage unter Favoriten aufgelistet werden. Erscheinen soll das Bild mit unten drunter dem Wissenschaftsbnamen und dem Umgangsnamen. Muss klickbar (link) sein, weil bei klick wieder zu der entsprechen animalpage geleitet wird. Beispielsweise wir wählen unter animals "Clownfish" als favorite aus. Das wird auf der mainPage unter favorite aufgeführt. Bei klick wieder zurück auf die animals direkt nach "Clownfish"


diese Code bei Favoriten berücksichtigen, Die sind noch nich gemrged und/oder grcoded

// animals als favorit setzen:
await user.addFavorite(animal);
//favorit enfernen:
await user.removeFavorite(animal);
//alle favoriten holen:
const favorites = await user.getFavorites()



Auftrag reset Datenbank:
Weil wir was in unserer Datenbank verändert/gemacht haben  muss ich  jetzt erstmal ein resete machen. Arbeitsablaufplan inklusiv Powershell bitte. Ich muss resten.

 Um datenbank anzulegen:
    - ganz wichtig: postgresql muss laufen! (systemctl start postgresql)
    - wenn resetet werden muss, im backendordner: npx sequelize-cli db:migrate:undo:all
    - erst migrieren: in den backend ordner und dann im terminal: npx sequelize-cli db:migrate
    - dann seed durchlaufen lassen: npm run seed

    Ich habe bereits ein Account auf der Datenbank Postsql.

	Auftrag erledigt und Datenbank auf neuestem Stand.


## Letzte Änderungen (19.052026)
- [Favorites-Container](frontend/src/components/main/FavoritesSection.tsx#L1): Favoriten kommen aus der Datenbank und sind direkt anklickbar.
- [Favorites-Service](frontend/src/services/favouritesService.ts#L1): Zugriff läuft jetzt über die API statt über `localStorage`.
- [Animal-Favoriten](frontend/src/components/animals/Animal.tsx#L1): Favoriten werden beim Setzen und Entfernen direkt gespeichert.
- [Backend-Favorites-Route](backend/src/routes/favorites.routes.ts#L1): Neue Route zum Holen, Speichern und Löschen der Favoriten.
- [Weather-Container](frontend/src/components/main/WeatherSection.tsx#L10): Wetter wird im Frontend als eigener Bereich angezeigt.
- [Weather-Route](backend/src/routes/weather.routes.ts#L6): Backend liefert die Wetterdaten für den Container.
- [Server-Setup](backend/src/server.ts#L12): Favorites- und Weather-Route sind im Backend eingebunden.