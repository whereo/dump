import { mergeAttributes, Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import InstructionStepEdit from "./EditForm.vue";

const NAME = "vue-instruction-step";

export default Node.create({
  name: NAME,
  group: "block",
  atom: true,
  addAttributes() {
    return {
      index: { default: 0 },
      title: { default: "Schritt" },
      content: { default: "" },
    };
  },
  parseHTML() {
    return [{ tag: NAME }];
  },
  renderHTML({ HTMLAttributes }) {
    return [NAME, mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return VueNodeViewRenderer(InstructionStepEdit);
  },
  addCommands() {
    return {
      addStep:
        (index: number) =>
        ({ chain }) => {
          chain()
            .insertContent([
              { type: NAME, attrs: { index } },
              { type: "paragraph" },
            ])
            .run();
        },
    };
  },
});
