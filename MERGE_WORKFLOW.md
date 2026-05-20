# Arbeitsablaufplan: Merge `components` → `main`

## Übersicht
Dieser Plan beschreibt die sicheren und sauberen Schritte, um den Branch `components` in den Branch `main` zu mergen.

- Vom eigenen BRANCH aus:     ----> (in diesem Fall components)

git add .
git commit -m " HIER REIN WAS GEMACHT WORDEN IST. IN KURZFASSUNG"
git push
git fetch

- In den main switchen:

git switch main
git merge components
git push

- In die components switchen:
git switch components
git fetch
git merge main


---

## Phase 1: Vorbereitung & Synchronisierung

### Schritt 1: Lokalen Status prüfen
```bash
cd Abschlussprojekt-Simon-Brian-Jimmy
git status
```
**Erwartet:** `nothing to commit, working tree clean` auf dem aktuellen Branch.

---

### Schritt 2: `main` aktualisieren
```bash
git fetch origin
git checkout main
git pull --ff-only origin main
```
**Erklärung:** Holt die neuesten Änderungen vom Remote-`main` Branch.

---

### Schritt 3: Backup anlegen (optional, aber empfohlen)
```bash
git branch backup/main-before-components-merge
```
**Erklärung:** Falls beim Merge Probleme auftreten, können wir auf diesen Stand zurückkehren.

---

## Phase 2: Merge durchführen

### Schritt 4: `components` in `main` mergen
```bash
git merge components --no-ff -m "chore: merge components branch into main"
```
**Erklärung:** 
- `--no-ff`: Erzeugt einen Merge-Commit (saubere Git-History)
- `-m "..."`: Commit-Nachricht direkt angeben

---

### Schritt 5: Auf Konflikte prüfen
```bash
git status
```
**Falls Konflikte auftauchen:**
1. Alle Konfliktdateien öffnen und manuell auflösen
2. Nach dem Auflösen:
```bash
git add -A
git commit -m "fix: resolve merge conflicts from components"
```

**Kein Konflikt?** → Weiter zu Schritt 6.

---

## Phase 3: Validierung & Tests

### Schritt 6: Lokales Bauen und Testen
```bash
cd frontend
npm install
npm run build
npm test
npm run lint
```
**Erklärung:** Stellt sicher, dass der Merge keine Fehler erzeugt hat.

---

### Schritt 7: Dev-Server kurz testen (optional)
```bash
npm run dev
```
- Im Browser: `http://localhost:5173` aufrufen
- Kurz prüfen, dass die App startet und die Landing-Page sichtbar ist
- Mit `Ctrl + C` beenden

---

## Phase 4: Änderungen pushen

### Schritt 8: Merge-Commit zum Remote pushen
```bash
cd ..
git push origin main
```
**Erwartet:** Erfolgreich (keine Fehler)

---

### Schritt 9: Remote-Status prüfen
```bash
git log --oneline --graph --decorate -n 10
```
**Erklärung:** Zeigt die Git-History mit dem neuen Merge-Commit.

---

## Phase 5: Cleanup (optional, aber empfohlen)

### Schritt 10: Lokale Backup-Branches löschen
```bash
# Backup-Branch löschen (wenn Merge erfolgreich)
git branch -D backup/main-before-components-merge
git branch -D backup/components-before-merge

# Feature-Branch nach Bedarf löschen (lokal)
git branch -d components
```

---

### Schritt 11: Remote Branches aufräumen (optional)
Wenn du den `components` Branch nicht mehr brauchst:
```bash
git push origin --delete components
```

---

## Fehlerbehebung

### Problem: Merge-Konflikte
**Lösung:**
```bash
# Konflikte manuell beheben, dann:
git add -A
git commit -m "fix: resolve merge conflicts"
```

### Problem: Merge schiefgegangen, komplett zurücksetzen
```bash
git merge --abort
git reset --hard origin/main
```

### Problem: Build oder Tests schlagen fehl nach Merge
1. Fehler im Editor prüfen
2. Dateien korrigieren
3. Erneut committen:
```bash
git add -A
git commit -m "fix: resolve build/test issues from merge"
git push origin main
```

---

## Zusammenfassung der Befehle (Quick Copy-Paste)

```bash
# Vorbereitung
git fetch origin
git checkout main
git pull --ff-only origin main

# Merge
git merge components --no-ff -m "chore: merge components branch into main"

# Validierung
cd frontend
npm install
npm run build

# Push
cd ..
git push origin main

# Cleanup (optional)
git branch -d components
git push origin --delete components
```

---

## Status nach erfolgreichem Merge

✅ `components` ist in `main` gemerged  
✅ Alle Tests bestanden  
✅ Changes sind auf Remote gepusht  
✅ Lokale Dateien sind sauber  

**Nächste Schritte:**
- Teamkollegen informieren, dass `main` aktualisiert wurde
- Bei Bedarf: Backend oder weitere Services deployen
- Optional: Release-Tag erstellen

---

**Erstellt:** 11.05.2026  
**Status:** Bereit für Merge
