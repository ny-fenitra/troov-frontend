<template>
  <div class="aside-header d-md-none">
    <router-link to="/">
      <img src="/images/logo-light.png" alt="Troov" />
    </router-link>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-list"
      viewBox="0 0 16 16"
      @click="toggleAside"
    >
      <path
        fill-rule="evenodd"
        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
      />
    </svg>
  </div>

  <div ref="asideRef" class="aside d-md-flex d-none flex-column">
    <div class="aside-header mb-3">
      <router-link to="/">
        <img src="/images/logo-light.png" alt="Troov" />
      </router-link>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x-lg d-md-none"
        viewBox="0 0 16 16"
        @click="toggleAside"
      >
        <path
          d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
        />
      </svg>
    </div>

    <div class="nav d-flex flex-column mb-3">
      <router-link
        v-if="is(RoleEnum.ADMIN)"
        :to="{ name: 'dashboard-users' }"
        class="nav-item"
        @click="toggleAside"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-people"
          viewBox="0 0 16 16"
        >
          <path
            d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
          />
        </svg>
        <span>Users</span>
      </router-link>

      <router-link
        :to="{ name: 'dashboard-objects' }"
        class="nav-item"
        @click="toggleAside"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-box"
          viewBox="0 0 16 16"
        >
          <path
            d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"
          />
        </svg>
        <span>Objects</span>
      </router-link>
    </div>

    <div class="nav-item d-flex justify-content-between logout" @click="logout">
      <span>Logout</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-box-arrow-in-right"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
        />
        <path
          fill-rule="evenodd"
          d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAuthStore from '~/stores/auth';
import useGlobalStore from '~/stores/global';

const { is } = useAuthStore();
const { globalLoading } = storeToRefs(useGlobalStore());

const logout = async () => {
  globalLoading.value = true;
  toggleAside();
  await useAuthService().logout();
  globalLoading.value = false;
};

const asideRef = ref();

const toggleAside = () => {
  const aside = asideRef.value;
  aside.classList.contains('show')
    ? aside.classList.remove('show')
    : aside.classList.add('show');
};
</script>

<style lang="scss" scoped>
.aside {
  max-width: 300px;
  width: 100%;
  border-right: 1px solid $border-dark;

  @media screen and (max-width: $md) {
    z-index: 888;
    position: fixed;
    max-width: unset;
    height: 100%;
    background-color: $bg-color;

    &.show {
      display: flex !important;
    }
  }

  .aside-header {
    padding: 0 0 20px 0;
  }

  .nav {
    gap: 15px;
    flex: 1;
    border-bottom: 1px solid $border-dark;
  }

  .nav-item {
    padding: 10px 15px;
    display: flex;
    align-items: center;
    gap: 15px;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    transition: background-color 0.3s;

    &:hover,
    &.router-link-active {
      background-color: #ffffff13;
    }
  }

  .logout {
    cursor: pointer;
  }
}

.aside,
.aside-header {
  background-color: $secondary;
  padding: 20px;
}

.aside-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid $border-dark;

  svg {
    cursor: pointer;
  }
}
</style>
