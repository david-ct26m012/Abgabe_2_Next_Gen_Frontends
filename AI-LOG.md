# AI-LOG

Dokumentation des AI-Einsatzes für Hausübung 2 (QuickNotes).

---

- Prompt: "Wie implementiere ich in Vue 3 ein v-model auf einer eigenen Komponente?"
  Übernommen: das `defineProps(['modelValue'])` + `emit('update:modelValue', ...)` Muster in `SearchBar.vue`
  Geändert/verstanden: Prop heißt `modelValue`, weil Vue das bei `v-model` erwartet. Emit löst den Update aus statt direkter Prop-Mutation, weil Props read-only sind.

- Prompt: "Wie funktioniert ein benannter Slot in Vue 3?"
  Übernommen: `<slot name="header" />` in `BaseCard.vue` und `<template #header>` in `NoteCard.vue`
  Geändert/verstanden: `v-if="$slots.header"` prüft, ob der Slot befüllt ist, damit kein leeres div gerendert wird.

- Prompt: "Wie kann ein Composable reaktiv auf einen Ref aus der Komponente reagieren?"
  Übernommen: Konzept, den Ref selbst (nicht `.value`) an `filteredNotes(term)` zu übergeben, damit das interne `computed` den Ref tracken kann.
  Geändert/verstanden: Wenn man `.value` übergeben würde, wäre es ein statischer String – kein reaktives Update mehr.

- Prompt: "TypeScript defineProps mit Interface in Vue 3 script setup"
  Übernommen: `defineProps<{ note: Note }>()` Syntax in `NoteCard.vue`
  Geändert/verstanden: `Omit<Note, 'id'>` in `NoteForm.vue`, weil die id erst im Composable (via `Date.now()`) vergeben wird, nicht im Formular.

- Prompt: "localStorage watch deep Vue 3"
  Übernommen: `watch(value, ..., { deep: true })` in `useLocalStorage.js`
  Geändert/verstanden: `deep: true` ist nötig, weil `notes` ein Array ist und Vue sonst nur Referenzwechsel, nicht innere Änderungen (push/filter) beobachtet.
