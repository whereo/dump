<template>
  <header class="fixed inset-x-0 top-0 z-50 flex items-center">
    <div class="max-w-2xl w-auto pt-8 mx-auto px-8">
      <nav
        class="flex justify-between items-center backdrop-blur-lg rounded-xl flex gap-x-8 px-2 overflow-hidden transition-all duration-700"
        :class="{ 'shadow-xl': y > 0 }"
        aria-label="Global"
      >
        <div
          class="absolute inset-0 bg-white -z-10 transition-all duration-700"
          :class="[y === 0 ? 'opacity-0' : 'opacity-80']"
        ></div>
        <div class="flex items-center">
          <div>
            <a href="/" class="flex items-center gap-x-2">
              <Logo />
            </a>
          </div>

          <div class="hidden lg:block w-px h-4 mx-4 bg-black/20"></div>

          <div class="hidden lg:flex lg:gap-x-4">
            <a
              v-for="item in navigation"
              :key="item.name"
              :href="item.href"
              class="text-sm font-semibold leading-6 text-stone-900 py-3 hover:text-orange-700"
              >{{ item.name }}</a
            >
          </div>
        </div>
        <div class="flex lg:flex-1 lg:justify-end py-2 lg:py-0 gap-x-2">
          <a
            href="/dashboard"
            class="rounded-md leading-6 bg-white px-2 py-1 text-sm font-semibold text-stone-900 shadow-md ring-1 ring-stone-200 hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-300"
            @click="onLogin"
          >
            {{ isLoggedin ? "Logout" : "Login" }}
          </a>

          <div class="flex lg:hidden">
            <button
              type="button"
              class="-m-2.5 inline-flex items-center justify-center rounded-md p-3 text-stone-700"
              @click="mobileMenuOpen = true"
            >
              <span class="sr-only">Open main menu</span>
              <Bars3Icon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>
    </div>

    <Dialog
      as="div"
      class="lg:hidden"
      @close="mobileMenuOpen = false"
      :open="mobileMenuOpen"
    >
      <div class="fixed inset-0 z-50"></div>

      <DialogPanel
        class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-stone-900/10"
      >
        <div class="flex items-center justify-between">
          <a href="/" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            LOGO
          </a>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-stone-700"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-stone-500/10">
            <div class="space-y-2 py-6">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-stone-900 hover:bg-stone-50"
                >{{ item.name }}</a
              >
            </div>
            <div class="py-6">
              <a
                href="/dashboard"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-stone-900 hover:bg-stone-50"
                @click="onLogin"
              >
                {{ isLoggedin ? "Logout" : "Login" }}
              </a>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel } from "@headlessui/vue";
import { ref } from "vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

const navigation = [
  { name: "App", href: "/app" },
  { name: "Preise", href: "/prices" },
];

const mobileMenuOpen = ref(false);

const isLoggedin = ref(false);
const onLogin = () => {
  isLoggedin.value = !isLoggedIn.value;
};

const { y } = useWindowScroll();
const classes = computed(() => {
  if (y.value > 2) {
    return "bg-white bg-opacity-80 shadow-md";
  }

  return [];
});
</script>
