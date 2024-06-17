import { defineStore } from 'pinia';

import useGlobalStore from './global';

import type { User } from '~/utils/models';

const useAuthStore = defineStore(
  'auth',
  () => {
    const user = useState<User | undefined>('user');
    const accessToken = useState('accessToken');

    const { isLogged } = storeToRefs(useGlobalStore());

    const resetCredentials = () => {
      user.value = undefined;
      accessToken.value = undefined;
      isLogged.value = false;
    };

    return { user, accessToken, resetCredentials };
  },
  {
    persist: true,
  },
);

export default useAuthStore;
