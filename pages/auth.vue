<template>
  <Suspense @resolve="resolve">
    <NuxtPage />
  </Suspense>
</template>

<script setup lang="ts">
import useGlobalStore from '../stores/global';

definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
});

const { globalLoading } = storeToRefs(useGlobalStore());

const resolve = () => {
  globalLoading.value = false;
};
</script>
