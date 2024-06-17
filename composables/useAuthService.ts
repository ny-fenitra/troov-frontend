const useAuthService = () => {
  const signin = async (body: { email: string; password: string }) => {
    const { data, error } = await useCustomFetch('/api/login', {
      method: 'POST',
      body,
    });

    return { data, error };
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

    return { data, error };
  };

  return {
    signin,
    signup,
  };
};

export default useAuthService;
