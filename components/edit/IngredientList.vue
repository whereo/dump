<template>
  <div>
    <h2 class="sr-only">Zutaten</h2>
    <div
      class="mt-4 flex flex-col bg-white ring-1 ring-gray-200 rounded-2xl overflow-hidden"
    >
      <dl class="flex flex-wrap overflow-y">
        <div class="flex-auto pl-6 pt-6 text-sm leading-6 text-gray-500">
          Zutaten
        </div>
        <div class="mt-1 text-base leading-6 text-gray-900">
          <div class="flex items-center gap-x-2"></div>
        </div>
        <div class="flex items-center self-end px-6 pt-4 gap-x-2">
          <div
            @click="portionsCount - 1"
            class="h-8 w-8 p-1.5 rounded-full bg-gray-100 cursor-pointer"
          >
            <MinusIcon />
          </div>

          <div
            @click="portionsCount + 1"
            class="h-8 w-8 p-1.5 rounded-full bg-gray-100 cursor-pointer"
          >
            <PlusIcon />
          </div>

          <div class="tracking-wide tabular-nums">
            <span class="font-semibold text-gray-900 pr-1">{{
              portionsCount
            }}</span>
            <span class="text-gray-600">Portion(en)</span>
          </div>
        </div>
        <div class="mt-6 w-full px-4 py-6">
        <ClientOnly>
          <template v-for="ingredient in ingredients" :key="ingredient.name">
            <EditIngredientListItem :ingredient="ingredient" />
          </template>
          </ClientOnly>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Recipe } from "@/types/types";
import { PlusIcon, MinusIcon } from "@heroicons/vue/24/outline";

const props = defineProps<{
  portionsCount: Recipe["portionsCount"];
  ingredients: Recipe["ingredients"];
}>();

const emit = defineEmits<{
  (e: "update:ingredients", payload: Recipe["ingredients"]): void;
  (e: "update:portionsCount", payload: Recipe["portionsCount"]): void;
}>();

const ingredients = ref(props.ingredients);
</script>
