import useAuthStore from '~/stores/auth';
import useGlobalStore from '~/stores/global';
import type { VerifyTokenPayload } from '~/utils/models';

const useAuthService = () => {
  const { user, accessToken } = storeToRefs(useAuthStore());
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

  const veriyToken = async () => {
    const { data, error } = await useCustomFetch('/api/me');

    const payload = data as VerifyTokenPayload | null;

    if (payload?.success) {
      user.value = payload.user;
      isLogged.value = true;
    }

    return { data: payload, error };
  };

  return {
    signin,
    signup,
    veriyToken,
  };
};

export default useAuthService;
