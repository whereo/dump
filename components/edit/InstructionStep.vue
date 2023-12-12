<template>
  <div
    class="mt-4 flex flex-col bg-white ring-1 ring-gray-200 rounded-2xl overflow-hidden"
  >
    <div class="flex justify-between items-center">
      <input
        ref="titleRef"
        type="text"
        name="title"
        id="title"
        v-model="step.title"
        :placeholder="`Schritt ${index}`"
        @keyup.enter="onPressEnter"
        class="block w-full text-lg border-0 outline-none px-4 py-3 text-gray-900 placeholder:text-stone-600 sm:leading-6"
      />

      <button
        v-if="deleteable"
        type="button"
        class="mr-4 h-8 w-8 cursor-pointer text-gray-400 hover:text-gray-600"
        @click="emit('delete')"
      >
        <XMarkIcon />
      </button>
    </div>

    <textarea
      ref="contentRef"
      @input="resizeContent"
      rows="4"
      name="comment"
      v-model="step.content"
      id="comment"
      placeholder="Beschreibe den Schritt..."
      class="block w-full text-base border-0 outline-none resize-none px-4 py-3 text-gray-900 placeholder:text-stone-600 sm:leading-6"
    />

    <div class="flex gap-2 p-4">
      <button
        @click="open()"
        class="inline-flex items-center cursor-pointer rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <PlusIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
        <template v-if="!data.image">Bild hinzufügen </template>
        <template v-else> Bild ändern </template>
      </button>

      <template v-if="!data.timer">
        <button
          type="button"
          class="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          @click="onAddTimer"
        >
          <PlusIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Timer
        </button>
      </template>
    </div>

    <div v-if="data.image" class="p-4">
      <img
        class="w-full h-full object-cover rounded-lg"
        :src="data.image.source"
      />

      <input
        v-model="data.image.caption"
        placeholder="Bildbeschreibung (optional)"
        class="w-full py-1"
        @keyup.enter="focusTitleRef"
      />
    </div>

    <div v-if="data.timer" class="px-4 pb-4">
      <EditCountdownTimer
        :timer="data.timer"
        @update:timer="onUpdateTimer"
        @remove="onRemoveTimer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFileDialog } from "@vueuse/core";
import { type InstructionStep } from "@/types/types";
import { PlusIcon, XMarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps<{
  index: number;
  deleteable: boolean;
  step: InstructionStep;
}>();

const emit = defineEmits<{
  (e: "update:step", payload: InstructionStep): void;
  (e: "delete"): void;
}>();

const data = computed({
  get: () => props.step,
  set: (val) => emit("update:step", val),
});

const isVisible = ref({
  timer: false,
  image: false,
});

const onAddTimer = () => {
  isVisible.value.timer = true;

  data.value.timer = {
    name: "",
    duration: "",
  };
};

const onRemoveTimer = () => {
  isVisible.value.timer = false;
  data.value.timer = undefined;
};

const onUpdateTimer = (payload: InstructionStep["timer"]) => {
  data.value.timer = payload;
};

const titleRef = ref();
const focusTitleRef = () => {
  titleRef.value.focus();
};

const contentRef = ref();
const onPressEnter = () => {
  contentRef.value.focus();
};

const { open, onChange } = useFileDialog({
  accept: "image/*",
});

onChange((files: File[]) => {
  if (!data.value.image) {
    data.value.image = {
      source: null,
      caption: undefined,
    };
  }
  data.value.image.source = files[0];
});

onMounted(() => {
  focusTitleRef();
  resizeContent();
});

const THRESHOLD = 50;

const resizeContent = () => {
  if (!contentRef.value) return;

  contentRef.value.style.height = "auto";

  if (contentRef.value.scrollHeight > THRESHOLD) {
    contentRef.value.style.height = `${contentRef.value.scrollHeight}px`;
  } else {
    contentRef.value.style.height = `$THRESHOLD}px`;
  }
};
</script>
