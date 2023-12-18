<template>
  <!-- Hero section -->
  <MarketingHeroSection />

  <!-- Feature section -->
  <MarketingFeaturesSection id="features" />

  <!-- Testimonial section -->
  <!-- <TestimonialSection /> -->

  <!-- Pricing section -->
  <MarketingPricingSection />

  <!-- CTA section -->
  <MarketingCtaSection />
</template>

<script setup lang="ts">
definePageMeta({
  // layout: "app",
});

const preferredMotion = usePreferredReducedMotion();
const fullAnimation = computed(() => preferredMotion.value === "no-preference");

provide("animate", fullAnimation);
</script>
