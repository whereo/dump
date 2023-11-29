<template>
  <div
    class="lg:col-start-3 lg:row-end-1 lg:sticky lg:top-[10px] lg:bottom-[10px]"
  >
    <h2 class="sr-only">Zutaten</h2>
    <div
      class="p-2 rounded-xl bg-gray-50 shadow-sm ring-1 ring-gray-900/5 max-h-[calc(100vh-20px)] overflow-y-auto"
    >
      <dl class="flex flex-wrap overflow-y">
        <div class="flex-auto pl-6 pt-6">
          <dt class="text-sm leading-6 text-gray-500">Zutaten</dt>
          <dd class="mt-1 text-base font-semibold leading-6 text-gray-900">
            4 Portionen
          </dd>
        </div>
        <div class="flex-none self-end px-6 pt-4">
          <dt class="sr-only">Status</dt>
          <dd
            class="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20"
          >
            Einfach
          </dd>
        </div>
        <div class="mt-6 w-full px-4 py-6">
          <template
            v-for="(ingredient, index) in ingredients"
            :key="ingredient.name"
          >
            <div
              v-if="index > 0"
              class="w-full border-b border-stone-900/5"
            ></div>
            <div class="flex justify-between gap-x-2">
              <div class="block text-md leading-9 text-stone-900">
                {{ ingredient.name }}
              </div>

              <div class="block text-md leading-9 text-stone-900 text-right">
                {{ ingredient.quantity }}
              </div>
            </div>
          </template>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
const ingredients = [
  {
    name: "Fischfilet",
    quantity: 4,
  },
  {
    name: "Ei",
    quantity: 2,
  },
  {
    name: "Salz und Pfeffer",
    quantity: "nach Belieben",
  },
  {
    name: "Fischgewürze",
    quantity: null,
  },
  {
    name: "Fondor",
    quantity: "150g",
  },
  {
    name: "Fischfilet",
    quantity: 4,
  },
  {
    name: "Ei",
    quantity: 2,
  },
  {
    name: "Salz und Pfeffer",
    quantity: "nach Belieben",
  },
  {
    name: "Fischgewürze",
    quantity: null,
  },
  {
    name: "Fondor",
    quantity: "150g",
  },
];
</script>
