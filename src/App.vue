<script setup lang="ts">
import { ref } from 'vue'
import { useNotes } from './composables/useNotes.js'
import SearchBar from './components/SearchBar.vue'
import NoteForm from './components/NoteForm.vue'
import NoteCard from './components/NoteCard.vue'
import type { Note } from './types/note'

const { addNote, deleteNote, filteredNotes } = useNotes()

// searchTerm als Ref weitergeben, damit filteredNotes reaktiv darauf reagieren kann
const searchTerm = ref('')
const notes = filteredNotes(searchTerm)

function handleAdd(note: Omit<Note, 'id'>) {
  addNote(note)
}
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1 class="app-title">QuickNotes</h1>
      <SearchBar v-model="searchTerm" />
    </header>

    <NoteForm @add="handleAdd" />

    <main class="notes-grid">
      <p v-if="notes.length === 0" class="empty-state">
        {{ searchTerm ? 'Keine Notizen gefunden.' : 'Noch keine Notizen. Leg eine oben an!' }}
      </p>
      <NoteCard
        v-for="note in notes"
        :key="note.id"
        :note="note"
        @delete="deleteNote"
      />
    </main>
  </div>
</template>

<style scoped>
.app {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.app-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.app-title {
  margin: 0;
  font-size: 1.75rem;
  white-space: nowrap;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}

.empty-state {
  color: #888;
  grid-column: 1 / -1;
  margin: 0;
}
</style>
