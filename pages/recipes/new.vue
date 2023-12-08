<template>
  <div>
    <NuxtLayout name="recipe">
      <div class="leading-6 text-xl">Erzähle uns von deinem Rezept</div>

      <div class="rounded-xl border border-1 border-gray-900/20 p-4">
        <client-only>
          <TipTapEditor ref="editorRef" v-model:json="json" />
        </client-only>
      </div>

      <div class="">HTML Output <button @click="onClick">render</button></div>
      <div class="rounded-xl border border-1 border-gray-900/20 p-4">
        <RenderContent :html="htmlData" />
      </div>
    </NuxtLayout>

    <!-- {{ json }} -->
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const editorRef = ref();
const htmlData = ref("");

const onClick = () => {
  if (!editorRef.value) return;

  htmlData.value = editorRef.value.getHTML();
};

const json = ref({
  type: "doc",
  content: [
    {
      type: "vue-instruction-step",
      attrs: { title: "Schritt 1", content: "Irgendein Text" },
    },
    { type: "paragraph" },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Alle trockenen und frischen Zutaten gründlich miteinander mischen. Kochendes Wasser zugießen, ab ca. 120 ml langsamer gießen und gleichzeitig intensiv rühren. Ca. 10 min stehen lassen, der Teig sollte zügig eindicken. Dann Olivenöl und Zitronensaft untermischen.",
        },
      ],
    },
    {
      type: "vue-countdown-timer",
      attrs: { name: "Teig quellen lassen", duration: 600 },
    },
    { type: "paragraph", content: [{ type: "text", text: "Schritt 2" }] },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: 'Mit feuchten Händen - der Teig klebt sehr stark - flache "Burger" formen.',
        },
        { type: "hardBreak" },
        { type: "hardBreak" },
        { type: "text", text: "Schritt 3" },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Eine Pfanne auf mittlere Hitze erhitzen, Olivenöl hineingeben und nacheinander die Falafel zugedeckt braten. Das verhindert das Austrocknen. Möglichst nur einmal wenden.",
        },
      ],
    },
    { type: "paragraph", content: [{ type: "text", text: "Schritt 4" }] },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Nach meinen Erfahrungen ist die benötigte Wassermenge sehr vom Mehl abhängig. Falls es zu breiig wird, noch etwas Kichererbsenmehl hinzufügen.",
        },
        { type: "hardBreak" },
        { type: "hardBreak" },
        {
          type: "text",
          text: 'Nachtrag: Im Handel werden verschiedene Arten von Kichererbsenmehl angeboten, diese haben unterschiedlichen "Wasserbedarf". Der Teig sollte die Konsistenz von Kloßmasse bekommen. Beim ersten Mal mit "unbekanntem" Mehl daher ggf. das Wasser zunächst nur vorsichtig zugeben oder mit mehr Mehl andicken.',
        },
      ],
    },
    { type: "vue-countdown-timer", attrs: { name: "", duration: "" } },
    { type: "paragraph" },
  ],
});
</script>
