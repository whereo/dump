import { mergeAttributes, Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import CountdownTimerEdit from "../CountdownTimerEdit.vue";

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
        default: 600,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "countdown-timer",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["countdown-timer", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return VueNodeViewRenderer(CountdownTimerEdit);
  },

  addCommands() {
    return {
      addTimer:
        () =>
        ({ commands, chain }) => {
          if (this.options.keepAttributes) {
            return chain().insertContent("moin").run();
          }
          return commands.toggleList(
            this.name,
            this.options.itemTypeName,
            this.options.keepMarks,
          );
        },
    };
  },
});
