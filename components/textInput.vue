<template>
  <div class="text-input mb-4">
    <label v-if="label" class="form-label" :class="{ required }" :for="name">
      {{ label }}
    </label>

    <!-- Form -->
    <input
      class="form-control"
      :class="{ 'is-invalid': errors?.length }"
      :type="type"
      :placeholder="placeholder"
      :value="model"
      :disabled="disabled"
      :name="name"
      @input="inputChanged($event.target as HTMLInputElement)"
    />

    <template v-if="errors?.length">
      <span
        v-for="(error, i) in errors"
        :key="i.toString()"
        class="invalid-feedback"
      >
        {{ error }}
      </span>
    </template>
  </div>
  <!-- End Form -->
</template>

<script lang="ts" setup>
interface Props {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  description?: string;
}

withDefaults(defineProps<Props>(), {
  type: () => 'text',
  required: () => false,
  disabled: () => false,
});

const model = defineModel<string>({ required: true });
const errors = defineModel<string[]>('errors');

const inputChanged = (target: HTMLInputElement) => {
  if (target.value.trim() !== '') {
    errors.value = undefined;
  }

  model.value = target.value;
};
</script>

<style scoped lang="scss">
.text-input {
  input.form-control {
    background-color: transparent;
    border: 1px solid $border-dark;
    color: white;
  }
}
</style>
