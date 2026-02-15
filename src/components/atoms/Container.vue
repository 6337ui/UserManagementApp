<template>
  <div
    :class="[
      baseClasses,
      variantClasses,
      sizeClasses,
      customClasses
    ]"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'background', 'surface'].includes(value)
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

const baseClasses = '';

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'default':
      return 'bg-transparent text-text-primary border border-transparent';
    case 'primary':
      return 'bg-primary text-white';
    case 'secondary':
      return 'bg-secondary text-white';
    case 'success':
      return 'bg-success text-white';
    case 'warning':
      return 'bg-warning text-white';
    case 'danger':
      return 'bg-danger text-white';
    case 'background':
      return 'bg-background text-text-primary border border-border';
    case 'surface':
      return 'bg-surface text-text-primary border border-border';
    default:
      return 'bg-transparent text-text-primary border border-transparent';
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'p-2';
    case 'md':
      return 'p-4';
    case 'lg':
      return 'p-6';
    default:
      return 'p-4';
  }
});
</script>