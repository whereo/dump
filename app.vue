<template>
  <NuxtLayout>
    <NuxtPage />

    <NotificationContainer />
  </NuxtLayout>
</template>

<script lang="ts">
export default defineNuxtComponent({
  head() {
    return {
      htmlAttrs: {
        class: "h-full",
      },
      bodyAttrs: {
        class: "h-full w-full",
      },
    };
  },
});
</script>

<style>
#__nuxt {
  height: 100%;
}
</style>
