<template>
  <div class="objects d-flex flex-column fit-content gap-4">
    <div class="page-header d-flex justify-content-between">
      <h3>Objects</h3>

      <button
        class="btn btn-primary text-white"
        data-bs-toggle="modal"
        data-bs-target="#objectFormModal"
      >
        Create object
      </button>
    </div>

    <Datatable
      :headers="[
        { label: 'Name', key: 'name' },
        { label: 'Description', key: 'description' },
      ]"
      :get-items="getItems"
      :delete-item="deleteItems"
      @update:to-edit="updateToEdit"
    />

    <div
      id="objectFormModal"
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="objectFormModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <form class="modal-content" @submit.prevent="save">
          <div class="modal-header">
            <h1 id="objectFormModalLabel" class="modal-title fs-5">
              {{ toEdit ? 'Edit' : 'Create' }} object
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div v-if="isContentLoading" class="modal-body">
            <Loader />
          </div>
          <div v-else class="modal-body">
            <TextInput
              v-model="name"
              v-model:errors="errors.name"
              label="Name"
              name="name"
              :required="true"
            />
            <TextInput
              v-model="description"
              v-model:errors="errors.description"
              label="Description"
              name="description"
              :required="true"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <SubmitButton class="btn btn-danger" :loading="isLoading">
              Save</SubmitButton
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ObjectInterface } from '~/utils/models';

const route = useRoute();

const { getItems, deleteItems, createItem, getItem, updateItem } =
  useResourceService<ObjectInterface, ObjectCriteria>('objects');

const isLoading = ref(false);
const isContentLoading = ref(false);

const name = ref('');
const description = ref('');

const toEdit = ref<string | undefined>();

const updateToEdit = (id: string) => {
  toEdit.value = id;
  objectFormModal.show();
};

const rules = ref([
  {
    key: 'name',
    message: 'Name is required',
    isValid: () => !!name.value?.trim(),
  },
  {
    key: 'description',
    message: 'Description is required',
    isValid: () => !!description.value?.trim(),
  },
]);

const { errors, validate } = useFormErrorHandling(rules);

let objectFormModal: any = null;
const { $bs } = useNuxtApp();

onMounted(() => {
  objectFormModal = new ($bs as any).Modal(
    document.getElementById('objectFormModal'),
  );

  document
    .getElementById('objectFormModal')
    ?.addEventListener('hidden.bs.modal', () => {
      name.value = '';
      description.value = '';
      toEdit.value = undefined;
    });

  document
    .getElementById('objectFormModal')
    ?.addEventListener('show.bs.modal', async () => {
      if (toEdit.value) {
        isContentLoading.value = true;

        const { data } = await getItem(toEdit.value);

        if (data?.success) {
          name.value = data.item.name;
          description.value = data.item.description;
        } else {
          toEdit.value = undefined;
        }

        isContentLoading.value = false;
      }
    });
});

const save = async () => {
  validate();

  if (!Object.keys(errors.value).length) {
    isLoading.value = true;

    if (toEdit.value) {
      const { data } = await updateItem(toEdit.value, {
        name: name.value,
        description: description.value,
      });

      if (data?.success) {
        navigateTo({
          name: 'dashboard-objects',
          query: { ...route.query, _key: getRandomValue() },
        });
      }
    } else {
      const { data } = await createItem({
        name: name.value,
        description: description.value,
      });

      if (data?.success) {
        navigateTo({
          name: 'dashboard-objects',
          query: { ...route.query, _key: getRandomValue() },
        });
      }
    }

    objectFormModal.toggle();
    isLoading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
