<template>
  <div
    class="mt-4 ring-1 ring-gray-200 rounded-xl p-4 flex justify-between items-center gap-x-2"
  >
    <div class="flex items-center gap-x-2 cursor-pointer rounded-lg">
      <div
        class="h-10 w-10 p-2 rounded-full bg-orange-700 text-white transition duration-100 hover:scale-105 shrink-0"
        @click="onToggleTimer"
      >
        <template v-if="playing">
          <PauseIcon />
        </template>
        <template v-else>
          <PlayIcon />
        </template>
      </div>

      <div
        class="text-sm font-semibold leading-6 text-gray-900 font-semibold flex"
      >
        <div class="flex items-center gap-x-2">{{ name }}</div>
        <div
          v-if="timeElapsed"
          @click="resetTimer()"
          class="h-8 w-8 p-1.5 rounded-full bg-gray-50 text-gray-800 cursor-pointer"
        >
          <XMarkIcon />
        </div>
      </div>
    </div>

    <div class="flex items-center gap-x-2">
      <div
        @click="subtractMinute()"
        class="h-8 w-8 p-1.5 rounded-full bg-gray-50 text-gray-800 cursor-pointer"
      >
        <MinusIcon />
      </div>

      <div class="font-semibold tracking-wide tabular-nums">{{ timeLeft }}</div>

      <div
        @click="addMinute()"
        class="h-8 w-8 p-1.5 rounded-full bg-gray-50 text-gray-800 cursor-pointer"
      >
        <PlusIcon />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PauseIcon,
  PlayIcon,
  XMarkIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps<{
  name: string;
  duration: number | string;
}>();

const emit = defineEmits<{
  (e: "finished"): void;
}>();

const playing = ref(false);
const interval = ref();

const secondsLeft = ref(0);

const inputRef = ref<HTMLInputElement>();
const onEditClick = () => {
  inputRef.value?.focus();
};

watchEffect(() => {
  const isString = typeof props.duration === "string";
  secondsLeft.value = isString ? Number(props.duration) : props.duration;
});

const timeLeft = computed(() => {
  const minutes = Math.floor(secondsLeft.value / 60);
  const seconds = secondsLeft.value % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0",
  )}`;
});

const timeElapsed = computed(
  () => props.duration > secondsLeft.value || interval.value,
);

const onToggleTimer = () => {
  playing.value = !playing.value;

  if (playing.value) {
    startTimer();
  } else {
    stopTimer();
  }
};

const startTimer = () => {
  // Clear any existing interval
  if (interval.value) {
    clearInterval(interval.value);
  }

  // Set interval
  interval.value = setInterval(() => {
    secondsLeft.value--;

    // Clear interval if reached zero
    if (secondsLeft.value <= 0) {
      emit("finished");

      stopTimer();
    }
  }, 1000);
};

const stopTimer = () => {
  if (interval.value) {
    clearInterval(interval.value);

    interval.value = undefined;
    secondsLeft.value = 0;
  }

  playing.value = false;
};

const resetTimer = () => {
  secondsLeft.value = props.duration;
  stopTimer();
};

const addMinute = () => {
  secondsLeft.value += 60;
};

const subtractMinute = () => {
  const temp = secondsLeft.value - 60;
  secondsLeft.value = temp > 0 ? temp : 0;
};
</script>
