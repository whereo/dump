<template>
  <div>
    <NuxtLayout name="recipe">
      <client-only>
        <TipTapEditor v-model="html" />
      </client-only>

      <RenderContent :html="html" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const html = ref(`
  This is some default text

  <countdown-timer name="" duration="10"></countdown-timer>

  Some more text
`);
</script>
