<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    class="search-bar"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    placeholder="Suchen nach Titel, Text oder Tag ..."
  />
</template>

<style scoped>
.search-bar {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  min-width: 200px;
}

.search-bar:focus {
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}
</style>
