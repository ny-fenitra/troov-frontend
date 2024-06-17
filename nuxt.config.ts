// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  css: ['~/assets/scss/bootstrap.scss', '~/assets/scss/global.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/scss/_variables.scss";',
        },
      },
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Troov',
    },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.API_BASE_URL || 'http://localhost:8080',
    },
  },
});
