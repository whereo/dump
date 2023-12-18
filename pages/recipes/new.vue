<template>
  <div>
    <div class="mx-auto max-w-7xl px-4 py-6">
      <div class="sticky top-[10px] z-50">
        <div class="w-full lg:w-1/2 lg:mx-auto px-2">
          <div
            class="flex justify-between backdrop-blur-xl border-1 border-gray-400/10 flex justify-between items-center ring-1 ring-gray-500/10 overflow-hidden rounded-xl p-2"
          >
            <div class="absolute inset-0 bg-white opacity-80 -z-10"></div>
            Rezept bearbeiten

            <button
              type="button"
              class="inline-flex items-center gap-x-1.5 rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              :disabled="savePending"
              @click="onSave"
            >
              <CheckCircleIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Speichern
            </button>
          </div>
        </div>
      </div>

      <div
        class="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-4"
      >
        <div class="lg:col-start-2 lg:col-span-2">
          <input v-model="recipe.title" class="text-xl" />
        </div>

        <div class="relative lg:col-start-4 lg:row-start-2 lg:h-full">
          <RenderRecipeIngredients
            :list="recipe.ingredients"
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
  </div>
</template>

<script setup lang="ts">
import { CheckCircleIcon } from "@heroicons/vue/24/outline";
import { type Recipe } from "@/types/types";
import { useRecipe } from "@/composables/useRecipe";

definePageMeta({
  middleware: ["auth"],
});

const { addRecipe } = useRecipe();
const { addNotification } = useNotification();
const router = useRouter();

const recipe = ref<Omit<Recipe, "id">>({
  title: "",
  description: "",
  steps: [
    {
      title: "",
      content: "",
    },
  ],
  ingredients: [],
  portionsCount: 2,
  isOwner: true,
});

const savePending = ref(false);

const onSave = async () => {
  if (recipe.value === null) return;

  savePending.value = true;
  const { data, error } = await addRecipe(recipe.value);

  if (error.value) {
    console.error(error.value);
    return;
  }

  router.push({
    name: "recipes-id-edit",
    params: {
      id: data.value.id,
    },
  });

  addNotification({
    title: "Rezept erstellt",
    content: "Das Rezept kann weiter bearbeitet werden",
  });

  savePending.value = false;
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
