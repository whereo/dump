<template>
  <div>
    <NuxtLayout name="recipe">
      <template #header>
        <div class="w-full">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&format=auto&fit=crop&w=700"
            alt="App screenshot"
            class="w-full rounded-xl"
          />
        </div>

        <div class="px-6 py-4">
          <h2
            class="text-xl font-medium tracking-tight text-gray-900 sm:text-2xl"
          >
            Lorem ipsum dolor sit amet
          </h2>
          <p class="pt-2 text-base leading-5 text-gray-600">
            Consectetur adipisicing elit. Earum iste dignissimos amet voluptatem
            ipsam, facilis magni quibusdam ducimus debitis accusamus blanditiis
            placeat quia dolores officia explicabo ullam illo inventore error.
            Lorem ipsum dolor sit amet.
          </p>

          <div>
            <template v-for="tag in tags" :key="tag.name">
              <a
                :href="tag.href"
                class="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200"
              >
                <div class="h-4 w-4" :class="[tag.color]">
                  <HashtagIcon />
                </div>
                {{ tag.name }}
              </a>
              {{ " " }}
            </template>
          </div>
        </div>
      </template>
      <template #aside>
        <RecipeIngredients />
      </template>

      <div class="rounded-xl">
        <div
          class="px-6 py-6 text-base font-semibold leading-6 text-gray-900 font-bold"
        >
          Zubereitung
        </div>

        <template v-for="instruction in instructions">
          <div class="mx-6 border-t border-gray-900/5"></div>

          <div class="px-6 py-8">
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
              {{ instruction.step }}
            </div>
            <div>
              {{ instruction.text }}
            </div>

            <CountdownTimer
              v-if="instruction.timer"
              :name="instruction.timer.name"
              :seconds="instruction.timer.duration"
            />
          </div>
        </template>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { HashtagIcon } from "@heroicons/vue/24/outline";

definePageMeta({
  layout: false,
});

type Instruction = {
  step: string;
  text: string;
  timer?: {
    name: string;
    duration: number;
  };
  images?: {
    title?: string;
    source: string;
  }[];
};

const tags = [
  { name: "Fisch", href: "#", color: "text-red-500" },
  { name: "Schnell & Einfach", href: "#", color: "text-indigo-500" },
];

const instructions = [
  {
    step: "Schritt 1",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    images: [
      {
        source:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&format=auto&fit=crop&w=700",
      },
    ],
  },

  {
    step: "Schritt 1.1",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },

  {
    step: "Schritt 1.2",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    step: "Schritt 2",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo ex vel consequuntur enim voluptatum! Temporibus in distinctio vitae architecto perspiciatis, libero consectetur impedit ratione dolorum, animi possimus illo nisi ducimus.",
    timer: {
      name: "Reis kochen",
      duration: 5,
    },
  },
  {
    step: "Schritt 3",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo ex vel consequuntur enim voluptatum! Temporibus in distinctio vitae architecto perspiciatis, libero consectetur impedit ratione dolorum, animi possimus illo nisi ducimus.",
  },
  {
    step: "Schritt 4",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo ex vel consequuntur enim voluptatum! Temporibus in distinctio vitae architecto perspiciatis, libero consectetur impedit ratione dolorum, animi possimus illo nisi ducimus.",
    timer: {
      name: "Plätzchen essen",
      duration: 30,
    },
  },
  {
    step: "Schritt 5",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo ex vel consequuntur enim voluptatum! Temporibus in distinctio vitae architecto perspiciatis, libero consectetur impedit ratione dolorum, animi possimus illo nisi ducimus.",
    images: [
      {
        title: "An optional title",
        source:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&format=auto&fit=crop&w=700",
      },
      {
        title: "Another optional title for a different picture",
        source:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&format=auto&fit=crop&w=700",
      },
    ],
  },
];
</script>
