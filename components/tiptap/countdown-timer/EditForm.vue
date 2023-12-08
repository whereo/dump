<template>
  <node-view-wrapper class="vue-countdown-timer">
    <div class="mt-4 ring-1 ring-gray-200 rounded-xl overflow-hidden">
      <div class="px-4 py-2 bg-gray-50">
        <div class="text-sm font-semibold leading-5 text-gray-900">Timer</div>
        <div class="mt-px text-sm leading-5 text-gray-600">
          Stelle sicher, dass nichts anbrennt indem du anderen Köchinnen einen
          Timer gibst.
        </div>
      </div>

      <div class="p-4 grid grid-cols-1 gap-6 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <label
            for="name"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Name des Timers
          </label>
          <div class="mt-2">
            <input
              type="text"
              name="name"
              v-model="name"
              id="name"
              placeholder="z.B. Reis kochen"
              class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stone-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="sm:col-span-2">
          <label
            for="duration"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Dauer</label
          >
          <div class="mt-2 flex items-center gap-x-1">
            <input
              type="text"
              v-model.number="duration.minutes"
              placeholder="00"
              class="text-center w-10 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stone-600 sm:text-sm sm:leading-6"
            />
            :
            <input
              type="text"
              v-model.number="duration.seconds"
              placeholder="00"
              class="text-center w-10 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stone-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
    </div>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import { watch } from "vue";

const props = defineProps({
  ...nodeViewProps,
  updateAttributes: {
    type: Function,
    required: true,
  },
});

const name = ref();
const duration = ref({
  minutes: "",
  seconds: "",
});

watch(name, () => {
  props.updateAttributes({
    name: name.value,
  });
});

watch(
  duration,
  () => {
    let mins = 0;
    let seconds = 0;

    if (duration.value.minutes) {
      mins = duration.value.minutes * 60;
    }

    if (duration.value.seconds) {
      seconds = duration.value.seconds;
    }

    props.updateAttributes({
      duration: mins + seconds,
    });
  },
  { deep: true },
);
</script>
