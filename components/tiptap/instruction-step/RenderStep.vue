<template>
  <div class="py-8">
    <div class="pb-2 text-sm font-bold">
      {{ title }}
    </div>
    <div>
      {{ content }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    content: string;
  }>(),
  {
    title: "no title",
    content: "no content",
  },
);
</script>
