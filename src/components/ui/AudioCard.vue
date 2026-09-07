<script setup>
defineProps({
  name: String,
  role: String,
  kind: String,
  src: String,
})
</script>

<template>
  <article class="archive-card p-5">
    <div class="relative mb-6 h-40 overflow-hidden">
      <img v-if="src" :src="src" :alt="name" class="h-full w-full object-cover" style="object-position: center 20%" />
    </div>
    <p class="museum-kicker">{{ kind }}</p>
    <h3 class="mt-2 font-display text-2xl">{{ name }}</h3>
    <p class="mt-1 text-xs text-subtle">{{ role }}</p>
  </article>
</template>
