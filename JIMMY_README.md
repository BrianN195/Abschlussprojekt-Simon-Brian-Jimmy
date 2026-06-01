## Datenbank
 - **Prostgrespl**: Neueste Version runtergeladen und eingerichtet soweit ich konnte. (?? dbAdmin ??)

## Backend
- **RegisterPage**: Passwort-Wiederholung, Gender-Dropdown, Geburtsdatum hinzugefügt.

- **Register-CSS**: Placeholder zentriert, Design für Inputs/Selects angepasst.

Füge hier die konkreten Dateipfade ein, damit du jederzeit zum Code springen kannst!

---

**Remote vs Local — Frontend Vergleich (automatisch erstellt)**

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

## Letzte Änderungen (28.05.2026)

- [README.md](README.md) - die wichtigsten Projektinfos sind jetzt unten mit klickbaren Links zusammengefasst.
- [MERGE_WORKFLOW.md](MERGE_WORKFLOW.md) - der Merge von `components` nach `main` ist dokumentiert und sauber abgeschlossen.
- [FavoritesSection.tsx](frontend/src/components/main/FavoritesSection.tsx) - Favoriten bleiben im 4er-Carousel und lassen sich gesammelt oder einzeln löschen.
- [Animal.tsx](frontend/src/components/animals/Animal.tsx) - Checkboxen synchronisieren den Favoriten-Status.
- [favouritesService.ts](frontend/src/services/favouritesService.ts) - zentrale Favoriten-API.
- [favorites.routes.ts](backend/src/routes/favorites.routes.ts) - Backend liefert Favoriten eindeutig zurück.
- [UserFavoritAnimalModel.ts](backend/src/db/models/UserFavoritAnimalModel.ts) - eindeutige Favoriten-Join-Table.
- [Animalcopy.module.css](frontend/src/components/animals/Animalcopy.module.css) - aktuell aktive Animal-Styles.

Kurz gesagt: Das ist die aktuelle Aufgabenlage, die ihr beim nächsten Weitermachen direkt wiederfinden könnt.

- [favorites.routes.ts](backend/src/routes/favorites.routes.ts) - Favoriten werden serverseitig 
dedupliziert, doppelte `addFavorite`-Aufrufe werden abgefangen und die Antwort bleibt eindeutig.

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

## Letzte Änderungen (28.05.2026)

- [README.md](README.md) - die wichtigsten Projektinfos sind jetzt unten mit klickbaren Links zusammengefasst.
- [MERGE_WORKFLOW.md](MERGE_WORKFLOW.md) - der Merge von `components` nach `main` ist dokumentiert und sauber abgeschlossen.
- [FavoritesSection.tsx](frontend/src/components/main/FavoritesSection.tsx) - Favoriten bleiben im 4er-Carousel und lassen sich gesammelt oder einzeln löschen.
- [Animal.tsx](frontend/src/components/animals/Animal.tsx) - Checkboxen synchronisieren den Favoriten-Status.
- [favouritesService.ts](frontend/src/services/favouritesService.ts) - zentrale Favoriten-API.
- [favorites.routes.ts](backend/src/routes/favorites.routes.ts) - Backend liefert Favoriten eindeutig zurück.
- [UserFavoritAnimalModel.ts](backend/src/db/models/UserFavoritAnimalModel.ts) - eindeutige Favoriten-Join-Table.
- [Animalcopy.module.css](frontend/src/components/animals/Animalcopy.module.css) - aktuell aktive Animal-Styles.

Kurz gesagt: Das ist die aktuelle Aufgabenlage, die ihr beim nächsten Weitermachen direkt wiederfinden könnt.




## Letzte Änderungen (27.05.2026)
Tag: Dienstag, 27.05.2026

Kurz gesagt: Alles, was wir heute am Wetter-Container, an den SVG-Icons, an den Favoriten und an den Wetter-Typen angepasst haben, steht hier unten mit klickbaren Links.

- [WeatherSection.tsx](frontend/src/components/main/WeatherSection.tsx) - Die Wetteranzeige nutzt jetzt englische Datumsangaben statt deutscher Wochentage.

- [InlineSVG.tsx](frontend/src/components/ui/InlineSVG.tsx) - SVGs werden inline geladen, damit SMIL-Animationen im Wetter-Icon laufen.

