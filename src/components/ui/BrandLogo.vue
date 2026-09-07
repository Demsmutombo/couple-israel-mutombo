<script setup>
import coupleLogoUrl from '@/logo.jpeg'

defineProps({
  size: { type: String, default: 'md' },
})

const sizes = {
  sm: 'h-9 w-9',
  md: 'h-11 w-11',
  lg: 'h-16 w-16',
  hero: 'h-44 w-44 sm:h-56 sm:w-56 md:h-64 md:w-64',
}
</script>

<template>
  <span :class="['logo-mark inline-flex shrink-0', sizes[size] || sizes.md]">
    <img
      :src="coupleLogoUrl"
      alt="Israël Mutombo — Le couple"
      class="h-full w-full object-cover"
      style="object-position: center 18%"
      decoding="async"
    />
  </span>
</template>
