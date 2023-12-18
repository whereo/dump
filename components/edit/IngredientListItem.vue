<template>
  <div
    class="rounded-lg ring-1 ring-gray-800 flex justify-between gap-x-2 overflow-hidden px-2 py-1"
  >
    <div class="block text-md leading-9 text-stone-900">
      <input v-model="ingredient.name" />
    </div>

    <div class="block text-md leading-9 text-stone-900 text-right">
      <input v-model="ingredient.quantity" />
    </div>

    <div class="block text-md leading-9 text-stone-900 text-right">
      <input v-model="ingredient.unit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type RecipeIngredient } from "@/types/types";

const props = defineProps<{
  ingredient: RecipeIngredient;
}>();
</script>
