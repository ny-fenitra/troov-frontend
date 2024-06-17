import useAuthStore from '~/stores/auth';
import useGlobalStore from '~/stores/global';
import type { Payload, VerifyTokenPayload } from '~/utils/models';

const useAuthService = () => {
  const authStore = useAuthStore();
  const { user, accessToken } = storeToRefs(authStore);
  const { resetCredentials } = authStore;
  const { isLogged } = storeToRefs(useGlobalStore());

  const signin = async (body: { email: string; password: string }) => {
    const { data, error } = await useCustomFetch('/api/login', {
      method: 'POST',
      body,
    });

    const payload = processLogin(data);

    return { data: payload, error };
  };

  const signup = async (body: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const { data, error } = await useCustomFetch('/api/register', {
      method: 'POST',
      body,
    });

    const payload = processLogin(data);

    return { data: payload, error };
  };

  const processLogin = (data: unknown) => {
    const payload = data as AuthPayload | null;

    if (payload?.success) {
      user.value = payload.user;
      accessToken.value = payload.accessToken;
      isLogged.value = true;
    }

    return payload;
  };

  const verifyToken = async () => {
    const { data, error } = await useCustomFetch('/api/me');

    const payload = data as VerifyTokenPayload | null;

    if (payload?.success) {
      user.value = payload.user;
      isLogged.value = true;
    }

    return { data: payload, error };
  };

  const logout = async () => {
    const { data, error } = await useCustomFetch('/api/logout', {
      method: 'POST',
    });

    const payload = data as Payload | null;

    if (payload?.success) {
      resetCredentials();
    }

    return { data: payload, error };
  };

  return {
    signin,
    signup,
    verifyToken,
    logout,
  };
};

export default useAuthService;
