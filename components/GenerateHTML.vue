<template>
  <div v-html="output"></div>
</template>

<script>
// Option 1: Browser + server-side
// import Bold from "@tiptap/extension-bold";
// Option 2: Browser-only (lightweight)
// import { generateHTML } from '@tiptap/core'
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { generateHTML } from "@tiptap/html";
import CountdownTimer from "./tiptap-extensions/CountdownTimer";

const json = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This is some default text",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "some block",
        },
      ],
    },
    {
      type: "vueComponent",
      attrs: {
        name: "",
        duration: 10,
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: " This is some more text",
        },
      ],
    },
  ],
};

export default {
  computed: {
    output() {
      return generateHTML(json, [Document, Paragraph, Text, CountdownTimer]);
    },
  },
};
</script>
