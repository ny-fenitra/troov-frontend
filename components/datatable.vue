<template>
  <div class="datatable fit-content d-flex flex-column">
    <div class="scroll-content">
      <table class="table">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header.key" scope="col">
              {{ header.label }}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in rows" :key="item._id">
            <td v-for="header in headers" :key="header.key" scope="col">
              {{ item[header.key] }}
            </td>
            <td>
              <a class="edit-icon" @click="$emit('update:to-edit', item._id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil text-primary me-3"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
                  />
                </svg>
              </a>

              <a
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
                class="delete-icon"
                @click.prevent="toDelete = item._id"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash3 text-danger"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
                  />
                </svg>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Paginator :total-pages="totalPages" />

    <!-- Delete modal -->
    <div
      id="deleteModal"
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 id="deleteModalLabel" class="modal-title fs-5">
              Delete item ?
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete this item ?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <SubmitButton
              type="button"
              class="btn btn-danger"
              :loading="isLoading"
              @click="remove"
            >
              Delete</SubmitButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  headers: { key: string; label: string }[];
  getItems: (query?: { page?: number; limit?: number }) => Promise<{
    data: Paginate<any> | null;
    error: any;
  }>;
  deleteItem: (id: string) => Promise<{
    data: Payload | null;
    error: any;
  }>;
}

const { $bs } = useNuxtApp();

const props = defineProps<Props>();

defineEmits(['update:to-edit']);

const route = useRoute();

const page = computed(() => parseInt(route.query.page as string) || 1);
const limit = computed(() => parseInt(route.query.limit as string) || 10);

const totalPages = ref<number | null>(1);

const rows = ref<any>();

const getData = async () => {
  const { data } = await props.getItems({
    page: page.value,
    limit: limit.value,
  });

  if (data) {
    rows.value = data.rows;
    totalPages.value = data.totalPages;
  }
};

await getData();

const toDelete = ref<string | undefined>();
const isLoading = ref(false);

let deleteModal: any = null;

onMounted(() => {
  deleteModal = new ($bs as any).Modal(document.getElementById('deleteModal'));
});

const remove = async () => {
  if (toDelete.value) {
    isLoading.value = true;
    const { data } = await props.deleteItem(toDelete.value);

    if (data?.success) {
      deleteModal.toggle();
      await getData();
    }

    isLoading.value = false;
  }
};
</script>

<style scoped lang="scss">
.table {
  th,
  td {
    background-color: $secondary;
    color: white;
    border-bottom: 1px solid $border-dark;
    padding: 20px;
  }

  th {
    font-weight: 900;
  }

  .delete-icon,
  .edit-icon {
    cursor: pointer;
  }
}
</style>
