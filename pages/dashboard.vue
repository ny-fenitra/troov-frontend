<template>
  <main :key="route.fullPath" class="main d-flex flex-column fit-content">
    <Suspense @resolve="resolve">
      <NuxtPage />

      <template #fallback>
        <Loader />
      </template>
    </Suspense>
  </main>
</template>

<script setup lang="ts">
import useGlobalStore from '../stores/global';

definePageMeta({
  middleware: ['logged'],
});

const route = useRoute();

const { globalLoading } = storeToRefs(useGlobalStore());

const resolve = () => {
  globalLoading.value = false;
};
</script>

<style lang="scss" scoped>
.main {
  background-color: $secondary;
  padding: 20px;
}
</style>
