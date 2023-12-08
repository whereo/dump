<template>
  <node-view-wrapper class="vue-instruction-step">
    <div class="mt-4 ring-1 ring-gray-200 rounded-xl overflow-hidden">
      <div class="px-4 py-2">
        <div class="text-sm font-semibold leading-5 text-gray-900">
          <label
            for="title"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Schritt {{ props.node.attrs.index }}
          </label>
          <div class="mt-2 flex rounded-md shadow-sm">
            <span
              class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm"
              >Schritt
            </span>
            <input
              type="text"
              name="title"
              id="title"
              v-model="title"
              class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="www.example.com"
            />
          </div>
        </div>
      </div>

      <div class="p-4">
        <label
          for="comment"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Beschreibung</label
        >
        <div class="mt-2">
          <textarea
            rows="4"
            name="comment"
            v-model="content"
            id="comment"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
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

const stepIndex = ref(1);

const title = ref();
const content = ref();

watch(title, () => {
  props.updateAttributes({
    title: title.value,
  });
});

watch(content, () => {
  props.updateAttributes({
    content: content.value,
  });
});
</script>
