<template>
  <header class="w-full border-b border-gray-800/10">
    <nav
      class="mx-auto flex max-w-7xl flex items-center justify-between gap-2 p-2 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <AppLogo />
      </div>

      <div class="flex-1 lg:flex-none lg:w-1/2">
        <input
          placeholder="Suche"
          class="w-full outline-none rounded p-2 ring-1 ring-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 transition duration-300"
        />
      </div>

      <div class="flex lg:flex-1 justify-end">
        <template v-if="user">
          <button
            href="#"
            @click="signOut"
            class="text-sm font-semibold leading-6 text-gray-900"
          >
            Ausloggen <span aria-hidden="true">&rarr;</span>
          </button>
        </template>
        <template v-else>
          <NuxtLink
            href="/login"
            class="text-sm font-semibold leading-4 text-gray-900 hover:text-orange-600 hover:ring-1 hover:ring-gray-200 -mx-3 px-3 py-2 rounded-full"
            >Einloggen <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
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

defineEmits(["pointerenter", "pointerleave"]);

const signOut = async () => {
  await supabase.auth.signOut();
};
</script>
