<template>
  <Container variant="default" :customClasses="'mt-6 overflow-x-auto'">
    <Table variant="default">
      <Thead>
        <Tr>
          <Th>Номер</Th>
          <Th>ФИО</Th>
          <Th>Компания</Th>
          <Th>Группа</Th>
          <Th>Присутствие</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr
          v-for="(row, index) in filteredData"
          :key="index"
          variant="hoverable"
          @click="openEditModal(row)"
        >
          <Td>{{ row.number }}</Td>
          <Td>{{ row.name }}</Td>
          <Td>{{ row.company }}</Td>
          <Td>{{ row.group }}</Td>
          <Td>
            <span :class="presenceClass(row.presence)">
              {{ row.presence ? 'Присутствует' : 'Отсутствует' }}
            </span>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  </Container>
</template>

<script setup>
import { computed } from 'vue';
import { useVisitorsStore } from '@/stores/visitorsStores.js';
import { storeToRefs } from 'pinia';
import Table from '@/components/atoms/Table.vue';
import Thead from '@/components/atoms/Thead.vue';
import Tbody from '@/components/atoms/Tbody.vue';
import Tr from '@/components/atoms/Tr.vue';
import Th from '@/components/atoms/Th.vue';
import Td from '@/components/atoms/Td.vue';
import Container from '@/components/atoms/Container.vue';

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
    presence ? 'text-success font-medium' : 'text-danger font-medium';

const openEditModal = (user) => {
  visitorsStore.openPopup(user);
};
</script>