# Änderungen am [Dienstag, 12.05.2026]

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

Details (lokale Versionen):

### frontend/src/styles/login.css

```css
.login-page {
	min-height: 100vh;
	width: 100%;

	background-image: url("./images/desktop/login-diver-desktop.png");
	Die vollständigen Unified-Diffs sind ausgelagert in [frontend-diffs.md](frontend-diffs.md).
// Lokale Version mit Remember-Checkboxen, Back-Button und Cancel-Button
import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import "../styles/login.css";

function LoginPage() {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [rememberUsername, setRememberUsername] = useState(false);
	const [rememberPassword, setRememberPassword] = useState(false);

	/* ... (gekürzt) ... */
}

export default LoginPage;
```

### frontend/src/pages/RegisterPage.tsx

```tsx
// Lokale Version mit Back-Button, BirthDate picker & tooltip
import { useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import "../styles/register.css";

function RegisterPage() {
	/* ... (gekürzt) ... */
}

export default RegisterPage;
```

Hinweis: In der README habe ich längere Dateien gekürzt (`... (gekürzt) ...`) um die Lesbarkeit zu erhalten. Wenn du vollständige Diffs möchtest (Unified diff) oder alle Dateien komplett einfügen soll, sage kurz Bescheid — ich kann die README stattdessen mit vollständigen Diff-Blocks ergänzen.

Wenn du möchtest, kann ich die geänderten Stellen auch als präzise Unified-Diffs einfügen und Zeilennummern verlinken.

---

### Full Unified Diffs (vollständige Änderungen)

Die folgenden Abschnitte enthalten die vollständigen Unified-Diffs zwischen deiner lokalen Arbeitskopie und dem Remote-Stand (kopiert aus dem temporären Clone).

<details>
<summary>Frontend — vollständige Diffs (klicken zum Öffnen)</summary>


```
<!-- FULL DIFFS START -->

# Full Unified Diffs — frontend (generated 16.05.2026 18:38)


## frontend/src/styles/login.css

diff --git "a/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\frontend\\src\\styles\\login.css" "b/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\remote_repo_today\\frontend\\src\\styles\\login.css"
index 67332fb..e9a2f03 100644
--- "a/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\frontend\\src\\styles\\login.css"
+++ "b/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\remote_repo_today\\frontend\\src\\styles\\login.css"
@@ -23,7 +23,7 @@
 .login-page p {
	position: relative;
	z-index: 1;
-  color: #e6f7ff;
+  color: #ffffff;
 }

 .login-title {
@@ -31,11 +31,8 @@
	margin-bottom: 1.5rem;

	font-size: clamp(2rem, 5vw, 3rem);
-  color: #f4fbff;

-  text-shadow:
-    0 0 12px rgba(126, 231, 255, 0.35),
-    0 8px 28px rgba(0, 0, 0, 0.55);
+  text-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
 }

 .login-form {
@@
 /* HANDY QUER */
 @media (max-height: 500px) and (orientation: landscape) {
	.login-page {
	  background-image: url("./images/handy/login-diver-mobile.png");

---


## frontend/src/styles/register.css

diff --git "a/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\frontend\\src\\styles\\register.css" "b/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\remote_repo_today\\frontend\\src\\styles\\register.css"
index 76d9c3c..53a3c61 100644
--- "a/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\frontend\\src\\styles\\register.css"
+++ "b/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\remote_repo_today\\frontend\\src\\styles\\register.css"
@@ -33,7 +33,7 @@
	display: flex;
	flex-direction: column;
	align-items: center;
-  gap: 0.2rem;
+  gap: 1rem;
 
	padding: 2rem;
	border-radius: 20px;
@@
 ---

## frontend/src/styles/landing.css

diff --git "a/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\frontend\\src\\styles\\landing.css" "b/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\remote_repo_today\\frontend\\src\\styles\\landing.css"
index b3521b6..d137ed3 100644
--- "a/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\frontend\\src\\styles\\landing.css"
+++ "b/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\remote_repo_today\\frontend\\src\\styles\\landing.css"
@@ -24,7 +24,7 @@
  
	border-radius: 32px;
	background: transparent;
-  backdrop-filter: none;
+  backdrop-filter:none;
  }
@@
	transform: translateY(-2px) scale(1.03);
 }

---

## frontend/src/pages/LoginPage.tsx

diff --git "a/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\frontend\\src\\pages\\LoginPage.tsx" "b/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\remote_repo_today\\frontend\\src\\pages\\LoginPage.tsx"
index b1ed29e..7b2311c 100644
--- "a/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\frontend\\src\\pages\\LoginPage.tsx"
+++ "b/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\remote_repo_today\\frontend\\src\\pages\\LoginPage.tsx"
@@ -1,4 +1,4 @@
-import { useEffect, useState, type FormEvent } from "react";
+import { useState, type FormEvent } from "react";
 import { Link, useNavigate } from "react-router-dom";
 import { authService } from "../services/authService";
 import "../styles/login.css";
@@
 ---

## frontend/src/pages/RegisterPage.tsx

diff --git "a/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\frontend\\src\\pages\\RegisterPage.tsx" "b/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\remote_repo_today\\frontend\\src\\pages\\RegisterPage.tsx"
index e7eca98..f90f135 100644
--- "a/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\frontend\\src\\pages\\RegisterPage.tsx"
+++ "b/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\remote_repo_today\\frontend\\src\\pages\\RegisterPage.tsx"
@@ -1,4 +1,4 @@
-import { useRef, useState, type FormEvent } from "react";
+import { useState, type FormEvent } from "react";
 import { Link, useNavigate } from "react-router-dom";
 import { authService } from "../services/authService";
 import "../styles/register.css";

---

<!-- FULL DIFFS END -->
```

</details>

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




Weil wir was in unserer Datenbank veränert/gemacht haben  muss ich  jetzt erstmal das die alles machen. Arbeitsablaufplan inklusiv Powershell bitte. Ich muss resten.

 Um datenbank anzulegen:
    - ganz wichtig: postgresql muss laufen! (systemctl start postgresql)
    - wenn resetet werden muss, im backendordner: npx sequelize-cli db:migrate:undo:all
    - erst migrieren: in den backend ordner und dann im terminal: npx sequelize-cli db:migrate
    - dann seed durchlaufen lassen: npm run seed

    Ich habe bereits ein Account auf der Datenbank Prostsql.