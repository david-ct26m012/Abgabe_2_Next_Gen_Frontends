import { computed } from 'vue'
import { useLocalStorage } from './useLocalStorage.js'

export function useNotes() {
  const notes = useLocalStorage('quicknotes', [])

  function addNote(note) {
    notes.value.push({ ...note, id: Date.now() })
  }

  function deleteNote(id) {
    notes.value = notes.value.filter(n => n.id !== id)
  }

  // term ist ein Ref<string> – so kann computed reaktiv darauf reagieren
  function filteredNotes(term) {
    return computed(() => {
      if (!term.value) return notes.value
      const lower = term.value.toLowerCase()
      return notes.value.filter(n =>
        n.title.toLowerCase().includes(lower) ||
        n.content.toLowerCase().includes(lower) ||
        n.tags.some(t => t.toLowerCase().includes(lower))
      )
    })
  }

  return { notes, addNote, deleteNote, filteredNotes }
}
