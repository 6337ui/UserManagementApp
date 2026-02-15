<template>
  <tbody
    :class="[
      baseClasses,
      customClasses
    ]"
    v-bind="$attrs"
  >
    <slot />
  </tbody>
</template>

<script setup>
const baseClasses = 'divide-y divide-border';
const customClasses = defineProps({
  customClasses: {
    type: String,
    default: ''
  }
});
</script>