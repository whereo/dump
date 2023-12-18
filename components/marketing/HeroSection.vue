<template>
  <div class="relative pt-14">
    <div class="py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h1
            class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
          >
            Einfach das richtige Rezept finden
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-700">
            Organisiere deine Lieblingsrezepte zentral an einem Ort. Egal, ob du
            sie im Internet gefunden hast oder handschriftlich aufgeschrieben
            hast.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              class="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Los gehts
            </a>
            <a href="#" class="text-sm font-semibold leading-6 text-gray-900"
              >Mehr erfahren <span aria-hidden="true">→</span></a
            >
          </div>
        </div>
        <div class="mt-16 flow-root sm:mt-24">
          <div
            ref="target"
            class="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 opacity-0"
          >
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&format=auto&fit=crop&w=2432"
              alt="App screenshot"
              width="2432"
              class="rounded-md shadow-2xl ring-1 ring-gray-900/10"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="absolute -z-10 h-[75%] inset-0 bottom-0 overflow-hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3418 1530"
        fill="none"
        class="h-full w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M1617 1459C1260 1469.5 976 1268 662.5 1336.5C403 1393.2 316.5 1528.5 0 1528.5V0.5H3418V1529C3418 1529 3088 1532 2911.5 1449.5C2735 1367 2649.44 1246.87 2445 1242C2088 1233.5 2056.31 1446.08 1617 1459Z"
          fill="#FFE7C4"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
const target = ref<HTMLElement>();

useIntersectionObserver(target, ([{ isIntersecting }], observerElement) => {
  if (!target.value) return;

  if (isIntersecting) {
    target.value.classList.add("slide-up");
    observerElement.unobserve(target.value);
  }
});
</script>

<style scoped>
.slide-up {
  animation: slideUp 0.4s normal forwards ease-in-out;
  animation-iteration-count: 1;
}

@keyframes slideUp {
  0%,
  10% {
    transform: translateY(100%);
    opacity: 0;
  }

  90%,
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
