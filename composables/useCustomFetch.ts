import { toast } from 'vue3-toastify';

import useAuthStore from '~/stores/auth';

const useCustomFetch = async (url: string, options?: any) => {
  const config = useRuntimeConfig();

  const authStore = useAuthStore();
  const { accessToken } = storeToRefs(authStore);
  const { resetCredentials } = authStore;

  try {
    const data = await $fetch(url, {
      baseURL: config.public.baseURL,
      ...options,
      headers: {
        ...(accessToken.value
          ? { Authorization: 'Bearer ' + accessToken.value }
          : {}),
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    return { data, error: null };
  } catch (error: any) {
    error?.data?.msg && toast.error(error.data?.msg);

    if (error.status === 401) {
      resetCredentials();
    }

    return { data: null, error };
  }
};

export default useCustomFetch;
