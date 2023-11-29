import { mergeAttributes, Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";

import CountdownTimerEdit from "./CountdownTimerEdit.vue";

export default Node.create({
  name: "vueComponent",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      name: {
        default: "",
      },
      duration: {
        default: "600",
      },
    };
  },

  renderHTML(el) {
    console.log(el);
    // const children = el.content.map((child) => this.renderElement(child));

    // // few handled cases to give a taste
    // if (el.type === "text") return el.text;
    // if (el.type === "paragraph") return `<p>${children}</p>`;

    return ["countdown-timer-lol"];
  },

  parseHTML() {
    return [
      {
        tag: "countdown-timer",
      },
    ];
  },

  // renderHTML({ HTMLAttributes }) {
  //   return ["countdown-timer", mergeAttributes(HTMLAttributes)];
  // },

  addNodeView() {
    return VueNodeViewRenderer(CountdownTimerEdit);
  },
});
