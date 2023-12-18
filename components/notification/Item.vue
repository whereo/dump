<template>
  <div
    class="relative max-w-96 w-auto flex justify-between items-center px-4 py-3 backdrop-blur-lg text-gray-200 rounded-xl overflow-hidden shadow-2xl gap-x-12"
  >
    <div class="absolute inset-0 bg-stone-800 opacity-80 -z-10"></div>
    <div class="flex items-center gap-x-2">
      <div v-if="notification.icon" class="w-6 h-6">
        <component :is="notification.icon" />
      </div>
      <div>
        <div class="text-sm font-semibold text-white">
          {{ notification.title }}
        </div>
        <div v-if="notification.content" class="text-sm text-gray-200">
          {{ notification.content }}
        </div>
      </div>
    </div>

    <div class="flex items-center gap-x-4">
      <template v-if="notification.action">
        <button
          type="button"
          class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          @click="notification.action.callback"
        >
          {{ notification.action.name }}
        </button>
      </template>
      <button class="h-6 w-6 cursor-pointer" @click="onDelete">
        <XMarkIcon />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { type AppNotification } from "@/types/types";

defineProps<{
  notification: AppNotification;
}>();

const emit = defineEmits<{
  (e: "delete"): void;
}>();

onMounted(() => {
  setTimeout(() => {
    onDelete();
  }, 3000);
});

const onDelete = () => {
  emit("delete");
};
</script>
