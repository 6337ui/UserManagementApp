<template>
  <div class="text-right">
    <h1 class="text-lg font-bold">Посетители</h1>
    <div class="text-sm font-bold">
      <span class="text-green-400">{{ currentVisitors }}</span>
      /
      <span class="text-red-400">{{ absentVisitors }}</span>
    </div>
  </div>
</template>

<script setup>
import {useVisitorsStore} from '@/stores/visitorsStores.js';
import {storeToRefs} from 'pinia';

const visitorsStore = useVisitorsStore();
const {currentVisitors, absentVisitors} = storeToRefs(visitorsStore);
</script>