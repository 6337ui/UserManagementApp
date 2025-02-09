<script setup>
import { computed } from 'vue';
import { useVisitorsStore } from '@/stores/visitorsStores.js';

const visitorsStore = useVisitorsStore();
const filters = computed(() => visitorsStore.filters);

const selectedFilter = computed({
  get: () => visitorsStore.selectedFilter,
  set: (value) => visitorsStore.setSelectedFilter(value),
});

</script>

<template>
  <footer class="p-4 flex items-center">
    <h1 class="text-lg font-bold mr-5">Фильтровать по:</h1>
    <div class="flex flex-wrap gap-2">
      <label
          v-for="filter in filters"
          :key="filter"
          class="relative inline-flex items-center"
      >
        <input
            type="radio"
            :value="filter"
            v-model="selectedFilter"
            class="absolute opacity-0 w-0 h-0"
            aria-label="Select filter: {{ filter }}"
        />
        <span
            :class="[
              'px-4 py-2 rounded-lg text-sm cursor-pointer transition-colors',
              selectedFilter === filter
                ? 'bg-gray-500 text-white'
                : 'text-black hover:bg-gray-500 hover:text-white'
            ]"
        >
          {{ filter }}
        </span>
      </label>
    </div>
  </footer>
</template>