<template>
  <div>
    <div class="mx-auto max-w-7xl px-2 py-6">
      <div class="mx-auto lg:w-1/2 flex flex-col gap-y-20">
        <!-- <div class="pb-5">
        <h3 class="text-base font-semibold leading-6 text-orange-800">
          Rezept bearbeiten
        </h3>
        <p class="mt-2 max-w-4xl text-sm text-gray-500">
          Bearbeite dein Rezept, füge Zutaten und Bilder hinzu.
        </p>
      </div> -->

        <div class="sticky top-[10px] z-50">
          <div
            class="relative flex justify-between backdrop-blur-xl border-1 border-gray-400/10 flex justify-between ring-1 ring-gray-500/10 overflow-hidden rounded-xl px-2"
          >
            <div class="absolute inset-0 bg-white opacity-80 -z-10"></div>
            <ul class="flex no-wrap">
              <li v-for="link in headerLinks">
                <a
                  :href="link.to"
                  class="block px-2 hover:text-orange-600"
                  @click="(e) => onScrollTo(e, link)"
                >
                  <span
                    class="block py-4 leading-6 border-b-2"
                    :class="[
                      link.visible ? 'border-orange-600' : 'border-transparent',
                    ]"
                    >{{ link.name }}</span
                  >
                </a>
              </li>
            </ul>

            <div class="py-2">
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
          id="overview"
          :ref="(el) => (headerLinks[0].htmlRef = el as Element)"
        >
          <div class="pb-4">
            <h2 class="inline-flex items-center">
              <span
                class="w-8 h-8 -ml-10 mr-2 hidden lg:flex justify-center items-center text-sm rounded-full text-orange-600 ring-1 ring-inset ring-orange-600"
                aria-hidden="true"
                >1</span
              >
              <span class="text-base font-medium tracking-tight">
                Übersicht
              </span>
            </h2>
            <p class="max-w-4xl text-sm text-gray-500">
              Eine kurze Zusammenfassung des Rezepts und Bildern.
            </p>
          </div>

          <label
            for="file-upload"
            class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
          >
            <div class="text-center">
              <PhotoIcon
                class="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <div class="mt-4 flex text-sm leading-6 text-gray-600">
                <div
                  class="relative cursor-pointer rounded-md bg-white font-semibold text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-600 focus-within:ring-offset-2 hover:text-orange-500"
                >
                  <span>Lade ein Bild hoch</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    class="sr-only"
                  />
                </div>
                <p class="pl-1">oder ziehe es hier her</p>
              </div>
              <p class="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF bis 10MB
              </p>
            </div>
          </label>

          <div class="sm:col-span-4">
            <label
              for="title"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Rezept Titel</label
            >
            <div class="mt-2">
              <input
                v-model="recipe.title"
                type="text"
                name="title"
                id="title"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 text-xl sm:text-lg sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-4">
            <label
              for="description"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Beschreibung</label
            >
            <div class="mt-2">
              <textarea
                ref="descriptionRef"
                v-model="recipe.description"
                id="description"
                name="description"
                rows="3"
                class="block w-full outline-0 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:leading-6 resize-none"
              />
            </div>
            <p class="mt-3 text-sm leading-6 text-gray-600">
              Gib dem Rezept eine kurze Beschreibung.
            </p>
          </div>
        </div>

        <div
          id="ingredients"
          :ref="(el) => (headerLinks[1].htmlRef = el as Element)"
        >
          <div class="pb-4">
            <h2 class="inline-flex items-center">
              <span
                class="w-8 h-8 -ml-10 mr-2 hidden lg:flex justify-center items-center text-sm rounded-full text-orange-600 ring-1 ring-inset ring-orange-600"
                aria-hidden="true"
                >2</span
              >
              <span class="text-base font-medium tracking-tight">
                Zutaten
              </span>
            </h2>
            <p class="max-w-4xl text-sm text-gray-500">
              Trage hier alle Zutaten ein, die für das Rezept benötigt werden.
              Du kannst auch gerne Alternativen einfügen.
            </p>
          </div>

          <EditIngredientList
            :ingredients="recipe.ingredients"
            :portions-count="recipe.portionsCount"
          />
        </div>

        <div
          id="instructions"
          :ref="(el) => (headerLinks[2].htmlRef = el as Element)"
        >
          <div class="pb-4">
            <h2 class="inline-flex items-center">
              <span
                class="w-8 h-8 -ml-10 mr-2 hidden lg:flex justify-center items-center text-sm rounded-full text-orange-600 ring-1 ring-inset ring-orange-600"
                aria-hidden="true"
                >3</span
              >
              <span class="text-base font-medium tracking-tight">
                Zubereitung
              </span>
            </h2>
            <p class="max-w-4xl text-sm text-gray-500">
              Unterteile das Rezept in logische Schritte, damit andere Köchinnen
              einfacher folgen können.
            </p>
          </div>

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
import { PhotoIcon, CheckCircleIcon } from "@heroicons/vue/24/outline";
import { type Recipe } from "@/types/types";
import { useRecipe } from "@/composables/useRecipe";

definePageMeta({
  middleware: ["auth"],
});

const { textarea: descriptionRef } = useTextareaAutosize();

const { getRecipe, updateRecipe } = useRecipe();
const { addNotification } = useNotification();

const route = useRoute();

if (!route.params.id) {
  console.error("no id");
}

const { data: recipe, error, pending } = await getRecipe(route.params.id);

if (!recipe.value || error.value) {
  console.error(error.value);
}

type HeaderLink = {
  to: string;
  name: string;
  htmlRef?: Element;
  visible: boolean;
};
const headerLinks = ref<HeaderLink[]>([
  { to: "#overview", name: "Übersicht", htmlRef: undefined, visible: false },
  { to: "#ingredients", name: "Zutaten", htmlRef: undefined, visible: false },
  {
    to: "#instructions",
    name: "Zubereitung",
    htmlRef: undefined,
    visible: false,
  },
  { to: "#meta", name: "Meta", htmlRef: undefined, visible: false },
]);

const savePending = ref(false);
const onSave = async () => {
  if (recipe.value === null) return;

  savePending.value = true;
  await updateRecipe(recipe.value);
  savePending.value = false;

  addNotification({
    title: "Rezept gespeichert",
  });
};

const onAddStep = () => {
  if (!recipe.value) return;

  recipe.value.steps.push({
    title: "",
    content: "",
  });
};

const onUpdateStep = (index: number, data: Recipe["steps"]) => {
  if (!recipe.value) return;

  recipe.value.steps[index] = data;
};

const onDelete = (index: number) => {
  if (!recipe.value) return;

  recipe.value.steps.splice(index, 1);
};

headerLinks.value.forEach((item) => {
  useIntersectionObserver(
    () => item.htmlRef,
    ([{ isIntersecting }]) => (item.visible = isIntersecting),
  );
});

const { y } = useWindowScroll({ behavior: "smooth" });

const onScrollTo = (e: Event, link: HeaderLink) => {
  const rect = link.htmlRef?.getBoundingClientRect();

  if (rect) {
    e.preventDefault();
    e.stopImmediatePropagation();

    y.value += rect.y - 80;
  }
};
</script>
