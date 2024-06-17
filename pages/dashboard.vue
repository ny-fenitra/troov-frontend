<template>
  <main :key="route.fullPath" class="main d-flex flex-column">
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
  flex: 1;
  padding: 20px;
}
</style>
