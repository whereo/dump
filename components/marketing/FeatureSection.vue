<template>
  <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
    <div class="mx-auto max-w-2xl lg:text-center">
      <h2 class="text-base font-semibold leading-7 text-orange-600">
        Einfach kochen können
      </h2>
      <p
        class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
      >
        Alles was du zum Kochen brauchst
      </p>
      <p class="mt-6 text-lg leading-8 text-gray-600">
        Ist das Rezept für den Zitronen-Kuchen im 'Einfache Kuchen'-Buch unter
        der Kategorie 'Saftige Kuchen' oder doch in den handschriftlichen
        Notizen?
      </p>
    </div>
    <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
      <dl
        class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16"
      >
        <div
          v-for="feature in features"
          :key="feature.name"
          class="relative pl-16"
        >
          <dt class="text-base font-semibold leading-7 text-gray-900">
            <div
              class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600"
            >
              <component
                :is="feature.icon"
                class="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </div>
            {{ feature.name }}
          </dt>
          <dd class="mt-2 text-base leading-7 text-gray-600">
            {{ feature.description }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ListBulletIcon,
  CloudArrowUpIcon,
  PencilIcon,
  TagIcon,
} from "@heroicons/vue/24/outline";

const features = [
  {
    name: "Zentrales Kochbuch",
    description:
      "Speichere deine Rezepte um von überall darauf zugreifen zu können.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Schlagworte und Tags",
    description:
      "Gib deinen Rezepte Schlagworte oder sortiere sie in Ordnern, um nie den Überblick zu verlieren.",
    icon: TagIcon,
  },
  {
    name: "Einkaufsliste",
    description:
      "Erstelle eine Einkaufsliste für ein Rezept mit einem einzigen Klick",
    icon: ListBulletIcon,
  },
  {
    name: "Notizen",
    description: "Ändere ein Rezept oder füge private Notizen hinzu.",
    icon: PencilIcon,
  },
];
</script>
