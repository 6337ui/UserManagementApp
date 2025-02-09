<template>
  <header class="flex justify-between items-center p-4  text-black">
    <div class="flex items-center space-x-4">
      <Logo />
      <Search />
    </div>

    <Visitors />
  </header>
</template>

<script setup>
import Logo from '@/components/composables/logo.vue';
import Search from '@/components/composables/search.vue';
import Visitors from '@/components/composables/visitors.vue';
</script>

<style scoped>
/* Дополнительные стили, если нужны */
</style>