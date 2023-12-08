<script lang="ts">
import { h } from "vue";
import CountdownTimer from "./CountdownTimer.vue";

export default defineComponent({
  props: {
    html: {
      type: String,
      default: "",
    },
  },
  render() {
    const r = {
      components: {
        CountdownTimer,
      },
      template: this.html,
    };
    return h(r);
  },
});
</script>
