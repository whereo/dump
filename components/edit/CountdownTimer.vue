<template>
  <div class="ring-1 ring-gray-200 rounded-xl overflow-hidden">
    <div class="px-4 py-2 bg-gray-50 flex justify-between items-center">
      <div>
        <div class="text-xs font-semibold leading-5 text-gray-900">Timer</div>
        <div class="text-xs mt-px leading-5 text-gray-600">
          Stelle sicher, dass nichts anbrennt indem du anderen Köchinnen einen
          Timer gibst.
        </div>
      </div>

      <button class="h-10 w-10 p-1 hover:bg-gray-100" @click="onRemoveTimer">
        <XMarkIcon />
      </button>
    </div>

    <div class="p-4 grid grid-cols-1 gap-6 sm:grid-cols-6">
      <div class="sm:col-span-4">
        <label for="name" class="block text-xs font-medium leading-6 text-gray-900">
          Name des Timers
        </label>
        <div class="mt-2">
          <input type="text" name="name" v-model="data.name" id="name" placeholder="z.B. Reis kochen"
            class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stone-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div class="sm:col-span-2">
        <label for="duration" class="block text-xs font-medium leading-6 text-gray-900">Dauer</label>
        <div class="mt-2 flex items-center gap-x-1">
          <input type="text" v-model.number="duration.minutes" placeholder="00"
            class="text-center w-10 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stone-600 sm:text-sm sm:leading-6" />
          :
          <input type="text" v-model.number="duration.seconds" placeholder="00"
            class="text-center w-10 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stone-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type InstructionStep } from "@/types/types";
import { ref, watch, watchEffect } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps<{
  timer: InstructionStep["timer"];
}>();

const emit = defineEmits<{
  (e: "update:timer", payload: InstructionStep["timer"]): void;
  (e: "remove"): void;
}>();

const data = ref<{
  name: string | null
  duration: number | null
}>({
  name: props.timer ? props.timer.name : null,
  duration: props.timer ? props.timer.duration : null,
});

watch(
  data,
  (val) => {
    if (!val.name || !val.duration) return

    const payload = {
      name: val.name,
      duration: val.duration
    }
    emit("update:timer", payload);
  },
  { deep: true },
);

const duration = ref<{
  minutes: number | null;
  seconds: number | null;
}>({
  minutes: null,
  seconds: null,
});

watchEffect(() => {
  if (!data.value.duration) return;

  const minutes = Math.floor(data.value.duration / 60);
  const seconds = data.value.duration % 60;

  duration.value.minutes = minutes;
  duration.value.seconds = seconds;
});

watch(
  duration,
  (val) => {
    let mins = 0;
    let seconds = 0;

    if (val.minutes) {
      mins = val.minutes * 60;
    }

    if (val.seconds) {
      seconds = val.seconds;
    }

    data.value.duration = mins + seconds;
  },
  { deep: true },
);

const onRemoveTimer = () => {
  emit("remove");
};
</script>
