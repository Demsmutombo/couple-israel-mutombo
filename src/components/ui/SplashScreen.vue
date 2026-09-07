<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import BrandLogo from '@/components/ui/BrandLogo.vue'
import { memoryContent } from '@/content'

const emit = defineEmits(['dismissed'])
const visible = ref(true)
const duration = memoryContent.splash?.minVisibleMs || 3200
let timer = null
let closed = false

function finish() {
  if (closed) return
  closed = true
  document.body.classList.remove('overflow-hidden')
  emit('dismissed')
}

function skip() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  visible.value = false
}

onMounted(() => {
  document.body.classList.add('overflow-hidden')
  timer = setTimeout(() => {
    visible.value = false
  }, duration)
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
  document.body.classList.remove('overflow-hidden')
})
</script>

<template>
  <Teleport to="body">
    <Transition name="splash" @after-leave="finish">
      <div
        v-if="visible"
        class="fixed inset-0 z-[10000] flex cursor-pointer flex-col items-center justify-center bg-gradient-to-b from-brand-dark via-splash-mid to-void px-6"
        role="dialog"
        aria-label="Ouverture"
        aria-busy="true"
        @click="skip"
      >
        <div class="flex max-w-3xl flex-col items-center text-center">
          <div class="splash-logo-float">
            <BrandLogo size="hero" />
          </div>
          <p class="script mt-10 text-[2.75rem] leading-none !text-white sm:mt-12 sm:text-6xl md:mt-14 md:text-7xl">
            {{ memoryContent.couple.shortName }}
          </p>
        </div>
        <div class="absolute bottom-10 left-1/2 h-1 w-24 -translate-x-1/2 overflow-hidden rounded-full bg-white/10">
          <div class="splash-progress h-full origin-left rounded-full bg-[#ed4d8b]" :style="{ '--splash-dur': `${duration}ms` }" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.splash-enter-active,
.splash-leave-active {
  transition: opacity 0.65s ease, transform 0.65s ease;
}
.splash-enter-from,
.splash-leave-to {
  opacity: 0;
  transform: scale(1.02);
}

.splash-progress {
  width: 100%;
  animation: splash-progress var(--splash-dur, 3.2s) ease-out forwards;
}

@keyframes splash-progress {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.splash-logo-float {
  animation: splash-logo-float 2.6s ease-in-out infinite alternate;
}

@keyframes splash-logo-float {
  from {
    transform: translateY(0) scale(1);
  }
  to {
    transform: translateY(-10px) scale(1.035);
  }
}

@media (prefers-reduced-motion: reduce) {
  .splash-logo-float {
    animation: none;
  }
}
</style>
