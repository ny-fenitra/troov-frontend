import Vue3Toastify, { type ToastContainerOptions, toast } from 'vue3-toastify';

import 'vue3-toastify/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    autoClose: 3000,
    position: toast.POSITION.BOTTOM_RIGHT,
  } as ToastContainerOptions);
});
