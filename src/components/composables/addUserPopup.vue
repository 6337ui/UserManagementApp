<template>
  <div v-if="isOpen" class="z-10 fixed inset-0 bg-black/30 flex justify-center items-center">
    <div class="bg-white w-[1461px] p-6 rounded-lg shadow-lg relative">
      <CloseButton @close="closePopup" />
      <h2 class="text-xl font-bold mb-6 text-center">{{ isEditMode ? 'Редактировать пользователя' : 'Добавить пользователя' }}</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4 text-[#4E3000]">
        <div class="grid grid-cols-12 gap-x-4 gap-y-4 self-auto">
          <label :class="[gridClasses.label, commonClasses.label]">ФИО</label>
          <input
              type="text"
              v-model="formData.name"
              :class="[gridClasses.input, commonClasses.input]"
              required
          />
          <label :class="[gridClasses.label, commonClasses.label]">Компания</label>
          <input
              type="text"
              v-model="formData.company"
              :class="[gridClasses.input, commonClasses.input]"
              required
          />
          <label :class="[gridClasses.label, commonClasses.label]">Группа</label>
          <select
              v-model="formData.group"
              :class="[gridClasses.input, commonClasses.input]"
              required
          >
            <option value="" disabled selected>Выберите группу</option>
            <option value="Группа А">Группа А</option>
            <option value="Группа Б">Группа Б</option>
            <option value="Группа В">Группа В</option>
          </select>
          <label :class="[gridClasses.label, commonClasses.label]">Присутствие</label>
          <input type="checkbox" v-model="formData.presence" :class="gridClasses.checkbox" />
          <button
              type="submit"
              :class="[gridClasses.buttonPrimary, commonClasses.button, 'bg-green-500 text-white hover:bg-green-600']"
          >
            {{ isEditMode ? 'Сохранить' : 'Добавить' }}
          </button>
          <button
              type="button"
              :class="[gridClasses.buttonSecondary, commonClasses.button, 'bg-gray-500 text-white hover:bg-gray-600']"
              @click="closePopup"
          >
            Закрыть
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, reactive } from 'vue';
import { useVisitorsStore } from '@/stores/visitorsStores.js';
import CloseButton from '@/components/composables/closeBtn.vue';

const visitorsStore = useVisitorsStore();

const commonClasses = {
  input: 'px-4 py-2 rounded-lg shadow-md focus:outline-none focus:border-green-500',
  label: 'self-center text-[#4E3000] text-[30px]',
  button: 'px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors',
};

const gridClasses = {
  label: 'col-start-3 col-span-2',
  input: 'col-span-6 col-start-5',
  checkbox: 'items-center col-start-5 mr-[54px]',
  buttonPrimary: 'col-start-3 col-span-2',
  buttonSecondary: 'col-span-2',
};

const isOpen = computed(() => visitorsStore.isPopupOpen);
const isEditMode = computed(() => !!visitorsStore.editingUser);

const formData = reactive({
  name: '',
  company: '',
  group: '',
  presence: false,
});

watch(
    () => visitorsStore.editingUser,
    (user) => {
      Object.assign(formData, user || { name: '', company: '', group: '', presence: false });
    }
);

const closePopup = () => {
  visitorsStore.closeEditPopup();
};

const handleSubmit = () => {
  if (isEditMode.value) {
    visitorsStore.updateVisitor({ ...formData });
  } else {
    visitorsStore.addVisitor({ ...formData });
  }
  closePopup();
};
</script>