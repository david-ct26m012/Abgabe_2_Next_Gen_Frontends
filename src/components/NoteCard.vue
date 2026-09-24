<script setup lang="ts">
import type { Note } from '../types/note'
import BaseCard from './BaseCard.vue'

defineProps<{ note: Note }>()
const emit = defineEmits<{ delete: [id: number] }>()
</script>

<template>
  <BaseCard>
    <template #header>
      <span class="note-title">{{ note.title }}</span>
      <button class="delete-btn" @click="emit('delete', note.id)" title="Notiz löschen">×</button>
    </template>
    <p class="note-content">{{ note.content }}</p>
    <div v-if="note.tags.length" class="tags">
      <span v-for="tag in note.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
  </BaseCard>
</template>

<style scoped>
.note-title {
  font-size: 1rem;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
  color: #999;
  padding: 0 0.25rem;
}

.delete-btn:hover {
  color: #e53e3e;
}

.note-content {
  margin: 0 0 0.75rem;
  white-space: pre-wrap;
  color: #444;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tag {
  background: #e8f0fe;
  color: #3b5bdb;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
}
</style>
