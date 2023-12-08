<template>
  <div>
    <NuxtLayout name="recipe">
      <TestInstructionStep />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>
