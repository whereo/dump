<template>
  <div class="mx-auto mt-32 max-w-7xl px-6 lg:px-8">
    <footer
      aria-labelledby="footer-heading"
      class="relative border-t border-gray-900/10 py-24 sm:mt-56 sm:py-32"
    >
      <nav
        class="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
        aria-label="Footer"
      >
        <div
          v-for="item in footerNavigation.main"
          :key="item.name"
          class="pb-6"
        >
          <a
            :href="item.href"
            class="text-sm leading-6 text-gray-600 hover:text-gray-900"
            >{{ item.name }}</a
          >
        </div>
      </nav>

      <p class="mt-10 text-center text-xs leading-5 text-gray-500">
        &copy; {{ year }} Recipe Rift. All rights reserved.
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const footerNavigation = {
  main: [
    { name: "App", href: "/app" },
    { name: "Preise", href: "/prices" },
    { name: "Login", href: "#" },
  ],
};

const year = new Date().getFullYear();
</script>