- [weather.css](frontend/src/styles/weather.css) - Das Weather-Layout nutzt feste 7 Spalten für den Forecast und ist optisch beruhigt.

- [favorites.css](frontend/src/styles/favorites.css) - Favoriten haben das gleiche ruhige Blur-Layout bekommen und der Delete-Button wurde größer gemacht.

- [Weather.ts](frontend/src/types/Weather.ts) - Wetter-Typen wurden um `current.time` und `weather_code` erweitert.

## Letzte Änderungen (28.05.2026)

- [FavoritesSection.tsx](frontend/src/components/main/FavoritesSection.tsx) - Favoriten laufen als 4er-Carousel, mit Select-all und Batch-Löschung.

- [Animal.tsx](frontend/src/components/animals/Animal.tsx) - Favoriten-Checkboxen werden mit dem Favoriten-Status synchron gehalten.

- [favouritesService.ts](frontend/src/services/favouritesService.ts) - Zentrale API für Laden, Speichern und Löschen der Favoriten.

- [favorites.routes.ts](backend/src/routes/favorites.routes.ts) - Serverseite für eindeutige Favoriten ohne Duplikate.

- [UserFavoritAnimalModel.ts](backend/src/db/models/UserFavoritAnimalModel.ts) - Join-Table für Favoriten mit Unique-Index auf `userId` + `animalId`.

- [LandingPage.tsx](frontend/src/pages/LandingPage.tsx) und [useUser.ts](frontend/src/hooks/useUser.ts) - Authentifizierte Nutzer landen direkt wieder auf der Main-Page.

- [Animalcopy.module.css](frontend/src/components/animals/Animalcopy.module.css) - Aktive Styles für die Animal-Ansicht.

Kurz gesagt: Das ist der aktuelle Stand zu Favoriten, Login-Persistenz, Animal-Ansicht und dem aufgeräumten Merge nach `main`.

Auftrag morgen das Design für die about Seite. ( ?? Vogelperspektive Malediven ??) und Brian fragen wieso er die Animalcopy.module.css erstellt hat und wofür er dann die andere braucht.

## Letzte Änderungen (Freitag, 29. Mai 2026)

- **Favorites — Platzhalterbild skaliert & ausgerichtet:** [frontend/src/styles/favorites.css](frontend/src/styles/favorites.css) — Das leere-Favorites-Placeholder-Bild wurde herunter skaliert (Höhe reduziert), auf links ausgerichtet (`object-position: left center`) und `object-fit: contain` gesetzt; die Card-Höhe wurde angepasst, damit das Layout wieder kompakter wirkt.

- **Favorites — Textposition & Stil:** [frontend/src/styles/favorites.css](frontend/src/styles/favorites.css) · [frontend/src/components/main/FavoritesSection.tsx](frontend/src/components/main/FavoritesSection.tsx) — Der Leerzustandstext ("Noch keine Favoriten / Wähle Tiere über die Favoriten-Checkbox aus") wurde ganz rechts außen und vertikal mittig im Card-Container positioniert (absolute Positionierung). Die Titelschrift wurde vergrößert (`.favorite-common-name` mit `clamp()`), der wissenschaftliche Name hat eine eigene Farbe.

- **Favorites — Blur entfernt:** [frontend/src/styles/favorites.css](frontend/src/styles/favorites.css) — Alle verbliebenen weichen Blur-Effekte auf dem Favorites-Panel und dem Placeholder-Bild wurden entfernt (`backdrop-filter: none`, `filter: none`), damit das Bild scharf dargestellt wird.

- **Favorites — Sofort-Update / Sync:** [frontend/src/components/main/FavoritesSection.tsx](frontend/src/components/main/FavoritesSection.tsx) — Die Komponente reagiert jetzt unmittelbar auf das `favourites-changed`-Event und entfernt entfernte Favoriten sofort aus der Ansicht (lokales Filtern + Nachladen der Liste).

- **Auth/Register — Register-Button:** [frontend/src/components/auth/RegisterButton.tsx](frontend/src/components/auth/RegisterButton.tsx) · [frontend/src/styles/landing.css](frontend/src/styles/landing.css) — Der Register-Button wurde mit einer speziellen Klasse versehen und der Hover-Blur wurde an das Design der anderen Auth-Buttons angepasst (stärkeres Hover-Backdrop für bessere Konsistenz).

