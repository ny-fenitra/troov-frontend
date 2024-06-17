import useAuthStore from '~/stores/auth';
import useGlobalStore from '~/stores/global';

const loggedMiddleware = defineNuxtRouteMiddleware(async () => {
  const { user, accessToken } = storeToRefs(useAuthStore());
  const { isLogged } = storeToRefs(useGlobalStore());

  if (accessToken.value && user.value) {
    if (isLogged.value) {
      return true;
    }

    const { data } = await useAuthService().veriyToken();

    if (data?.success) {
      return true;
    }
  }

  return navigateTo({ name: 'auth-signin' });
});

export default loggedMiddleware;
