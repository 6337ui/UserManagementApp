<template>
  <tr
    :class="[
      baseClasses,
      variantClasses,
      customClasses
    ]"
    v-bind="$attrs"
  >
    <slot />
  </tr>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'hoverable'].includes(value)
  },
  customClasses: {
    type: String,
    default: ''
  }
});

const baseClasses = '';

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'hoverable':
      return 'hover:bg-surface transition-colors cursor-pointer';
    default:
      return '';
  }
});
</script>