- **Validierung:** Geänderte CSS-Dateien wurden auf Syntax geprüft — keine Fehler gemeldet.

- **Language Flags & LanguageSwitcher:** [frontend/public/images/flags/de.svg](frontend/public/images/flags/de.svg), [frontend/public/images/flags/en.svg](frontend/public/images/flags/en.svg), [frontend/public/images/flags/fr.svg](frontend/public/images/flags/fr.svg), [frontend/public/images/flags/es.svg](frontend/public/images/flags/es.svg), [frontend/public/images/flags/cn.svg](frontend/public/images/flags/cn.svg) · [frontend/src/components/layout/LanguageSwitcher.tsx](frontend/src/components/layout/LanguageSwitcher.tsx) — Flaggen-SVGs wurden hinzugefügt und `LanguageSwitcher` auf bildbasierte Flags umgestellt (Fallback auf Emojis möglich). Pfad-Rendering wurde korrigiert, sodass die Flags nicht mehr als Text angezeigt werden.

- **About Page — Redesign & Styles:** [frontend/src/pages/AboutPage.tsx](frontend/src/pages/AboutPage.tsx) · [frontend/src/styles/AboutPage.css](frontend/src/styles/AboutPage.css) — About-Page wurde so überarbeitet, dass die Container dem MainPage-Layout entsprechen, inklusive responsiver Hintergrundbilder (`background-about-page.png`) für Desktop/Tablet/Mobile, dunklerem Blur für Feature-Karten und höherem Textkontrast.

- **Favorites / Events / Services (Code):** [frontend/src/services/favouritesService.ts](frontend/src/services/favouritesService.ts) · [frontend/src/components/main/FavoritesSection.tsx](frontend/src/components/main/FavoritesSection.tsx) · [frontend/src/components/animals/Animal.tsx](frontend/src/components/animals/Animal.tsx) — `favouritesService` dispatcht jetzt ein `favourites-changed` CustomEvent mit `{ action, animalId }`; die Favorites-Komponente reagiert darauf sofort und synct die Anzeige; `Animal.tsx` hört auf das Event, sodass Checkboxen konsistent bleiben.


Kurzbeschreibung: Heute lag der Fokus auf Feinschliff im Favorites-Bereich (sichtbares Placeholder-Bild, Bildausrichtung, Entfernen von Blur, bessere Textplatzierung, größere Titel-Schrift) sowie einer kleinen Anpassung am Register-Button. Alle Änderungen sind oben per Link verlinkt, damit du direkt in die betroffenen Dateien springen kannst.



## Vorbereitung für die Präsentation am Dienstag (02.06.2026):

zu vorbereiten ist e-mail adresse ist geöffnet.

### Simon
- Powerpointpräsentationen/ Canvaspräsentation 3 sheeds:

    - Vorstellung Projektmitglieder
    - über unsere Seite

- Webseite im Browser präsentieren:

### Jimmy
    - Präsentieren als Gast Account
        - Mehrsprachigkeit der Seite erwähnen und kurz zeigen.
        - sagen und zeigen, dass man keine Favoriten hinterlegen kann.

    - Registrierung live machen.
        - Login-maske zeigen
        - Erwähnen das es ein Wetter-liveticker ist.
        - Erklärung und zeigen wie das mit dem Vorteil eines Accounts und eingelogt ist ( !!! nur die Favoriten mit delete  etc !!!)
    
### Brian
    - Animals Seite zeigen uund erklären (klick auf Bild, create, connect und Ergebnis zeigen)
    - Searchbar Ergebnisse zeigen.

