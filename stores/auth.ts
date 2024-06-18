import { defineStore } from 'pinia';

import useGlobalStore from './global';

import type { RoleEnum, User } from '~/utils/models';

const useAuthStore = defineStore(
  'auth',
  () => {
    const user = useState<User | undefined>('user');
    const accessToken = useState('accessToken');

    const { isLogged } = storeToRefs(useGlobalStore());

    const is = (role: RoleEnum) => {
      if (user.value) {
        return user.value.role === role;
      }

      return false;
    };

    const resetCredentials = () => {
      user.value = undefined;
      accessToken.value = undefined;
      isLogged.value = false;
    };

    return { user, accessToken, resetCredentials, is };
  },
  {
    persist: true,
  },
);

export default useAuthStore;
