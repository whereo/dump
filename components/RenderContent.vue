<script>
import { h } from "vue";
import CountdownTimer from "/components/tiptap/countdown-timer/CountdownTimer.vue";
import InstructionStep from "/components/tiptap/instruction-step/InstructionStep.vue";

export default {
  props: {
    html: {
      type: String,
      default: "",
    },
  },

  emits: ["pointerenter", "pointerleave"],

  render() {
    const r = {
      components: {
        "vue-countdown-timer": CountdownTimer,
        "vue-instruction-step": InstructionStep,
      },
      template: this.html,
    };

    if (!this.html) return;

    return h(r);
  },
};
</script>
