<template>
  <thead
    :class="[
      baseClasses,
      customClasses
    ]"
    v-bind="$attrs"
  >
    <slot />
  </thead>
</template>

<script setup>
const baseClasses = '';
const customClasses = defineProps({
  customClasses: {
    type: String,
    default: ''
  }
});
</script>