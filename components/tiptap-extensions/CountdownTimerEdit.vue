<template>
  <node-view-wrapper class="vue-component">
    <div
      class="mt-4 ring-1 ring-gray-200 rounded-xl p-4 flex justify-between items-center gap-x-2"
    >
      <div class="flex items-center gap-x-2 cursor-pointer rounded-lg">
        <div class="h-10 w-10 p-2 rounded-full bg-gray-700 text-white shrink-0">
          <PlayIcon />
        </div>

        <div
          class="text-sm font-semibold leading-6 text-gray-900 font-semibold flex"
        >
          <div class="flex items-center gap-x-2">
            <input
              type="text"
              v-model="countdownName"
              placeholder="Name des Timers"
              class="ring-1 ring-gray-200"
            />
          </div>
        </div>
      </div>

      <div class="flex items-center gap-x-2">
        <div class="font-semibold tracking-wide tabular-nums flex">
          <input
            type="text"
            v-model.number="duration.minutes"
            placeholder="00"
            class="ring-1 ring-gray-200 w-12"
          />
          :
          <input
            type="text"
            v-model.number="duration.seconds"
            placeholder="00"
            class="ring-1 ring-gray-200 w-12"
          />
        </div>
      </div>
    </div>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { PlayIcon } from "@heroicons/vue/24/outline";
import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import { watch } from "vue";

const props = defineProps({
  ...nodeViewProps,
  updateAttributes: {
    type: Function,
    required: true,
  },
});

const countdownName = ref();
const duration = ref({
  minutes: 0,
  seconds: 0,
});

watch(countdownName, () => {
  props.updateAttributes({
    name: countdownName.value,
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
