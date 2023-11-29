<template>
  <header class="fixed inset-x-0 top-0 z-50">
    <div class="max-w-2xl w-auto pt-8 mx-auto px-8">
      <nav
        class="flex justify-between items-center bg-white bg-opacity-75 backdrop-blur-lg rounded-xl flex gap-x-8 px-2 shadow"
        aria-label="Global"
      >
        <div class="flex items-center">
          <div>
            <a href="#" class="flex items-center gap-x-2">
              <span class="sr-only">Your Company</span>
              <div class="p-2 h-9 w-9 rounded-md bg-orange-600 text-white">
                R
              </div>
              Recipe Rift
            </a>
          </div>

          <div class="hidden lg:block w-px h-4 mx-4 bg-stone-300"></div>

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
            href="#"
            class="rounded-md leading-6 bg-white px-2 py-1 text-sm font-semibold text-stone-900 shadow-md ring-1 ring-stone-200 hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-300"
          >
            Login
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
      <div class="fixed inset-0 z-50" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-stone-900/10"
      >
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
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
                href="#"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-stone-900 hover:bg-stone-50"
              >
                Login
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
  { name: "Produkt", href: "#" },
  { name: "Funktionen", href: "#" },
  { name: "Über Uns", href: "#" },
];

const mobileMenuOpen = ref(false);
</script>
