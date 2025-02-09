<template>
  <div class="mt-6 overflow-x-auto">
    <table class="min-w-full">
      <thead>
      <TableElement tag="tr">
        <TableElement tag="th">Номер</TableElement>
        <TableElement tag="th">ФИО</TableElement>
        <TableElement tag="th">Компания</TableElement>
        <TableElement tag="th">Группа</TableElement>
        <TableElement tag="th">Присутствие</TableElement>
      </TableElement>
      </thead>
      <tbody>
      <TableElement
          v-for="(row, index) in filteredData"
          :key="index"
          tag="tr"
          @click="openEditModal(row)"
          class="cursor-pointer hover:bg-gray-100 transition-colors"
      >
        <TableElement tag="td">{{ row.number }}</TableElement>
        <TableElement tag="td">{{ row.name }}</TableElement>
        <TableElement tag="td">{{ row.company }}</TableElement>
        <TableElement tag="td">{{ row.group }}</TableElement>
        <TableElement tag="td">
            <span :class="presenceClass(row.presence)">
              {{ row.presence ? 'Присутствует' : 'Отсутствует' }}
            </span>
        </TableElement>
      </TableElement>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useVisitorsStore } from '@/stores/visitorsStores.js';
import { storeToRefs } from 'pinia';
import TableElement from '@/components/composables/tableElement.vue';

const visitorsStore = useVisitorsStore();
const { tableData, selectedFilter, searchQuery } = storeToRefs(visitorsStore);

const filteredData = computed(() =>
    tableData.value.filter((item) => {
      if (selectedFilter.value === 'Отсутствующие' && item.presence) return false;
      if (selectedFilter.value === 'Присутствующие' && !item.presence) return false;
      if (searchQuery.value.trim()) {
        return item.name.toLowerCase().includes(searchQuery.value.toLowerCase());
      }
      return true;
    })
);

const presenceClass = (presence) =>
    presence ? 'text-green-500 font-medium' : 'text-red-500 font-medium';

const openEditModal = (user) => {
  visitorsStore.openPopup(user);
};
</script>