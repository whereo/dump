<template>
  <NuxtLayout name="default">
    <NuxtPage />
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
        class: "h-full",
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
