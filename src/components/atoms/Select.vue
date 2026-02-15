<template>
  <select
    :class="[
      baseClasses,
      variantClasses,
      sizeClasses,
      customClasses
    ]"
    v-bind="$attrs"
    v-model="model"
  >
    <slot />
  </select>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'success', 'warning', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  customClasses: {
    type: String,
    default: ''
  }
});

const emits = defineEmits(['update:modelValue']);

const model = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value)
});

const baseClasses = 'rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-full appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:1rem_1rem] border-2';

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'default':
      return 'bg-surface text-text-primary border-border focus:border-primary focus:ring-primary';
    case 'success':
      return 'bg-surface text-text-primary border-success focus:border-success focus:ring-success';
    case 'warning':
      return 'bg-surface text-text-primary border-warning focus:border-warning focus:ring-warning';
    case 'danger':
      return 'bg-surface text-text-primary border-danger focus:border-danger focus:ring-danger';
    default:
      return 'bg-surface text-text-primary border-border focus:border-primary focus:ring-primary';
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-1.5 pr-8 text-sm';
    case 'md':
      return 'px-4 py-2 pr-10 text-base';
    case 'lg':
      return 'px-6 py-3 pr-12 text-lg';
    default:
      return 'px-4 py-2 pr-10 text-base';
  }
});
</script>

<style scoped>
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
}
</style>