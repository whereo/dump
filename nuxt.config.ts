// https://nuxt.com/docs/guide/directory-structure/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "@nuxtjs/supabase"],
  supabase: {
    redirect: false,
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
    },
  },
  typescript: {
    // typeCheck: true,
  },
  vite: {
    resolve: {
      alias: {
        vue: "vue/dist/vue.esm-bundler",
      },
    },
  },
});
