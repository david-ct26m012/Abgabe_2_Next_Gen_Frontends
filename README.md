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

---

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

Props fließen in Vue immer von Eltern- zur Kindkomponente (Ein-Weg-Datenfluss). Würde `NoteCard` die Prop direkt mutieren, hätte das Elternelement (`App.vue`) keine Kenntnis davon, was zu inkonsistentem State führt. Stattdessen sendet `NoteCard` beim Klick auf „Löschen" ein `delete`-Event mit der `id` nach oben. `App.vue` empfängt dieses Event und ruft `deleteNote(id)` aus dem Composable auf – dort passiert die eigentliche Zustandsänderung.

**2. Was passiert, wenn zwei Komponenten dasselbe `useNotes()` aufrufen – teilen sie sich die Notizen oder nicht?**

Das kommt auf die Implementierung an. In *dieser* App ist `notes` ein Ref, der innerhalb von `useNotes()` durch `useLocalStorage('quicknotes', [])` erzeugt wird. Jeder Aufruf von `useNotes()` erstellt eine neue Instanz dieses Refs – sie teilen sich also *nicht* automatisch dieselbe reaktive Referenz. In dieser App ruft nur `App.vue` `useNotes()` auf und gibt den State per Props/Events weiter, weshalb es kein Problem ist. Soll State global geteilt werden, bräuchte man ein Singleton-Muster (z. B. den Ref außerhalb der Funktion deklarieren oder Pinia verwenden).

**3. Wozu dient das `Note`-Interface, wenn der Code auch ohne liefe?**

Das Interface macht den Datenfluss für den Compiler und für Entwickler sichtbar: Jede Komponente, die eine Notiz als Prop erhält oder emittiert (z. B. `NoteCard` mit `defineProps<{ note: Note }>()`), bekommt eine klare Garantie über die Form des Objekts. Fehler wie ein fehlender `id`-Wert oder ein falscher Typ fallen schon beim Schreiben des Codes auf, nicht erst zur Laufzeit. Ohne Interface würde TypeScript das Objekt als `any` behandeln – alle Typsicherheit geht verloren.

---
