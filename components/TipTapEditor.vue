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
        @click="editor.chain().focus().toggleTimer().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        Timer
      </button>
    </FloatingMenu>
    <EditorContent :editor="editor" />

    <pre class="text-xs">{{ json }}</pre>

    Output<br />
    <GenerateHTML />
  </template>
</template>

<script setup lang="ts">
import { Editor, EditorContent, FloatingMenu } from "@tiptap/vue-3";
import { StarterKit } from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { onMounted, onBeforeUnmount } from "vue";

import CountdownTimer from "./tiptap-extensions/CountdownTimer";

const editor = ref(null);

const json = computed(() => {
  if (!editor.value) return "";
  return editor.value.getJSON();
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
    content: `
        This is some default text

        <div class="bg-red-200">some block<input /></div>

        <countdown-timer name="" duration="10"></countdown-timer>

        This is some default text

      `,
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
