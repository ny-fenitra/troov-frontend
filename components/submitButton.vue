<template>
  <button
    ref="btn"
    class="btn btn-primary"
    :type="type ?? 'submit'"
    :disabled="disabled || loading"
  >
    <span
      v-if="loading"
      class="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    ></span>
    <span :class="{ 'visually-hidden': loading }">
      <slot>{{ text }}</slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    loading?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    text?: string;
  }>(),
  {
    loading: () => false,
    disabled: () => false,
    text: () => 'Button',
  },
);

const btn = ref<HTMLButtonElement>();
const btnWidth = ref('auto');

onMounted(() => {
  if (btn.value) {
    const w = btn.value.getBoundingClientRect().width;
    if (w > 0) {
      btnWidth.value = w + 'px';
      btn.value.style.minWidth = btnWidth.value;
    }
  }
});
</script>
