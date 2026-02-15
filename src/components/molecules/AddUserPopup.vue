<template>
  <Container
    v-if="isOpen"
    variant="default"
    :customClasses="'z-10 fixed inset-0 bg-black/30 flex justify-center items-center'"
  >
    <Container variant="surface" :customClasses="'w-[1461px] rounded-lg shadow-lg relative'">
      <Button
        variant="secondary"
        size="sm"
        :customClasses="'absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full'"
        @click="closePopup"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
          />
        </svg>
      </Button>
      <h2 class="text-xl font-bold mb-6 text-center text-text-primary">{{ isEditMode ? 'Редактировать пользователя' : 'Добавить пользователя' }}</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4 text-text-primary">
        <div class="grid grid-cols-12 gap-x-4 gap-y-4 self-auto">
          <Label :customClasses="labelClasses">ФИО</Label>
          <Input
            v-model="formData.name"
            type="text"
            variant="default"
            size="md"
            :customClasses="inputClasses"
            required
          />

          <Label :customClasses="labelClasses">Компания</Label>
          <Input
            v-model="formData.company"
            type="text"
            variant="default"
            size="md"
            :customClasses="inputClasses"
            required
          />

          <Label :customClasses="labelClasses">Группа</Label>
          <Select
            v-model="formData.group"
            variant="default"
            size="md"
            :customClasses="inputClasses"
            required
          >
            <option value="" disabled selected>Выберите группу</option>
            <option value="Группа А">Группа А</option>
            <option value="Группа Б">Группа Б</option>
            <option value="Группа В">Группа В</option>
            <option value="Группа Г">Группа Г</option>
            <option value="Группа Д">Группа Д</option>
            <option value="Группа Е">Группа Е</option>
          </Select>

          <Label :customClasses="labelClasses">Присутствие</Label>
          <input type="checkbox" v-model="formData.presence" :class="checkboxClasses" />

          <Button
            type="submit"
            variant="primary"
            size="md"
            :customClasses="buttonPrimaryClasses"
          >
            {{ isEditMode ? 'Сохранить' : 'Добавить' }}
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="md"
            :customClasses="buttonSecondaryClasses"
            @click="closePopup"
          >
            Закрыть
          </Button>
        </div>
      </form>
    </Container>
  </Container>
</template>

<script setup>
import { computed, watch, reactive } from 'vue';
import { useVisitorsStore } from '@/stores/visitorsStores.js';
import Button from '@/components/atoms/Button.vue';
import Input from '@/components/atoms/Input.vue';
import Select from '@/components/atoms/Select.vue';
import Label from '@/components/atoms/Label.vue';
import Container from '@/components/atoms/Container.vue';

const visitorsStore = useVisitorsStore();

// Grid layout classes
const labelClasses = 'col-start-3 col-span-2';
const inputClasses = 'col-span-6 col-start-5';
const checkboxClasses = 'items-center col-start-5 mr-[54px]';
const buttonPrimaryClasses = 'col-start-3 col-span-2';
const buttonSecondaryClasses = 'col-span-2';

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