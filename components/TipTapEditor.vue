<template>
  <template v-if="editor">
    <FloatingMenu
      class="bg-gray-100 rounded-full flex gap-x-4 px-2 py-px"
      :tippy-options="{ duration: 100, offset: [-30, 0] }"
      :editor="editor"
    >
      <button
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        H1
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        H2
      </button>
      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        Bullet List
      </button>
      <button
        @click="editor.chain().focus().addTimer().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        Timer
      </button>
    </FloatingMenu>

    <EditorContent :editor="editor" />
  </template>
</template>

<script setup lang="ts">
import { Editor, EditorContent, FloatingMenu } from "@tiptap/vue-3";
import { StarterKit } from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { onMounted, onBeforeUnmount } from "vue";

import CountdownTimer from "./tiptap/extensions/CountdownTimer";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", html: string): void;
  (e: "pointerenter"): void;
  (e: "pointerleave"): void;
}>();

const editor = ref<Editor>();

watchEffect(() => {
  if (!editor.value) return;

  // HTML
  const isSame = editor.value.getHTML() === props.modelValue;

  // JSON
  // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(props.modelValue)

  if (isSame) {
    return;
  }

  editor.value.commands.setContent(props.modelValue, false);
});

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit,
      CountdownTimer,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What’s the title?";
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

      // HTML
      emit("update:modelValue", editor.value.getHTML());

      // JSON
      // this.$emit('update:modelValue', this.editor.getJSON())
    },
  });
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
