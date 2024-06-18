import { defineStore } from 'pinia';

const useGlobalStore = defineStore('global', () => {
  const isLogged = useState('isLogged', () => false);
  const globalLoading = useState('globalLoading', () => true);

  watch(isLogged, () => {
    if (!isLogged.value) {
      navigateTo({ name: 'auth-signin' });
    } else {
      navigateTo({ name: 'dashboard' });
    }
  });

  return { isLogged, globalLoading };
});

export default useGlobalStore;
