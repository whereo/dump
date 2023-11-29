<template>
  <div>
    <NuxtLayout name="recipe">
      <client-only>
        <TipTapEditor />
      </client-only>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>
