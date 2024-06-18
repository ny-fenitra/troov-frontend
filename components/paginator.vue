<template>
  <nav v-if="totalPages" aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: page === 1 }">
        <button class="page-link" @click.prevent="goTo(--page)">
          Previous
        </button>
      </li>
      <li
        v-for="index in totalPages"
        :key="index"
        class="page-item"
        :class="{ active: index === page, disabled: page === index }"
      >
        <button class="page-link" @click.prevent="goTo(index)">
          {{ index }}
        </button>
      </li>
      <li class="page-item" :class="{ disabled: page === totalPages }">
        <button class="page-link" @click.prevent="goTo(++page)">Next</button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
interface Props {
  totalPages: number | null;
}

defineProps<Props>();

const route = useRoute();
const router = useRouter();

const page = computed(() => parseInt(route.query.page as string) || 1);

const goTo = (page: number) => {
  router.push({ query: { ...route.query, page } });
};
</script>

<style lang="scss" scoped>
.page-item {
  .page-link {
    background-color: $bg-color;
    color: white;
    border: 1px solid $border-dark;

    &.disabled {
      background-color: $secondary;
    }
  }

  &.active {
    .page-link {
      background-color: $primary;
    }
  }
}
</style>
