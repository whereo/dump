<template>
  <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div
      class="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-4"
    >
      <!-- <div class="lg:col-start-2 lg:col-span-2">header</div> -->

      <!-- <div class="relative lg:col-start-4 lg:row-start-2 lg:h-full">
        right side
      </div> -->

      <div
        class="lg:col-start-2 lg:row-start-2 lg:col-span-2 lg:row-span-2 lg:row-end-2"
      >
        <div class="flex flex-col gap-4">
          <NuxtLink
            v-for="recipe in recipes"
            :key="recipe.id"
            :to="`/recipes/${recipe.id}`"
            class="w-full rounded-xl ring-1 ring-gray-200 p-4 hover:ring-2 hover:ring-orange-300 transition duration-300 hover:bg-gray-50"
          >
            <h5 class="text-base font-semibold leading-6 tracking-tight">
              {{ recipe.title }}
            </h5>

            <p v-if="recipe.description" class="mt-1 text-xs text-gray-600">
              {{ recipe.description }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();

const { data: recipes } = await supabase
  .from("recipes")
  .select("id, title, description, content");
</script>
