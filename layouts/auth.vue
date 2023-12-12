<template>
  <header class="w-full border-b border-gray-800/10">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <Logo />
      </div>

      <div class="w-1/2">
        <input
          placeholder="Suche"
          class="w-full outline-none rounded p-2 ring-1 ring-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 transition duration-300"
        />
      </div>

      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <template v-if="user">
          <button
            href="#"
            class="text-sm font-semibold leading-6 text-gray-900"
          >
            Log out <span aria-hidden="true">&rarr;</span>
          </button>
        </template>
        <template v-else>
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900"
            >Log in <span aria-hidden="true">&rarr;</span></a
          >
        </template>
      </div>
    </nav>
  </header>

  <main class="isolate">
    <slot />
  </main>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const signOut = async () => {
  await supabase.auth.signOut();
};
</script>

<style>
:root {
  --headerHeight: 72px;
}
</style>
