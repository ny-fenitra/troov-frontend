<template>
  <form class="login auth-form" @submit.prevent="signup">
    <h3 class="mb-4">Sign up</h3>
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
    <TextInput
      v-model="password"
      v-model:errors="errors.password"
      label="Password"
      type="password"
      name="password"
      :required="true"
    />
    <TextInput
      v-model="confirmPassword"
      v-model:errors="errors.confirmPassword"
      label="Confirmation password"
      type="password"
      name="confirm-password"
      :required="true"
    />
    <SubmitButton class="w-100" :loading="isLoading">Sign up</SubmitButton>
    <div>
      Already have an account?
      <router-link :to="{ name: 'auth-signin' }">Sign in</router-link>
    </div>
  </form>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth' });

const firstname = useState('firstname', () => '');
const lastname = useState('lastname', () => '');
const email = useState('email', () => '');
const password = useState('password', () => '');
const confirmPassword = useState('confirmPassword', () => '');

const isLoading = useState('isLoading', () => false);

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
    isValid: () => !!(password.value?.trim() || confirmPassword.value?.trim()),
  },
  {
    key: 'confirmPassword',
    message: 'Confirmation password is required',
    isValid: () => !!(password.value?.trim() || confirmPassword.value?.trim()),
  },
  {
    key: 'password',
    message: "Password & confirmation password don't match",
    isValid: () => password.value === confirmPassword.value,
  },
  {
    key: 'confirmPassword',
    message: "Password & confirmation password don't match",
    isValid: () => password.value === confirmPassword.value,
  },
]);

const { errors, validate } = useFormErrorHandling(rules);

const signup = async () => {
  isLoading.value = true;

  validate();

  if (!Object.keys(errors.value).length) {
    const { error } = await useAuthService().signup({
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });

    if (error) {
      errors.value = error;
    }
  }

  isLoading.value = false;
};
</script>

<style scoped lang="scss"></style>
