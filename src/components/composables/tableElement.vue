<template>
  <component :is="tag" :class="getClass(tag)">
    <slot />
  </component>
</template>

<script setup>
defineProps({
  tag: {
    type: String,
    required: true,
    validator: (value) => ['th', 'td', 'tr'].includes(value),
  },
});

const classes = {
  th: 'py-2 px-4 text-xs font-semibold text-[#4E3000] text-left border-b-4 border-[#E9E9E9] shadow-xl',
  td: 'py-3 px-4 text-sm',
  tr: '',
};

const getClass = (tag) => classes[tag];
</script>

