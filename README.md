# Abschlussprojekt-Simon-Brian-Jimmy
## Idee:
### Meeresfauna der Malediven
- Umfassender Katalog: Anzeige und Suchfunktion für alle Meeresbewohner der Malediven.
- Informationsquelle: Detaillierte Fakten und biologische Informationen zu jeder einzelnen Art.
- Visuelle Darstellung: Hochwertige Bilder, Fotos oder Illustrationen zu jedem Tier zur leichten Identifizierung.
- Zielgruppe: Primär Touristen, die die Malediven besuchen (Schnorchler, Taucher und Naturinteressierte).
- B2B-Strategie & Kooperationen:

- Partnerschaften mit Resorts vor Ort, die die App als digitalen Inselführer für ihre Gäste anbieten.
Werbeflächen für Partner: Resorts können sich innerhalb der App präsentieren.
Resort-Präsentation: Darstellung der Partner-Resorts mit ansprechenden Fotos von Strandvillen und der Umgebung.
 - Standortdaten & Sichtungen:

- Vorkommen: Informationen darüber, in welchen Regionen oder bei welchen Resorts bestimmte Meeresbewohner am häufigsten zu finden sind.
Interaktive Karte: Visuelle Übersicht der Atolle mit Markierungen für Tiersichtungen und die Standorte der Partner-Resorts.
User-Sichtungen (Nice-to-have): Optionale Funktion für Nutzer, eigene Sichtungen mit Fotos hochzuladen (späterer Ausbauschritt).
 - Benutzerkonto & Personalisierung:

- Registrierung, Login- und Logout-Funktion.
Historie: Übersicht der zuletzt angesehenen Meeresbewohner.
Favoriten: Speichern bestimmter Tiere in einer persönlichen Merkliste.
 - Social Features:

- Teilen-Funktion: Direktes Teilen von Entdeckungen und Tier-Steckbriefen über soziale Medien oder Messenger.
- Beispielbild - Webseite: 
    - Hell: https://chatgpt.com/s/m_6a0ac766caac81918df23356f4af0c67
- Beispielbild - App:
    - Dunkel: https://chatgpt.com/s/m_69fc4add4c2c8191acda4885c8c595bd 
    - Hell: https://chatgpt.com/s/m_69fc4d3fb3cc8191a083aa669101405e
### Aufbau:
- Rechte System user/gast user sieht alles, gast nur beiträge ohne comments und bewertung
- Alles auf Englisch schreiben!
- Website
    - Header für Login/Logout bzw. Registrierung
    - Homepage -> Katalog
    - Unterseiten
        
        - Benutzer Profil
            - Seit wann dabei
            - Name
            - Wie oft da
            - Sichtungen
            - Favoriten
            - Mitreisende/"Freunde"
            - Bewertungen
            - Errungenschaften 
        - Katalog
            - Was ist wo
            - Tierart
            - Zuletzt gesehen
            - Einzelnes Tier
                - Favorit hinzufügen
                - Wo
                - Feinde
                - Futter
                - Gefährdung
                - Größe etc. (Allgemeine Daten)
                - Bilder von anderen
        

### Was nutzen?
- React 
- express
    - JWT + bcrypt in Express
- postgresql
- css

### Wer macht was bis wann?
- Woche 1 bis 11. Mai grobes backend und frontend
    - haupt componenten erstellen
    - server.ts erstellen
    - router erstellen
        - für jede unterseite
    - Models für datenbank
    - db.ts
        - Jimmy
            - haupt componenten erstellen
        - Simon
            - Backend
        - Brian
            - Datenbank
                - Lebewesen, user, Ort, Models
            - sequelize
- Woche 2 bis 18. Mai
    - Jimmy
        - weiter frontend       
    - Simon 
        - backend mit frontend verbinden (loginbutton/registerButton mit backend)
        - header-layout fürs main-layot erstellen 
            - Navigation (ohne Suchfunktion)
                - logo der Webseite
                - animals
                - login/logout
                - profil
                - language
                - about
        - About- sowie Profilseite erstellen   
    - Brian
        - backend mit datenbank verbinden
    ```
    ALLGEMEIN: 
    - Übers Wochenende überlegen, welche Rollen (user, admin, ..) könnten wichtig für unsere Webseite sein und wie könnte jede einzelne Rolle definiert sein
    ```

    Um datenbank anzulegen:
    - ganz wichtig: postgresql muss laufen! (systemctl start postgresql)
    - wenn resetet werden muss, im backendordner: npx sequelize-cli db:migrate:undo:all
    - erst migrieren: in den backend ordner und dann im terminal: npx sequelize-cli db:migrate
    - dann seed durchlaufen lassen: npm run seed

    Bzgl. Admin Rolle geben:
    - backend/src/scripts/makeAdmin.ts email durch deine email mit der du dich registriert hast ersetzen
    - npm run make-Admin
    
    Rollen verwenden:
    - gibt die middleware im ornder middlewares (roleMiddleware.ts)
    - die kann für alle rollen genutzt werden
    - einfach beim nutzen die rolle als parameter übergeben die gebraucht wird. bpsw. ("admin")

    Create Seiten:
    Sind soweit fertig, sollten nur für Admin nutzbar und sichtbar sein

### Tiere und Locatins hinzufügen, was muss ich beachten?
- Erst Lesen!
-  gibt sonst probleme weil jeder eine lokale datenbank hat. Beispiel:
    - Jimmy fügt ein tier hinzu -> bekommt aktuell Id 11
    - Simon fügt auch ein tier hinzu -> bekommt auch Id 11 (Weil die datenbank ja bei jedem lokal läuft)
    - 2x animal mit Id 11 => fehler, datenbank reset
- Außerdem: die datenbank wird eh noch einmal final resetet wenn ich den emailbranch merge samstag oder Montag
- was von Brian bis Montag Vormittag erledigt sein wird:
    - Animal Location Verbidung auch über seite (gemacht)
    - One Pie.. äh Datenbank für alle. 
- wenn über seite gemacht: alles weg davon.
- du willst trotzdem was hinzufügen?
- du musst über die seed datei gehen und es da eintragen
- vorteil: bei dem finalem reset sind die daten trotzdem noch im seed, damit nicht verloren und werden beim nächsten npm run seed wieder hinzugefügt
- nachteil: bevor du npm run seed machst erst wieder undun und migrieren, dann seeden
- gaaanz oben in der seed funktion sind die beispiele für Tiere und Location einfach kopieren und ausfüllen. 
- Beziehungen zwischen Animal und Location:
    ```ts
    await AnimalLocationModel.create({
  animalId: animalx.id, //die id deines tieres
  locationId: locationx.id, //die id der location zu der es gehört. Wenn es zu mehreren gehört muss es für jede Location gemacht werden
  rarity: "rare",
    });

