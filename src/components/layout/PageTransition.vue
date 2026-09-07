<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterView, useRouter, useRoute } from 'vue-router'
import { resolvePageTransition, usePageTransition } from '@/composables/usePageTransition.js'

const router = useRouter()
const route = useRoute()
const { transitionName } = usePageTransition()
const curtain = ref(false)
let curtainTimer = 0

const stopBefore = router.beforeEach((to, from) => {
  resolvePageTransition(to, from)
  if (!from.name) return
  curtain.value = false
  requestAnimationFrame(() => {
    curtain.value = true
  })
  window.clearTimeout(curtainTimer)
  curtainTimer = window.setTimeout(() => {
    curtain.value = false
  }, 900)
})

onMounted(() => {
  document.documentElement.classList.add('om-motion')
})

onUnmounted(() => {
  stopBefore()
  window.clearTimeout(curtainTimer)
  document.documentElement.classList.remove('om-motion')
})
</script>

<template>
  <div class="om-curtain" aria-hidden="true">
    <span :class="{ on: curtain }" />
  </div>
  <RouterView v-slot="{ Component }">
    <Transition :name="transitionName" mode="out-in">
      <div :key="route.path" class="page-view">
        <component :is="Component" />
      </div>
    </Transition>
  </RouterView>
</template>
