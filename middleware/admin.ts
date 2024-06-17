import useAuthStore from '~/stores/auth';

const guestMiddleware = defineNuxtRouteMiddleware(() => {
  const { is } = useAuthStore();

  return is(RoleEnum.ADMIN) || navigateTo({ name: 'dashboard-objects' });
});

export default guestMiddleware;
