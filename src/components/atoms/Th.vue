<template>
  <th
    :class="[
      baseClasses,
      sizeClasses,
      customClasses
    ]"
    v-bind="$attrs"
  >
    <slot />
  </th>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
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

const baseClasses = 'text-left font-semibold text-text-secondary border-b border-border bg-surface';

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'p-2 text-sm';
    case 'md':
      return 'p-3 text-base';
    case 'lg':
      return 'p-4 text-lg';
    default:
      return 'p-3 text-base';
  }
});
</script>