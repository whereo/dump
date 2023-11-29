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
    <dl class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
      <div
        v-for="(feature, index) in features"
        :ref="target"
        :key="feature.name"
        class="my-24 relative flex bg-white rounded sm:rounded-3xl ring-1 ring-gray-100"
        :class="{
          'flex-row-reverse': index % 2 === 0,
        }"
      >
        <div class="flex-1 p-8 z-10 flex flex-col justify-between gap-y-12">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600"
          >
            <component
              :is="feature.icon"
              class="h-6 w-6 text-white"
              aria-hidden="true"
            />
          </div>

          <div>
            <dt
              class="text-lg font-bold tracking-tight text-gray-900 sm:text-2xl"
            >
              {{ feature.name }}
            </dt>
            <dd class="mt-4 text-base leading-6 text-gray-600">
              {{ feature.description }}
            </dd>
          </div>
        </div>

        <div class="flex-1 relative">
          <div
            class="absolute inset-0 -my-8 bg-white overflow-hidden rounded-3xl shadow-xl p-2 ring-1 ring-gray-100"
          >
            <img
              class="h-full w-full object-cover rounded-2xl"
              src="https://images.unsplash.com/photo-1674212718450-1dce82f3aa91?q=80&w=500"
            />
          </div>
        </div>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
import {
  ListBulletIcon,
  CloudArrowUpIcon,
  PencilIcon,
  TagIcon,
} from "@heroicons/vue/24/outline";

const target = ref<HTMLElement[]>([]);

useIntersectionObserver(target, ([{ isIntersecting }], observerElement) => {
  if (!target.value) return;

  if (isIntersecting) {
    target.value.classList.add("slide-up");
    console.log("done");
    observerElement.unobserve(target.value);
  }
});

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
      "Erstelle eine Einkaufsliste für ein Rezept mit einem einzigen Klick",
    icon: ListBulletIcon,
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

<style scoped>
.slide-up {
  animation: slideUp 1.2s normal forwards ease-in-out;
  animation-iteration-count: 1;
}

@keyframes slideUp {
  0%,
  50% {
    transform: translateY(50px);
    opacity: 0;
  }

  60%,
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
