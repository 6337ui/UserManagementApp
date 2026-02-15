<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :class="[
      baseClasses,
      variantClasses,
      sizeClasses,
      customClasses
    ]"
    v-bind="$attrs"
    v-model="model"
  />
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
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

const baseClasses = 'rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-full';

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'default':
      return 'bg-surface text-text-primary border border-border focus:border-primary focus:ring-primary';
    case 'success':
      return 'bg-surface text-text-primary border border-success focus:border-success focus:ring-success';
    case 'warning':
      return 'bg-surface text-text-primary border border-warning focus:border-warning focus:ring-warning';
    case 'danger':
      return 'bg-surface text-text-primary border border-danger focus:border-danger focus:ring-danger';
    default:
      return 'bg-surface text-text-primary border border-border focus:border-primary focus:ring-primary';
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-1.5 text-sm';
    case 'md':
      return 'px-4 py-2 text-base';
    case 'lg':
      return 'px-6 py-3 text-lg';
    default:
      return 'px-4 py-2 text-base';
  }
});
</script>