import useAuthStore from '~/stores/auth';
import useGlobalStore from '~/stores/global';

const guestMiddleware = defineNuxtRouteMiddleware(async () => {
  const { user, accessToken } = storeToRefs(useAuthStore());
  const { isLogged } = storeToRefs(useGlobalStore());

  if (accessToken.value && user.value) {
    if (isLogged.value) {
      return navigateTo({ name: 'dashboard' });
    }

    const { data } = await useAuthService().veriyToken();

    if (data?.success) {
      return navigateTo({ name: 'dashboard' });
    }
  }

  return true;
});

export default guestMiddleware;
