export const isEmailValid = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const getRandomValue = () =>
  window.crypto.getRandomValues(new Uint32Array(1))[0].toString();
