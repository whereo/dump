<template>
  <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <div class="sticky top-[10px] z-50">
      <div
        class="lg:w-1/2 lg:mx-auto flex justify-between backdrop-blur-xl border-1 border-gray-400/10 flex justify-between items-center shadow-lg ring-1 ring-gray-500/10 overflow-hidden rounded-xl p-2"
      >
        <div class="absolute inset-0 bg-white opacity-80 -z-10"></div>
        Rezept bearbeiten

        <button
          type="button"
          class="inline-flex items-center gap-x-1.5 rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          <CheckCircleIcon
            class="-ml-0.5 h-5 w-5"
            aria-hidden="true"
            @click="onSave"
          />
          Speichern
        </button>
      </div>
    </div>

    <div
      class="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-4"
    >
      <div class="lg:col-start-2 lg:col-span-2">
        <input v-model="recipe.title" class="text-xl" />
      </div>

      <div class="relative lg:col-start-4 lg:row-start-2 lg:h-full">
        <EditIngredientList
          :ingredients="recipe.ingredients"
          :portions-count="recipe.portionsCount"
        />
      </div>

      <div
        class="lg:col-start-2 lg:row-start-2 lg:col-span-2 lg:row-span-2 lg:row-end-2"
      >
        <label>Beschreibung</label>
        <input v-model="recipe.description" class="text-base" />

        <EditInstructionStep
          v-for="(step, index) in recipe.steps"
          :index="index + 1"
          :step="step"
          :deleteable="index > 0"
          @update:step="(data) => onUpdateStep(index, data)"
          @delete="onDelete(index)"
        />

        <div class="mt-4 flex justify-center">
          <button
            @click="onAddStep"
            type="button"
            class="rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            Schritt hinzufügen
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- <div>
    <NuxtLayout name="auth">
      <template #header>
        <label>Beschreibung</label>
        <input v-model="recipe.description" class="text-base" />
      </template>

      <template #aside>
        <EditIngredientList
          :ingredients="recipe.ingredients"
          :portions-count="recipe.portionsCount"
        />
      </template>

      <div class="sticky bg-white top-0 flex justify-between">
        <input v-model="recipe.title" class="text-xl" />
        <button @click="onSave">Save</button>
      </div>

      <template v-if="pending"> loading.... </template>
      <template v-else>
        <EditInstructionStep
          v-for="(step, index) in recipe.steps"
          :index="index + 1"
          :step="step"
          :deleteable="index > 0"
          @update:step="(data) => onUpdateStep(index, data)"
          @delete="onDelete(index)"
        />
        <div class="mt-4 flex justify-center">
          <button
            @click="onAddStep"
            type="button"
            class="rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            Schritt hinzufügen
          </button>
        </div>
      </template>
    </NuxtLayout>
  </div> -->
</template>

<script setup lang="ts">
import { CheckCircleIcon } from "@heroicons/vue/24/outline";
import { type Recipe } from "@/types/types";
import { useRecipe } from "@/composables/useRecipe";

definePageMeta({
  layout: "auth",
  //   middleware: ["auth"],
});

const { getRecipe, updateRecipe } = useRecipe();

const route = useRoute();

if (!route.params.id) {
  console.error("no id");
}

const { data: recipe, error, pending } = await getRecipe(route.params.id);

if (!recipe.value || error.value) {
  console.error(error.value);
}

const onSave = async () => {
  await updateRecipe(recipe.value);
};

const onAddStep = () => {
  recipe.value.steps.push({
    title: "",
    content: "",
  });
};

const onUpdateStep = (index: number, data: Recipe["steps"]) => {
  recipe.value.steps[index] = data;
};

const onDelete = (index: number) => {
  recipe.value.steps.splice(index, 1);
};
</script>
