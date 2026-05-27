## Datenbank
 - **Prostgrespl**: Neueste Version runtergeladen und eingerichtet soweit ich konnte. (?? dbAdmin ??)

## Backend
- **RegisterPage**: Passwort-Wiederholung, Gender-Dropdown, Geburtsdatum hinzugefügt.
- **Register-CSS**: Placeholder zentriert, Design für Inputs/Selects angepasst.

Füge hier die konkreten Dateipfade ein, damit du jederzeit zum Code springen kannst!

---

**Remote vs Local — Frontend Vergleich (automatisch erstellt)**

Datum: 2026-05-16


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
//favorit enfernen:
await user.removeFavorite(animal);
//alle favoriten holen:
const favorites = await user.getFavorites()



Auftrag reset Datenbank:
Weil wir was in unserer Datenbank verändert/gemacht haben  muss ich  jetzt erstmal ein resete machen. Arbeitsablaufplan inklusiv Powershell bitte. Ich muss resten.

    - ganz wichtig: postgresql muss laufen! (systemctl start postgresql)
    - wenn resetet werden muss, im backendordner: npx sequelize-cli db:migrate:undo:all
    - erst migrieren: in den backend ordner und dann im terminal: npx sequelize-cli db:migrate
    - dann seed durchlaufen lassen: npm run seed

    Ich habe bereits ein Account auf der Datenbank Postsql.

	Auftrag erledigt und Datenbank auf neuestem Stand.


