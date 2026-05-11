# Vorgehensweise für die nächsten 5 Tage

## Ziel
In den nächsten fünf Tagen soll aus der Idee ein klarer, lauffähiger MVP entstehen. Der Fokus liegt auf einer stabilen technischen Basis, einem funktionierenden Login, einem ersten Katalog mit Tierdaten und einer sauberen Übergabe zwischen Frontend, Backend und Datenbank.

## Teamaufteilung
- **Jimmy:** Frontend, Seitenstruktur, UI-Komponenten, Styling, Zustände und API-Anbindung im Frontend.
- **Simon:** Backend, Express-Server, Authentifizierung, API-Routen, Validierung und Fehlerbehandlung.
- **Brian:** Datenbank, Sequelize-Modelle, Migrationen, Seed-Daten, Relationen und Datenstruktur.

## Tag 1: Grundgerüst und Projektstruktur
### Ziel
Die Basis steht: Frontend, Backend und Datenbank sind strukturiert, damit alle parallel arbeiten können.

### Aufgaben
- **Jimmy**
  - Lege die Hauptseiten im Frontend an: Landing Page, Main Page, Register Page, Profile Page und Catalog Page.
  - Erstelle die wichtigsten wiederverwendbaren Komponenten wie Navigation, Buttons, Cards und Section-Wrapper.
  - Richte eine erste einheitliche Design-Basis ein, damit die Seiten später zusammenpassen.

- **Simon**
  - Erstelle den Express-Server in `server.ts`.
  - Richte die ersten Router ein, zum Beispiel für Auth, Tiere und Resorts.
  - Baue eine einfache Middleware-Struktur für CORS, JSON-Verarbeitung und Fehlerbehandlung auf.

- **Brian**
  - Prüfe die Datenbankverbindung und die Sequelize-Konfiguration.
  - Lege die Grundmodelle an: User, Animal, Location und AnimalLocation.
  - Überprüfe die vorhandenen Migrationen und passe sie an die geplanten Daten an.

### Ergebnis am Tagesende
- Das Projekt ist in klare Zuständigkeiten aufgeteilt.
- Frontend, Backend und DB sind startklar.
- Jeder kann auf seiner Ebene weiterarbeiten, ohne auf Blocker zu stoßen.

## Tag 2: Authentifizierung und Datenbasis
### Ziel
Registrierung und Login funktionieren, und die Datenbank enthält die ersten sinnvollen Testdaten.

### Aufgaben
- **Jimmy**
  - Baue Login- und Registrierungsformulare mit validierten Eingaben.
  - Verbinde die Formulare mit den Backend-Endpunkten.
  - Zeige Ladezustände und Fehlermeldungen im UI an.

- **Simon**
  - Implementiere `POST /auth/register` und `POST /auth/login`.
  - Nutze `bcrypt` für Passwort-Hashing und JWT für den Login-Token.
  - Füge eine Auth-Middleware hinzu, damit geschützte Routen später abgesichert sind.

- **Brian**
  - Erstelle Seed-Daten für mehrere Tiere, Orte und mindestens einen Test-User.
  - Prüfe die Relationen zwischen Tieren und Orten.
  - Stelle sicher, dass die Migrationen sauber durchlaufen.

### Ergebnis am Tagesende
- Ein Benutzer kann sich registrieren und anmelden.
- Die Datenbank ist mit Testdaten befüllt.
- Das Team kann reale API-Antworten testen.

## Tag 3: Katalog und Tierdetails
### Ziel
Die erste fachliche Kernfunktion ist sichtbar: Tiere werden aus der API geladen und im Frontend dargestellt.

### Aufgaben
- **Jimmy**
  - Erstelle die Katalogansicht mit Tierkarten.
  - Baue eine Detailansicht für ein einzelnes Tier.
  - Ergänze einfache Funktionen wie „Zuletzt gesehen“ oder Favorit-Markierung im Frontend.

- **Simon**
  - Baue die Endpunkte `GET /animals` und `GET /animals/:id`.
  - Achte auf saubere JSON-Strukturen für das Frontend.
  - Ergänze bei Bedarf Filter oder einfache Suche.

