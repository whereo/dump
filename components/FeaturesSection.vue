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

    <dl
      class="mx-auto max-w-2xl sm:mt-20 lg:mt-36 lg:max-w-4xl grid grid-cols-1 gap-y-48"
    >
      <FeatureCard
        v-for="(feature, index) in features"
        :key="feature.name"
        :feature="feature"
        :reverseRow="index % 2 === 0"
      >
        <template v-if="index === 1">
          <div
            class="absolute w-1/3 -bottom-14 -left-4 bg-gray-200 overflow-hidden rounded-2xl shadow-lg"
          >
            <img
              class="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1674212718450-1dce82f3aa91?q=80&w=500"
            />
          </div>
        </template>
      </FeatureCard>
    </dl>
  </div>
</template>

<script setup lang="ts">
import {
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
    image:
      "https://images.unsplash.com/photo-1674212718450-1dce82f3aa91?q=80&w=500",
  },
  {
    name: "Schlagworte und Tags",
    description:
      "Gib deinen Rezepte Schlagworte oder sortiere sie in Ordnern, um nie den Überblick zu verlieren.",
    icon: TagIcon,
    image:
      "https://images.unsplash.com/photo-1674212718450-1dce82f3aa91?q=80&w=500",
  },
  {
    name: "Einkaufsliste",
    description:
      "Erstelle eine Einkaufsliste für ein Rezept mit einem einzigen Klick.",
    icon: CloudArrowUpIcon,
    image:
      "https://images.unsplash.com/photo-1674212718450-1dce82f3aa91?q=80&w=500",
  },
  {
    name: "Notizen",
    description: "Ändere ein Rezept oder füge private Notizen hinzu.",
    icon: PencilIcon,
    image:
      "https://images.unsplash.com/photo-1674212718450-1dce82f3aa91?q=80&w=500",
  },
];
</script>
