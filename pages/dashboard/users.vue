<template>
  <div class="users d-flex flex-column fit-content gap-4">
    <div class="page-header d-flex justify-content-between">
      <h3>Users</h3>

      <button
        class="btn btn-primary text-white"
        data-bs-toggle="modal"
        data-bs-target="#userFormModal"
      >
        Create user
      </button>
    </div>

    <Datatable
      :headers="[
        { label: 'Firstname', key: 'firstname' },
        { label: 'Lastname', key: 'lastname' },
        { label: 'Email', key: 'email' },
        { label: 'Role', key: 'role' },
      ]"
      :get-items="getItems"
      :delete-item="deleteItems"
      @update:to-edit="updateToEdit"
    />

    <div
      id="userFormModal"
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="userFormModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <form class="modal-content" @submit.prevent="save">
          <div class="modal-header">
            <h1 id="userFormModalLabel" class="modal-title fs-5">
              {{ toEdit ? 'Edit' : 'Create' }} user
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
              v-model="firstname"
              v-model:errors="errors.firstname"
              label="Firstname"
              name="firstname"
              :required="true"
            />
            <TextInput
              v-model="lastname"
              v-model:errors="errors.lastname"
              label="Lastname"
              name="lastname"
              :required="true"
            />
            <TextInput
              v-model="email"
              v-model:errors="errors.email"
              label="Email"
              name="email"
              :required="true"
            />
            <SelectInput
              v-model="role"
              label="Role"
              name="role"
              :required="true"
              :options="Object.values(RoleEnum)"
              :normalizer="(obj: any) => ({ value: obj, label: obj })"
            />
            <TextInput
              v-model="password"
              v-model:errors="errors.password"
              label="Password"
              type="password"
              name="password"
              :required="!toEdit"
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
import type { User } from '~/utils/models';

const route = useRoute();

definePageMeta({
  middleware: ['admin'],
});

const { getItems, deleteItems, createItem, getItem, updateItem } =
  useResourceService<User, UserCriteria>('users');

const isLoading = ref(false);
const isContentLoading = ref(false);

const firstname = ref('');
const lastname = ref('');
const email = ref('');
const password = ref('');
const role = ref(RoleEnum.CLIENT);

const toEdit = ref<string | undefined>();

const updateToEdit = (id: string) => {
  toEdit.value = id;
  userFormModal.show();
};

const rules = ref([
  {
    key: 'firstname',
    message: 'Firstname is required',
    isValid: () => !!firstname.value?.trim(),
  },
  {
    key: 'lastname',
    message: 'Lastname is required',
    isValid: () => !!lastname.value?.trim(),
  },
  {
    key: 'email',
    message: 'Email must be valid',
    isValid: () => !email.value?.trim() || isEmailValid(email.value),
  },
  {
    key: 'email',
    message: 'Email is required',
    isValid: () => !!email.value?.trim(),
  },
  {
    key: 'password',
    message: 'Password is required',
    isValid: () => !!toEdit.value || !!password.value?.trim(),
  },
]);

const { errors, validate } = useFormErrorHandling(rules);

let userFormModal: any = null;
const { $bs } = useNuxtApp();

onMounted(() => {
  userFormModal = new ($bs as any).Modal(
    document.getElementById('userFormModal'),
  );

  document
    .getElementById('userFormModal')
    ?.addEventListener('hidden.bs.modal', () => {
      firstname.value = '';
      lastname.value = '';
      email.value = '';
      password.value = '';
      role.value = RoleEnum.CLIENT;
      toEdit.value = undefined;
    });

  document
    .getElementById('userFormModal')
    ?.addEventListener('show.bs.modal', async () => {
      if (toEdit.value) {
        isContentLoading.value = true;

        const { data } = await getItem(toEdit.value);

        if (data?.success) {
          firstname.value = data.item.firstname;
          lastname.value = data.item.lastname;
          email.value = data.item.email;
          role.value = data.item.role;
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
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        password: password.value || undefined,
        role: role.value,
      });

      if (data?.success) {
        navigateTo({
          name: 'dashboard-users',
          query: {
            ...route.query,
            _key: getRandomValue(),
          },
        });
      }
    } else {
      const { data } = await createItem({
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        password: password.value,
        role: role.value,
      });

      if (data?.success) {
        navigateTo({
          name: 'dashboard-users',
          query: { ...route.query, _key: getRandomValue() },
        });
      }
    }

    userFormModal.toggle();
    isLoading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
