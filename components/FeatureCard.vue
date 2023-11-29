<template>
  <div
    ref="featureRef"
    class="relative lg:flex"
    :class="{
      'lg:flex-row-reverse': reverseRow,
    }"
  >
    <div class="flex-1 lg:px-8 py-8 z-10 flex flex-col justify-center gap-y-8">
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
        <dt class="text-xl tracking-tight text-gray-900 sm:text-2xl">
          {{ feature.name }}
        </dt>
        <dd class="mt-4 text-base leading-6 text-gray-600">
          {{ feature.description }}
        </dd>
      </div>
    </div>

    <div
      ref="imageRef"
      class="flex-1 relative transition-transform hover:scale-[102%] ease-in-out duration-700 mt-12 lg:mt-0"
      :class="[reverseRow ? 'pr-12' : 'pl-12']"
    >
      <div class="fix-height"></div>

      <div class="absolute inset-4">
        <div class="h-full w-full bg-orange-100 rounded-2xl"></div>
        <div
          class="absolute w-2/3 -top-14 -right-4 bg-gray-200 overflow-hidden rounded-2xl shadow-lg"
        >
          <img
            class="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1674212718450-1dce82f3aa91?q=80&w=500"
          />
        </div>

        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  feature: {
    name: string;
    description: string;
    icon: any;
  };
  reverseRow: boolean;
}>();

const featureRef = ref<HTMLElement>();
const imageRef = ref<HTMLElement>();

onMounted(() => {
  featureRef.value.classList.add("opacity-0");

  useIntersectionObserver(
    featureRef,
    ([{ isIntersecting }], observerElement) => {
      if (!featureRef.value) return;

      if (isIntersecting) {
        featureRef.value.classList.add("slide-up");
        featureRef.value.classList.remove("opacity-0");
        observerElement.unobserve(featureRef.value);
      }
    },
  );

  imageRef.value.classList.add("scale-75");

  useIntersectionObserver(imageRef, ([{ isIntersecting }], observerElement) => {
    if (!imageRef.value) return;

    if (isIntersecting) {
      imageRef.value.classList.add("scale-up");
      imageRef.value.classList.remove("opacity-0");
      observerElement.unobserve(imageRef.value);
    }
  });
});
</script>

<style scoped>
.fix-height::after {
  display: block;
  content: "";
  padding-bottom: 100%;
  width: 100%;
}

.slide-up {
  animation: slideUp 0.4s normal forwards ease-in;
  animation-iteration-count: 1;
}

@keyframes slideUp {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.scale-up {
  animation: scaleUp 0.3s normal forwards ease-out;
  animation-iteration-count: 1;
}

@keyframes scaleUp {
  0% {
    transform: scale(75%);
  }

  100% {
    transform: scale(100%);
  }
}
</style>
