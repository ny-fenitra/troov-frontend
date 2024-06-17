import { toast } from 'vue3-toastify';

const useCustomFetch = async (url: string, options: any) => {
  const config = useRuntimeConfig();

  try {
    const data = await $fetch(url, {
      baseURL: config.public.baseURL,
      ...options,
    });

    return { data, error: null };
  } catch (error: any) {
    error?.data?.msg && toast.error(error.data?.msg);
    return { data: null, error };
  }
};

export default useCustomFetch;
