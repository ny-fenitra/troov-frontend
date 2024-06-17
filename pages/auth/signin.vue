<template>
  <form class="login auth-form" @submit.prevent="signin">
    <h3 class="mb-4">Sign in</h3>
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
    <SubmitButton class="w-100" :loading="isLoading">Sign in</SubmitButton>
    <div>
      Don't have an account?
      <router-link :to="{ name: 'auth-signup' }">Sign up</router-link>
    </div>
  </form>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth' });

const email = useState('email', () => '');
const password = useState('password', () => '');

const isLoading = useState('isLoading', () => false);

const rules = ref([
  {
    key: 'email',
    message: 'Email is required',
    isValid: () => !!email.value?.trim(),
  },
  {
    key: 'email',
    message: 'Email must be valid',
    isValid: () => !email.value?.trim() || isEmailValid(email.value),
  },
  {
    key: 'password',
    message: 'Password is required',
    isValid: () => !!password.value?.trim(),
  },
]);

const { errors, validate } = useFormErrorHandling(rules);

const signin = async () => {
  isLoading.value = true;

  validate();

  if (!Object.keys(errors.value).length) {
    const { error } = await useAuthService().signin({
      email: email.value,
      password: password.value,
    });

    if (error) {
      password.value = '';
    }
  }

  isLoading.value = false;
};
</script>

<style scoped lang="scss"></style>
