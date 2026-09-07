<script setup>
defineProps({
  size: { type: String, default: 'md' },
})
</script>

<template>
  <svg
    viewBox="0 0 64 64"
    fill="none"
    aria-hidden="true"
    :class="size === 'lg' ? 'h-16 w-16' : size === 'sm' ? 'h-7 w-7' : 'h-10 w-10'"
  >
    <path d="M32 4 L38 26 L60 32 L38 38 L32 60 L26 38 L4 32 L26 26 Z" stroke="#b58e6d" stroke-width="1.2" />
    <circle cx="32" cy="32" r="5" fill="#b58e6d" />
  </svg>
</template>
