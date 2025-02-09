import { defineStore } from 'pinia';

export const FILTERS = {
  PRESENT: 'Присутствующие',
  ABSENT: 'Отсутствующие',
  NONE: 'Без фильтра',
};

export const useVisitorsStore = defineStore('visitors', {
  state: () => ({
    tableData: JSON.parse(localStorage.getItem('visitors') || '[]'),
    selectedFilter: FILTERS.NONE,
    searchQuery: '',
    filters: [FILTERS.ABSENT, FILTERS.PRESENT, FILTERS.NONE],
    isPopupOpen: false,
    editingUser: null,
  }),
  actions: {
    addVisitor(visitor) {
      this.tableData.push({
        number: this.tableData.length + 1,
        ...visitor,
      });
      this.saveToLocalStorage();
    },
    updateVisitor(updatedVisitor) {
      const index = this.tableData.findIndex((visitor) => visitor.number === updatedVisitor.number);
      if (index !== -1) {
        this.tableData[index] = { ...this.tableData[index], ...updatedVisitor };
        this.saveToLocalStorage();
      }
    },
    deleteVisitor(number) {
      this.tableData = this.tableData.filter((visitor) => visitor.number !== number);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      try {
        localStorage.setItem('visitors', JSON.stringify(this.tableData));
      } catch (error) {
        console.warn('Ошибка при сохранении в localStorage:', error);
      }
    },
    setSelectedFilter(filter) {
      this.selectedFilter = filter;
    },
    setSearchQuery(query) {
      this.searchQuery = query;
    },

    openPopup(user = null) {
      this.editingUser = user;
      this.isPopupOpen = true;
    },
    closeEditPopup() {
      this.editingUser = null;
      this.isPopupOpen = false;
    },
  },
  getters: {
    totalVisitors: (state) => state.tableData.length,
    currentVisitors: (state) =>
        state.tableData.filter((visitor) => visitor.presence).length,
    absentVisitors: (state) =>
        state.tableData.filter((visitor) => !visitor.presence).length,
    filteredVisitors: (state) => {
      const filterMap = {
        [FILTERS.PRESENT]: (visitor) => visitor.presence,
        [FILTERS.ABSENT]: (visitor) => !visitor.presence,
        [FILTERS.NONE]: () => true,
      };
      return state.tableData.filter(filterMap[state.selectedFilter] || (() => true));
    },
  },
});