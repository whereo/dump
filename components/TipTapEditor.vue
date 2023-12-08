<template>
  <div v-if="editor">
    <FloatingMenu
      class="bg-gray-100 rounded-full flex gap-x-4 px-2 py-px"
      :tippy-options="{ duration: 100, offset: [-30, 0] }"
      :editor="editor"
    >
      <!-- <button
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      >
        Überschrift
      </button> -->
      <button
        @click="editor.chain().focus().addTimer().run()"
        :class="{ 'is-active': editor.isActive('timer') }"
      >
        Timer
      </button>
      <button
        @click="onAddStep"
        :class="{ 'is-active': editor.isActive('instructionStep') }"
      >
        Step
      </button>
    </FloatingMenu>

    <EditorContent :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { Editor, EditorContent, FloatingMenu } from "@tiptap/vue-3";
import { StarterKit } from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { onMounted, onBeforeUnmount } from "vue";

import CountdownTimer from "./tiptap/countdown-timer/index";
import InstructionStep from "./tiptap/instruction-step/index";

const props = defineProps<{
  json: object;
}>();

const emit = defineEmits<{
  (e: "update:json", json: string): void;
}>();

const editor = ref<Editor>();

const getJSON = () => {
  if (!editor.value) return "";

  return editor.value.getJSON();
};

const getHTML = () => {
  if (!editor.value) return "";

  return editor.value.getHTML();
};

watchEffect(() => {
  if (!editor.value) return;

  const isSame =
    JSON.stringify(editor.value.getJSON()) === JSON.stringify(props.json);

  if (isSame) return;

  editor.value.commands.setContent(props.json, false);
});

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit,
      CountdownTimer,
      InstructionStep,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What's the title?";
          }

          return "Can you add some further context?";
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
    onUpdate: () => {
      if (!editor.value) return;

      emit("update:json", editor.value.getJSON());
    },
  });
});

const stepIndex = ref(1);

const onAddStep = () => {
  editor.value.chain().focus().addStep(stepIndex.value).run();

  stepIndex.value++;
};

defineExpose({
  getJSON,
  getHTML,
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<style>
.tiptap h1 {
  font-size: 2rem;
}

.tiptap p.is-empty::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

.tiptap p {
  margin: 1em 0;
}
</style>
