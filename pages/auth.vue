<template>
  <NuxtPage />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
});
</script>
