<template>
  <label
    :class="[
      baseClasses,
      sizeClasses,
      customClasses
    ]"
    v-bind="$attrs"
  >
    <slot />
  </label>
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

const baseClasses = 'font-medium';

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-sm';
    case 'md':
      return 'text-base';
    case 'lg':
      return 'text-lg';
    default:
      return 'text-base';
  }
});
</script>