### Simon
    - Profilseite zeigen und erkläeren (Profilbild, Daten ändern, Default Avatar)

    - Abschlußslides
        - Tech-stack
        - zukünftige features max. 3 
        -Verabschiedung

    ## Letzte Änderungen (01.06.2026)

    - **Kurz:** Gäste können Favoriten nicht speichern. Beim Versuch zeigt die Seite einen zentralen, zentrierten Hinweis-Banner im Header an (einzeilig, mit `!!` davor/danach). Die Umsetzung ist responsive und nutzt eine eigene CSS-Klasse.

    - **Betroffene Dateien (klickbar):**
        - [frontend/src/components/layout/MainNavigation.tsx](./frontend/src/components/layout/MainNavigation.tsx)
        - [frontend/src/styles/MainNavigation.css](./frontend/src/styles/MainNavigation.css)
        - [frontend/src/components/animals/Animal.tsx](./frontend/src/components/animals/Animal.tsx)
        - [frontend/src/components/animals/ListOfAnimals.tsx](./frontend/src/components/animals/ListOfAnimals.tsx)
        - [frontend/src/services/favouritesService.ts](./frontend/src/services/favouritesService.ts)
        - [frontend/src/locales/de.ts](./frontend/src/locales/de.ts)
        - [frontend/src/locales/en.ts](./frontend/src/locales/en.ts)
        - [frontend/src/locales/fr.ts](./frontend/src/locales/fr.ts)
        - [frontend/src/locales/es.ts](./frontend/src/locales/es.ts)
        - [frontend/src/locales/ar.ts](./frontend/src/locales/ar.ts)
        - [frontend/src/locales/zh.ts](./frontend/src/locales/zh.ts)

    - **Erläuterung:**
        - Wenn ein nicht authentifizierter Benutzer versucht, ein Tier als Favorit zu markieren, wird die Aktion abgefangen und stattdessen ein `favorite-login-required` CustomEvent ausgelöst.
        - Die `MainNavigation`-Komponente lauscht auf dieses Event und zeigt einen vollbreiten Banner (`.nav-favorite-banner`) mit der Nachricht an. Die eigentliche Nachricht trägt die Klasse `.nav-favorite-message`.
        - Die Nachricht wird einzeilig angezeigt und ist mit `!!` eingerahmt (`!! Nachricht !!`). Auf sehr kleinen Bildschirmen darf sie umbrechen (responsive rule).

    - **Code‑Beispiele (Stellen beginnen mit dem Kommentar "Hinweis für Gäste")**

        Animal (relevanter Auszug):

        ```tsx
        // Hinweis für Gäste: Verhindere Favorit-Aktion und sende das Hinweis-Event
        if (!authService.isAuthenticated()) {
            window.dispatchEvent(new Event('favorite-login-required'));
            return;
        }
        // Hinweis für Gäste: ansonsten Favorite-API aufrufen
        await favouritesService.saveFavoriteAnimal(animalId);
        ```

        ListOfAnimals (relevanter Auszug):

        ```tsx
        // Hinweis für Gäste: Blockiere Favorit in der Liste und sende Event
        if (!authService.isAuthenticated()) {
            window.dispatchEvent(new Event('favorite-login-required'));
            return;
        }
        // Hinweis für Gäste: Authentifizierte Nutzer führen normalen Speichervorgang aus
        await favouritesService.saveFavoriteAnimal(animalId);
        ```

        MainNavigation (relevanter Auszug):

        ```tsx
        // Hinweis für Gäste: Listener zeigt Banner für kurze Zeit an
        useEffect(() => {
            const handleFavoriteLoginRequired = () => {
                setFavoriteHintVisible(true);
                window.setTimeout(() => setFavoriteHintVisible(false), 4000);
            };
            window.addEventListener('favorite-login-required', handleFavoriteLoginRequired);
            return () => window.removeEventListener('favorite-login-required', handleFavoriteLoginRequired);
        }, []);
        ```

        CSS (Wichtige Klassen):

        ```css
        /* Hinweis für Gäste: Banner-Wrapper, zentriert unter dem Header */
        .nav-favorite-banner { width:100%; display:flex; justify-content:center; padding:0 16px 12px; }

        /* Hinweis für Gäste: Der Textcontainer - einzeilig, mit !! umrahmt */
        .nav-favorite-message { white-space:nowrap; width:fit-content; max-width:calc(100vw - 32px); }
        ```

    - **Warum so:** Zentraler Banner vermeidet Duplikate in einzelnen Komponenten und liefert konsistente User-Feedback für Gäste. Die Event-basierte Lösung hält die Komponenten locker gekoppelt.

    Wenn du möchtest, committe ich die README-Änderung mit einer Commit-Nachricht wie `docs: add 01.06.2026 favorite-guest banner notes`.



