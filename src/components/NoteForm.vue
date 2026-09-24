<script setup lang="ts">
import { ref } from 'vue'
import type { Note } from '../types/note'

const emit = defineEmits<{ add: [note: Omit<Note, 'id'>] }>()

const title = ref('')
const content = ref('')
const tagInput = ref('')

function submit() {
  if (!title.value.trim()) return
  const tags = tagInput.value
    .split(',')
    .map(t => t.trim())
    .filter(Boolean)
  emit('add', { title: title.value.trim(), content: content.value.trim(), tags })
  title.value = ''
  content.value = ''
  tagInput.value = ''
}
</script>

<template>
  <form class="note-form" @submit.prevent="submit">
    <input
      v-model="title"
      class="form-input"
      placeholder="Titel *"
      required
    />
    <textarea
      v-model="content"
      class="form-textarea"
      placeholder="Notiztext ..."
      rows="3"
    />
    <input
      v-model="tagInput"
      class="form-input"
      placeholder="Tags (kommagetrennt, z.B. Arbeit, Idee)"
    />
    <button type="submit" class="form-btn">Notiz hinzufügen</button>
  </form>
</template>

<style scoped>
.note-form {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  background: #fff;
  padding: 1.25rem;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.form-input,
.form-textarea {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  resize: vertical;
}

.form-input:focus,
.form-textarea:focus {
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.form-btn {
  align-self: flex-end;
  padding: 0.5rem 1.25rem;
  background: #4a90e2;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.form-btn:hover {
  background: #357abd;
}
</style>
