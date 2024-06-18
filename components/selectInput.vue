<template>
  <div class="mb-4">
    <div class="form-label-container">
      <label v-if="label" class="form-label" :class="{ required: required }">
        {{ label }}
      </label>
    </div>

    <select
      v-model="model"
      class="form-select"
      :class="{ 'is-invalid': errors?.length }"
      :placeholder="placeholder"
      @change="inputChanged()"
      @blur="inputBlured()"
    >
      <option v-if="!required" value=""></option>
      <option
        v-for="item in data"
        v-show="!item.disabled"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </option>
    </select>

    <template v-if="errors">
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
  options: any;
  label?: string;
  placeholder?: string;
  normalizer?: Function;
  errors?: Array<string>;
  required?: boolean;
  subtitle?: string;
  description?: string;
}

const props = withDefaults(defineProps<Props>(), {
  required: () => false,
  normalizer: (obj: any) => {
    return {
      value: obj.id ?? obj.value,
      label: obj.label ?? obj.name ?? obj.text,
      ...(obj.disabled ? { disabled: obj.disabled } : {}),
    };
  },
});

const model = defineModel<string>({ required: true });

const data = computed(() =>
  props.options.map((option: any) => props.normalizer(option)),
);

const emit = defineEmits(['update:errors']);

const inputChanged = () => {
  if (model.value) {
    emit('update:errors', undefined);
  }
};

const inputBlured = () => {
  if (props.required && !model.value) {
    emit('update:errors', ['This field is required']);
  }
};
</script>

<style lang="scss" scoped>
select.form-select {
  background-color: transparent;
  border: 1px solid $border-dark;
  color: white;

  option {
    color: $secondary;
  }
}
</style>
