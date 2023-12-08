import { mergeAttributes, Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import CountdownTimerEdit from "./EditForm.vue";

const NAME = "vue-countdown-timer";

export default Node.create({
  name: NAME,
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
    return [{ tag: NAME }];
  },

  renderHTML({ HTMLAttributes }) {
    return [NAME, mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return VueNodeViewRenderer(CountdownTimerEdit);
  },

  addCommands() {
    return {
      addTimer:
        () =>
        ({ chain }) => {
          chain()
            .insertContent([
              { type: NAME, attrs: { name: "", duration: "" } },
              { type: "paragraph" },
            ])
            .run();
        },
    };
  },
});
