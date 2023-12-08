// https://nuxt.com/docs/guide/directory-structure/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
  vite: {
    resolve: {
      alias: {
        vue: "vue/dist/vue.esm-bundler",
      },
    },
  },
});