- **Brian**
  - Optimiere die Abfragen mit den nötigen Includes für Orte und weitere Bezüge.
  - Prüfe, ob zusätzliche Felder für Bilder, Größe oder Gefährdung sinnvoll sind.
  - Stelle sicher, dass die Daten für die Detailansicht vollständig sind.

### Ergebnis am Tagesende
- Der Katalog zeigt echte Inhalte.
- Die Detailseite funktioniert für einzelne Tiere.
- Die Kernlogik zwischen Frontend und Backend ist verbunden.

## Tag 4: Profil, Favoriten und Rechte-System
### Ziel
Die persönliche Nutzerseite und erste geschützte Funktionen werden umgesetzt.

### Aufgaben
- **Jimmy**
  - Baue die Profilseite mit Favoriten, zuletzt angesehenen Tieren und statischen Profilinfos.
  - Passe das UI für eingeloggte Nutzer und Gäste an.
  - Sorge für ein sauberes responsives Layout.

- **Simon**
  - Implementiere geschützte Favoriten-Routen.
  - Ergänze Validierung und klare Statuscodes.
  - Setze das Rechte-System um: User sieht alles, Gäste bekommen eingeschränkte Inhalte.

- **Brian**
  - Ergänze bei Bedarf eine Favoriten-Tabelle oder passende Verknüpfungen.
  - Prüfe Constraints und Fremdschlüssel.
  - Achte darauf, dass die Datenstruktur erweiterbar bleibt.

### Ergebnis am Tagesende
- Profilseite und Favoriten sind vorbereitet oder bereits nutzbar.
- Das Rechte-System ist im Grundsatz umgesetzt.
- Der Zugriff auf geschützte Daten ist kontrolliert.

## Tag 5: Testen, Aufräumen und Präsentationsreife
### Ziel
Die Anwendung wird stabilisiert und für die Abgabe oder Präsentation vorbereitet.

### Aufgaben
- **Alle**
  - Testet den kompletten Flow: Startseite, Login, Katalog, Detailseite, Profil.
  - Sammelt Fehler und behebt nur die wichtigsten Probleme zuerst.
  - Führt eine gemeinsame Endkontrolle durch.

- **Jimmy**
  - Poliere das UI, vor allem Abstände, Typografie und mobile Darstellung.
  - Prüfe, ob alle Buttons, Karten und Seiten visuell zusammenpassen.

- **Simon**
  - Prüfe die API auf Fehlerfälle, Token-Verhalten und CORS.
  - Ergänze Dokumentation für Start- und Testbefehle.

- **Brian**
  - Kontrolliere die Migrationen und Seed-Daten ein letztes Mal.
  - Stelle sicher, dass die DB lokal reproduzierbar ist.

### Ergebnis am Tagesende
- Die Anwendung ist vorzeigbar.
- Die wichtigsten Funktionen sind getestet.
- Offene Restaufgaben sind klar dokumentiert.

## Täglicher Ablauf
- **Morgens:** Kurzes Stand-up mit Aufgabenverteilung und Blockern.
- **Tagsüber:** In kleinen Schritten arbeiten und möglichst oft lokal testen.
- **Am Abend:** Änderungen pushen, kurz reviewen und offene Fragen notieren.

## Prioritäten
1. Erst die technische Basis.
2. Dann Authentifizierung und Datenmodell.
3. Danach Katalog und Detailseiten.
4. Zum Schluss Profil, Favoriten und Feinschliff.

## Empfehlung für die Zusammenarbeit
- Arbeitet in kleinen Pull Requests.
- Eine Person pro Hauptbereich, aber regelmäßig gegenseitig prüfen.
- Erst den MVP stabil machen, dann Nice-to-haves wie Bilder, Sichtungen oder Social Features.

## Kurzfassung
Wenn ihr die fünf Tage sauber nutzt, habt ihr am Ende einen klaren MVP mit Basis-Frontend, funktionierendem Backend, sauberem Datenmodell und einer ersten nutzbaren Version der Meeresfauna-App.