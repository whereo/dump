<template>
  <!-- Hero section -->
  <HeroSection />

  <!-- Feature section -->
  <FeaturesSection id="features" />

  <!-- Testimonial section -->
  <!-- <TestimonialSection /> -->

  <!-- Pricing section -->
  <PricingSection />

  <!-- CTA section -->
  <CtaSection />
</template>

<script setup lang="ts">
definePageMeta({
  layout: "app",
});

const preferredMotion = usePreferredReducedMotion();
const fullAnimation = computed(() => preferredMotion.value === "no-preference");

provide("animate", fullAnimation);
</script>
