<template>
  <button 
    :class="[
      baseClasses,
      variantClasses,
      sizeClasses,
      customClasses
    ]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'warning', 'danger', 'ghost'].includes(value)
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

const baseClasses = 'rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center font-medium';

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary text-white hover:bg-primary-light focus:ring-primary';
    case 'secondary':
      return 'bg-secondary text-white hover:bg-secondary-light focus:ring-secondary';
    case 'success':
      return 'bg-success text-white hover:bg-opacity-90 focus:ring-success';
    case 'warning':
      return 'bg-warning text-white hover:bg-opacity-90 focus:ring-warning';
    case 'danger':
      return 'bg-danger text-white hover:bg-opacity-90 focus:ring-danger';
    case 'ghost':
      return 'bg-transparent text-text-primary hover:bg-surface focus:ring-surface';
    default:
      return 'bg-primary text-white hover:bg-primary-light focus:ring-primary';
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