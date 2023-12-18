<template>
  <div>
    <template v-if="recipe">
      <NuxtLayout name="recipe">
        <template #header>
          <div v-if="recipe.isOwner" class="w-full mb-4">
            <div
              class="flex justify-between border-1 border-gray-400/10 flex justify-between items-center ring-1 ring-gray-500/10 overflow-hidden rounded-xl p-2"
            >
              Rezept bearbeiten

              <NuxtLink
                :to="`/recipes/${recipe.id}/edit`"
                class="inline-flex items-center gap-x-1.5 rounded-md bg-orange-600 px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                Bearbeiten
              </NuxtLink>
            </div>
          </div>

          <div class="w-full">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&format=auto&fit=crop&w=700"
              alt="App screenshot"
              class="w-full rounded-xl"
            />
          </div>

          <div class="py-4">
            <h2
              class="text-xl font-medium tracking-tight text-gray-900 sm:text-2xl"
            >
              {{ recipe.title }}
            </h2>
            <p class="pt-2 text-base leading-5 text-gray-600">
              {{ recipe.description }}
            </p>
          </div>

          <div>
            <div class="flex gap-2">
              <div
                v-for="tag in recipe.tags"
                :key="tag.slug"
                class="inline-flex items-center gap-x-1 rounded-full px-3 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200"
              >
                <div class="h-4 w-4">
                  <HashtagIcon />
                </div>
                {{ tag.name }}
              </div>
            </div>
          </div>
        </template>
        <template #aside>
          <RenderRecipeIngredients
            :list="recipe.ingredients"
            :portions-count="recipe.portionsCount"
          />
        </template>

        <div class="rounded-xl">
          <div
            class="py-6 text-base font-semibold leading-6 text-gray-900 font-bold"
          >
            Zubereitung
          </div>

          <template v-for="instruction in recipe.steps">
            <div class="mx-12 border-t border-gray-900/5"></div>

            <div class="py-8">
              <div v-if="instruction.images" class="mb-4 flex gap-2">
                <div v-for="image in instruction.images" class="w-1/2">
                  <div class="w-full">
                    <img
                      src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&format=auto&fit=crop&w=700"
                      alt="App screenshot"
                      class="w-full rounded-xl"
                    />
                  </div>
                  <div v-if="image.title" class="mt-1 text-xs text-gray-700">
                    {{ image.title }}
                  </div>
                </div>
              </div>

              <div class="pb-2 text-sm font-bold">
                {{ instruction.title }}
              </div>
              <div>
                {{ instruction.content }}
              </div>

              <RenderCountdownTimer
                v-if="instruction.timer"
                :name="instruction.timer.name"
                :duration="instruction.timer.duration"
              />
            </div>
          </template>

          <div class="text-base">
            Rezept von {{ recipe.author ? recipe.author.name : "Anonym" }}
          </div>
        </div>
      </NuxtLayout>
    </template>
  </div>
</template>

<script setup lang="ts">
import { HashtagIcon } from "@heroicons/vue/24/outline";

const tags = [
  { name: "Fisch", href: "#", color: "text-red-500" },
  { name: "Schnell & Einfach", href: "#", color: "text-indigo-500" },
];

const { getRecipe } = useRecipe();

const route = useRoute();

if (!route.params.id) {
  console.error("no id");
}
const {
  data: recipe,
  error,
  pending,
} = await getRecipe(route.params.id as unknown as string);

if (!recipe.value || error.value) {
  console.error(error.value);
}
</script>
