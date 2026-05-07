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
- Beispielbild: Dunkel: https://chatgpt.com/s/m_69fc4add4c2c8191acda4885c8c595bd Hell: https://chatgpt.com/s/m_69fc4d3fb3cc8191a083aa669101405e
### Aufbau:
- Alles auf Englisch schreiben!
- Website
    - Header für Login/Logout bzw. Registrierung
    - Homepage 
    - Unterseiten
        
        - Profil
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
            - Componenten
        - Simon
            - Backend
        - Brian
            - Datenbank