<template>
  <table
    :class="[
      baseClasses,
      variantClasses,
      customClasses
    ]"
    v-bind="$attrs"
  >
    <slot />
  </table>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'striped', 'bordered'].includes(value)
  },
  customClasses: {
    type: String,
    default: ''
  }
});

const baseClasses = 'min-w-full divide-y divide-border border border-border rounded-lg';

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'default':
      return '';
    case 'striped':
      return 'divide-y divide-border';
    case 'bordered':
      return 'border border-border divide-y divide-border';
    default:
      return '';
  }
});
</script>