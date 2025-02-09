<template>
  <div class="relative">
    <input
        type="text"
        placeholder="Поиск по имени"
        class="px-4 py-2 mr-5 w-96 rounded-lg shadow-md focus:outline-none focus:border-green-700"
        v-model="searchQuery"
    />
    <button
        class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        @click="visitorsStore.openPopup()"
    >
      Добавить
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useVisitorsStore } from '@/stores/visitorsStores.js';

const visitorsStore = useVisitorsStore();

const searchQuery = computed({
  get: () => visitorsStore.searchQuery,
  set: (value) => visitorsStore.setSearchQuery(value),
});
</script>