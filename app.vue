<template>
  <div>
    <GlobalLoader v-if="globalLoading" />
    <NuxtLayout>
      <Suspense>
        <NuxtPage />
      </Suspense>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import useGlobalStore from './stores/global';

const { globalLoading } = storeToRefs(useGlobalStore());
</script>
