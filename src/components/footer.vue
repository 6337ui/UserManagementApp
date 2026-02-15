<script setup>
import { computed } from 'vue';
import { useVisitorsStore } from '@/stores/visitorsStores.js';
import Button from '@/components/atoms/Button.vue';
import Container from '@/components/atoms/Container.vue';

const visitorsStore = useVisitorsStore();
const filters = computed(() => visitorsStore.filters);

const selectedFilter = computed({
  get: () => visitorsStore.selectedFilter,
  set: (value) => visitorsStore.setSelectedFilter(value),
});
</script>

<template>
  <Container variant="default" :customClasses="'p-4 flex items-center'">
    <h1 class="text-lg font-bold mr-5">Фильтровать по:</h1>
    <Container variant="default" :customClasses="'flex flex-wrap gap-2'">
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
        <Button
            :variant="selectedFilter === filter ? 'secondary' : 'ghost'"
            size="md"
            :customClasses="'text-sm'"
            @click="selectedFilter = filter"
        >
          {{ filter }}
        </Button>
      </label>
    </Container>
  </Container>
</template>