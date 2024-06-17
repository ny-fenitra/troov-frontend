<template>
  <div class="layout auth-layout d-flex">
    <div
      class="m-auto d-flex flex-column align-items-center auth-form-container"
    >
      <img src="/images/logo-light.png" alt="Troov" class="mb-3" />
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-form-container {
  width: 100%;
  max-width: 384px;

  :deep(.auth-form) {
    width: 100%;
    background-color: $secondary;
    padding: 20px 30px;
    border-radius: 8px;
    border: 1px solid $border-dark;
  }
}
</style>
