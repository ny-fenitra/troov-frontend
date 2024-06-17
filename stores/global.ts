import { defineStore } from 'pinia';

const useGlobalStore = defineStore('global', () => {
  const isLogged = useState('logged', () => false);

  watch(isLogged, () => {
    if (!isLogged.value) {
      navigateTo({ name: 'auth-signin' });
    } else {
      navigateTo({ name: 'dashboard' });
    }
  });

  return { isLogged };
});

export default useGlobalStore;
