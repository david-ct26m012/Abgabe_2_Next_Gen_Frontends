# QuickNotes – Hausübung 2

**Student:** David Scheucher  
**Matrikelnummer:** [Hier eintragen]  
**Lehrveranstaltung:** Next Generation Web Frontends – FH Technikum Wien

---

## Setup-Anleitung

```bash
# 1. Repository klonen
git clone <repo-url>
cd KleinesGeruest

# 2. Abhängigkeiten installieren
npm install

# 3. Entwicklungsserver starten
npm run dev
```

Die App läuft dann unter der im Terminal angezeigten Adresse (standardmäßig `http://localhost:5173`).


## Technologien

- **Framework:** Vue 3 (Composition API / `<script setup>`)
- **Sprache:** TypeScript
- **Build-Tool:** Vite

---

## Struktur und Begründung

Die gesamte Notiz-Logik (Liste, Hinzufügen, Löschen, Filtern) liegt in `composables/useNotes.js`, die Persistenz in `composables/useLocalStorage.js`. Komponenten rufen nur diese Funktionen auf – sie verwalten keinen eigenen State. Das trennt *Was wird angezeigt* (Komponente) von *Wie funktioniert es* (Composable) und macht beides einzeln leichter zu lesen und zu testen. Würde die Logik direkt in `App.vue` liegen, wäre sie bei einer späteren Erweiterung schwerer herauszulösen.

---

## Reflexionsfragen

**1. Warum darf `NoteCard` die Notiz-Prop nicht selbst verändern, und wie löst ihr das stattdessen?**

In Vue fließen Props immer nur von der Eltern- zur Kindkomponente, man darf sie in der Kindkomponente nicht direkt ändern. Das hab ich anfangs nicht ganz verstanden, aber wenn `NoteCard` einfach die Prop überschreiben würde, wüsste `App.vue` nichts davon und der State wäre inkonsistent. Deswegen schickt `NoteCard` beim Klick auf Löschen ein Event mit der `id` nach oben, und `App.vue` ruft dann `deleteNote(id)` auf – die eigentliche Änderung passiert also im Composable, nicht in der Karte selbst.

**2. Was passiert, wenn zwei Komponenten dasselbe `useNotes()` aufrufen – teilen sie sich die Notizen oder nicht?**

Ich hab das kurz ausprobiert bzw. nachgedacht: Nein, sie teilen sich den State nicht automatisch. Jedes Mal wenn man `useNotes()` aufruft, wird ein neuer Ref erstellt – die beiden Instanzen sind also voneinander unabhängig. In dieser App ist das kein Problem, weil nur `App.vue` das Composable aufruft und alles per Props/Events weitergibt. Wenn man aber wirklich einen globalen State bräuchte, müsste man den Ref außerhalb der Funktion deklarieren oder gleich Pinia verwenden.

**3. Wozu dient das `Note`-Interface, wenn der Code auch ohne liefe?**

Ehrlich gesagt hab ich das Interface am Anfang für unnötig gehalten, aber es macht schon Sinn. Ohne Interface behandelt TypeScript das Objekt einfach als `any` und man merkt Fehler erst wenn die App läuft. Mit dem Interface sieht man sofort wenn z.B. die `id` fehlt oder ein falscher Typ übergeben wird – direkt beim Tippen im Editor. Besonders praktisch war das bei `Omit<Note, 'id'>` in `NoteForm`, weil das Formular ja noch keine `id` kennt und TypeScript einen sonst zwingen würde, eine mitzuschicken.

---
