<template>
  <div class="py-24 sm:pt-48">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="text-base font-semibold leading-7 text-orange-600">
          Preise
        </h2>
        <p
          class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
        >
          Ein passender Plan für jede Köchin
        </p>
      </div>
      <p
        class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600"
      >
        Egal ob aufstrebende Jungköchin, gefestigte Altgesellin oder
        Küchenchefin. Wir haben den passenden Plan für jede Küchensituation.
      </p>
      <div
        class="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        <div
          v-for="(tier, tierIdx) in tiers"
          :key="tier.id"
          :class="[
            tier.mostPopular ? 'lg:z-10 lg:rounded-3xl' : 'lg:my-8',
            tierIdx === 0 ? 'lg:rounded-r-none' : '',
            tierIdx === tiers.length - 1 ? 'lg:rounded-l-none' : '',
            'flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10',
          ]"
        >
          <div>
            <div class="flex items-center justify-between gap-x-4">
              <h3
                :id="tier.id"
                :class="[
                  tier.mostPopular ? 'text-orange-600' : 'text-gray-900',
                  'text-lg font-semibold leading-8',
                ]"
              >
                {{ tier.name }}
              </h3>
              <p
                v-if="tier.mostPopular"
                class="rounded-full bg-orange-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-orange-600"
              >
                Meistgenutzt
              </p>
            </div>
            <p class="mt-4 text-sm leading-6 text-gray-600">
              {{ tier.description }}
            </p>
            <p class="mt-6 flex items-baseline gap-x-1">
              <span class="text-4xl font-bold tracking-tight text-gray-900">{{
                tier.priceMonthly === 0 ? "Kostenlos" : `${tier.priceMonthly}€`
              }}</span>
              <span
                v-if="tier.priceMonthly > 0"
                class="text-sm font-semibold leading-6 text-gray-600"
                >/Monat</span
              >
            </p>
            <ul
              role="list"
              class="mt-8 space-y-3 text-sm leading-6 text-gray-600"
            >
              <li
                v-for="feature in tier.features"
                :key="feature"
                class="flex gap-x-3"
              >
                <CheckIcon
                  class="h-6 w-5 flex-none text-orange-600"
                  aria-hidden="true"
                />
                {{ feature }}
              </li>
            </ul>
          </div>
          <a
            :href="tier.href"
            :aria-describedby="tier.id"
            :class="[
              tier.mostPopular
                ? 'bg-orange-600 text-white shadow-sm hover:bg-orange-500'
                : 'text-orange-600 ring-1 ring-inset ring-orange-200 hover:ring-orange-300',
              'mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
            ]"
          >
            Jetzt kaufen
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/20/solid";

const tiers = [
  {
    name: "Commis de Cuisine",
    id: "commis-de-cuisine",
    href: "#",
    priceMonthly: 0,
    description: "Die Grundlagen für jede:n Jungköch:in.",
    features: [
      "5 products",
      "Up to 1,000 subscribers",
      "Basic analytics",
      "48-hour support response time",
    ],
    mostPopular: false,
  },
  {
    name: "Chef de Partie",
    id: "chef-de-partie",
    href: "#",
    priceMonthly: 5,
    description: "Die passende Ausstattung für jede:n gelernte:n Köch:in.",
    features: [
      "25 products",
      "Up to 10,000 subscribers",
      "Advanced analytics",
      "24-hour support response time",
      "Marketing automations",
    ],
    mostPopular: true,
  },
  {
    name: "Chef de Cuisine",
    id: "chef-de-cuisine",
    href: "#",
    priceMonthly: 10,
    description: "Absolut alles, was ein:e Küchenchef:in benötigt.",
    features: [
      "Unlimited products",
      "Unlimited subscribers",
      "Advanced analytics",
      "1-hour, dedicated support response time",
      "Marketing automations",
    ],
    mostPopular: false,
  },
];
</script>