## Letzte Änderungen (19.05.2026)
 - [Weather-Types](frontend/src/types/Weather.ts#L1): `WeatherData` wurde ausgelagert; `WeatherSection.tsx` importiert jetzt den Typ.


## Letzte Änderungen (27.05.2026)
Tag: Dienstag, 27.05.2026

- [WeatherSection.tsx](frontend/src/components/main/WeatherSection.tsx) - Die Wetteranzeige nutzt jetzt englische Datumsangaben statt deutscher Wochentage.
- [InlineSVG.tsx](frontend/src/components/ui/InlineSVG.tsx) - SVGs werden inline geladen, damit SMIL-Animationen im Wetter-Icon laufen.
- [weather.css](frontend/src/styles/weather.css) - Das Weather-Layout nutzt feste 7 Spalten für den Forecast und ist optisch beruhigt.
- [favorites.css](frontend/src/styles/favorites.css) - Favoriten haben das gleiche ruhige Blur-Layout bekommen und der Delete-Button wurde größer gemacht.
- [Weather.ts](frontend/src/types/Weather.ts) - Wetter-Typen wurden um `current.time` und `weather_code` erweitert.

Kurz gesagt: Alles, was wir heute am Wetter-Container, an den SVG-Icons, an den Favoriten und an den Wetter-Typen angepasst haben, steht hier unten mit klickbaren Links.
Auftrag heute:  (20.05.2026)

Container Weather:
- Hintergrundbild neu und bearbeiten. Bild soll den gesamten Hintergrund vom Container beanspruchen und wegen mobile und tablet responsiv sein.

- In dem Container muss oben rechts in der Ecke eine checkbox sein. Rechts daneben ein Delete-Button.
Mit der checkbbox in den Container Favorites muss man alle Favoriten die man aus dem Bereich Animal ausgewählt hatte auf einmal markieren/auswählen können, damit wenn man dann auf den Delete-Buttuon klickt alle Favorites auf einmal gelöscht werden. Wenn aus den Favoriites gelöscht, dann bei den Animals automatisch die Auswahl in den jeweiligen checkboxes entfernen. 

!!! ABER NUR DIE "ANIMALCARDS" IN DEM FAVORITES-CONTAINER LÖSCHEN !!!

- Wenn man sich favoriten ausgesucht hat und diese dann in dem Container "Favotiten" aufgelistet sind, müssen dann die jeweiligen einzelnen Favoriten auch individuell eine checkbox haben.  Mit Hilfe dieser individuellen checkbox kann man einzelne Favoriten auswählen/markieren die dann bei klick auf den Delete-Button aus den Favoriten gelöscht werden können. Nach dem Löschen sollen die entsprechenden Checkboxen bei den Animals automatisch wieder abgewählt werden.

!!! DARAN DENKEN DASS DIE NUR AUS DEM fAVORITES-CONTAINER GELÖSCHT WEREDN UND NICHT AUS DEN ANIMALS !!!

- Im Code nachgucken ob die Checkbox-Markierung verschwinden. Wenn aus den Favorites gelöscht, dann bei den Animals automatisch die Auswahl in den jeweiligen checkboxes entfernen.

- Im Container Favorittes sollen aufeinmal nur 4 Bilder zu sehen sein. Falls mehr als diese Ausgewählt sind muss ein slider rechts erscheinen. Bei klick dann weiter sliden und und weitere max. 4 Bilder anzeigen. Weil man dann aber zurück sliden kann dann einen slider links erscheinen und etc... 

Danach Container Weather:
- Im Hauptteil ---> muss "today" 

- bei Forecast ---> "Wochentag und Datum"

## Letzte Änderungen (20.05.2026)

Die folgenden Änderungen wurden am 20.05.2026 vorgenommen (nur die betroffenen Teile sind hier aufgeführt). In den Dateien habe ich Kommentar‑Marker gesetzt ("geänderter Code") — die Links führen direkt zu den Stellen.

- **Favorites - Komponente (neuer Header + Auswahl & Batch-Löschen):** [frontend/src/components/main/FavoritesSection.tsx](frontend/src/components/main/FavoritesSection.tsx#L24-L130) — //geänderter Code, //neuer Code

    Vorher (betroffene Teile):
    ```html
    <h2>Favorites</h2>

    <!-- pro-favorit (vorher) -->
    <Link
        to={`/animal/${animal.id}`}
        className="favorite-card"
    >
        <img src={animal.imageUrl} alt={animal.name} className="favorite-image" />
        <div className="favorite-info">...</div>
    </Link>
    ```

- **Favorites - Styles (Panel + Select-all + Buttons):** [frontend/src/styles/favorites.css](frontend/src/styles/favorites.css#L1-L12) — /* geänderter Code */

    Vorher (betroffene Teile):
    ```css
    .favorites-section {
        width: min(100%, 1100px);
        margin: 2rem auto;
        padding: 1.5rem;
        color: #ffffff;
        font-family: "Inter", sans-serif;
    }
    ```

- **Weather - Styles (Breite / Box-model):** [frontend/src/styles/weather.css](frontend/src/styles/weather.css#L1-L6) — /* geänderter Code */

    Vorher (betroffene Teile):
    ```css
    .weather-section {
        width: min(100%, 1100px);
        margin: 0 auto;
        padding: 1.5rem;
    }
    ```

- **Animal - Komponente (Sync mit Favorites):** [frontend/src/components/animals/Animal.tsx](frontend/src/components/animals/Animal.tsx#L28-L36) — //geänderter Code

    Vorher (betroffene Teile):
    ```js
    // loadFavouriteState();
    // (vorher wurde hier nicht auf das Event 'favourites-changed' gehört)
    ```

Hinweis: Ich habe nur die betroffenen Abschnitte als "Vorher"-Schnipsel eingefügt (nicht ganze Dateien). Die Links zeigen auf die aktuellen Stellen mit den Kommentar-Markern (z. B. `// geänderter Code` oder `/* geänderter Code */`). Soll ich die README-Änderung direkt committen? Wenn ja, mache ich einen Commit mit Nachricht "docs: add 20.05.2026 changes summary".

## Letzte Änderungen (21.05.2026)

    Vorher (zurückgenommener Stand):
    ```css
    .nav-search-mobile .search-input {
        width: 60%;
        padding: 10px 12px;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.06);
        background: rgba(255,255,255,0.02);
        color: var(--text);
    }

    .nav-mobile-logout {
        padding: 10px 12px;
        border: 0;
        border-radius: 8px;
        background: var(--accent-hover);
        color: #fff;
        width: 50%;
        text-align: center;
    }
    ```

- [profile.css](frontend/src/styles/profile.css#L308) und [profile.css](frontend/src/styles/profile.css#L331) - der Desktop-Abstand für die Profilseite ist wieder aktiv, damit Tablet und Desktop sauber getrennt bleiben.

    Vorher (zurückgenommener Stand):
    ```css
    @media (max-width: 900px) {
        .profile-page {
            padding: 1rem;
        }

        .profile-section,
        .profile-edit-section {
            padding: 0 16px;
        }

        .profile-summary-header,
        .profile-edit-grid {
            grid-template-columns: 1fr;
            flex-direction: column;
        }

        .profile-stats,
        .profile-form-row {
            grid-template-columns: 1fr;
        }

        .profile-save-button {
            width: auto;
            min-width: 0;
            justify-self: center;
        }
    }
    ```


## Letzte Änderungen (21.05.2026)
- [FavoritesSection](frontend/src/components/main/FavoritesSection.tsx) - Favoriten werden im Carousel angezeigt. Es sind immer nur 4 Karten gleichzeitig sichtbar; die Slide-Buttons erscheinen nur, wenn es eine vorherige oder nächste Seite gibt.
- [favorites.css](frontend/src/styles/favorites.css) - Styling für das Carousel, die versteckten/aktiven Slide-Buttons und die festen Card-Abstände für die 4er-Ansicht.
- [favorites.routes.ts](backend/src/routes/favorites.routes.ts) - Favoriten werden serverseitig dedupliziert, doppelte `addFavorite`-Aufrufe werden abgefangen und die Antwort bleibt eindeutig.
- [UserFavoritAnimalModel.ts](backend/src/db/models/UserFavoritAnimalModel.ts) - Eindeutiger Index auf `userId` + `animalId`, damit ein Tier pro User nur einmal gespeichert wird.
- [cleanupFavoriteDuplicates.ts](backend/src/scripts/cleanupFavoriteDuplicates.ts) - Einmaliges Script zum Entfernen bereits vorhandener doppelter Favoriten-Einträge aus der Join-Tabelle.
- [index.css](frontend/src/index.css) - Das Root-Element füllt jetzt die komplette Browserbreite, damit keine schwarzen Ränder links/rechts bleiben.

## Letzte Änderungen (21.05.2026) - Korrigierter Stand
- [Animal.tsx](frontend/src/components/animals/Animal.tsx) - Die Favorite-Checkbox speichert Tiere direkt per API und entfernt sie beim Abwählen wieder sauber.
- [favouritesService.ts](frontend/src/services/favouritesService.ts) - Zentrale API-Schicht für Laden, Speichern und Löschen der Favoriten; triggert danach `favourites-changed`.
- [FavoritesSection.tsx](frontend/src/components/main/FavoritesSection.tsx) - Favoriten werden im Carousel gezeigt; es sind immer 4 Karten pro Seite sichtbar und die Slide-Buttons erscheinen nur, wenn wirklich eine vorherige oder nächste Seite existiert.
- [favorites.css](frontend/src/styles/favorites.css) - Layout für Carousel, Button-Sichtbarkeit und feste 4er-Seitenansicht.
- [favorites.routes.ts](backend/src/routes/favorites.routes.ts) - Backend-Route schützt jetzt gegen doppelte Favoriten, liefert die Liste eindeutig zurück und arbeitet ohne doppelte Einträge in der Antwort.
- [UserFavoritAnimalModel.ts](backend/src/db/models/UserFavoritAnimalModel.ts) - Datenbank-Modell für die Join-Tabelle mit eindeutiger Kombination aus `userId` und `animalId`.
- [20260521183000-add-unique-user-favorite-animal-index.js](backend/src/db/migrations/20260521183000-add-unique-user-favorite-animal-index.js) - Migration entfernt alte Duplikate und setzt anschließend den Unique-Index auf `userId` + `animalId`.
- [cleanupFavoriteDuplicates.ts](backend/src/scripts/cleanupFavoriteDuplicates.ts) - Hilfsskript zum einmaligen Bereinigen alter doppelter Favoriten in der Join-Tabelle.

Hinweis: Die Migration wurde bereits erfolgreich ausgeführt. Wenn du künftig nur die Datenbank aktualisieren willst, ist der richtige Befehl `npx sequelize-cli db:migrate` im `backend`-Ordner.

## Letzte Änderungen (27.05.2026)
Tag: Dienstag, 27.05.2026

- [WeatherSection.tsx](frontend/src/components/main/WeatherSection.tsx) - Die Wetteranzeige nutzt jetzt englische Datumsangaben statt deutscher Wochentage.
- [InlineSVG.tsx](frontend/src/components/ui/InlineSVG.tsx) - SVGs werden inline geladen, damit SMIL-Animationen im Wetter-Icon laufen.
- [weather.css](frontend/src/styles/weather.css) - Das Weather-Layout nutzt feste 7 Spalten für den Forecast und ist optisch beruhigt.
- [favorites.css](frontend/src/styles/favorites.css) - Favoriten haben das gleiche ruhige Blur-Layout bekommen und der Delete-Button wurde größer gemacht.
- [Weather.ts](frontend/src/types/Weather.ts) - Wetter-Typen wurden um `current.time` und `weather_code` erweitert.

Kurz gesagt: Alles, was wir heute am Wetter-Container, an den SVG-Icons, an den Favoriten und an den Wetter-Typen angepasst haben, steht hier unten mit klickbaren Links.


