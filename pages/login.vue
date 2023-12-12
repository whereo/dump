<template>
  <div class="w-full h-full bg-gray-50 flex justify-center items-center p-4">
    <div
      class="bg-white px-6 py-8 rounded-xl shadow-lg flex flex-col items-center gap-8 max-w-lg"
    >
      <Logo />

      <p class="text-gray-600 text-center">
        Gib uns deine Email-Adresse und wir senden dir einen Link mit dem du
        dich anmelden kannst. Wir benötigen somit kein Passwort.
      </p>

      <div
        v-if="showSuccessMessage"
        class="rounded-lg p-4 bg-orange-50 ring-1 ring-orange-500 text-center"
      >
        Wir haben einen Link an <strong>{{ email }}</strong> geschickt mit dem
        du dich anmelden kannst.
      </div>

      <form
        v-else
        @submit="signInWithOtp"
        class="w-full flex flex-col items-center gap-4"
      >
        <input
          v-model="email"
          type="email"
          placeholder="max@mustermann.de"
          class="w-full lg:w-2/3 rounded-lg p-2 outline-none text-base ring-1 ring-gray-300 hover:ring-2 hover:ring-orange-600 transition duration-300"
          autofocus
          :disabled="pending"
        />
        <button
          type="button"
          class="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          @click="signInWithOtp"
          :disabled="pending"
        >
          Anmelden
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const supabase = useSupabaseClient();
const email = ref("");
const pending = ref(false);
const showSuccessMessage = ref(false);

const signInWithOtp = async () => {
  pending.value = true;
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: "https://zcjz4n-3000.csb.app/confirm",
    },
  });

  if (error) {
    console.log(error);
  } else {
    showSuccessMessage.value = true;
  }

  pending.value = false;
};
</script>
