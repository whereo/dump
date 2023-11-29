<template>
  <div class="h-full mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div
      class="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-4"
    >
      <div class="lg:col-start-2 lg:col-span-2">
        <slot name="header"></slot>
      </div>
      <div class="relative lg:col-start-4 lg:row-start-2 lg:h-full">
        <slot name="aside"></slot>
      </div>
      <div
        class="lg:col-start-2 lg:row-start-2 lg:col-span-2 lg:row-span-2 lg:row-end-2"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
