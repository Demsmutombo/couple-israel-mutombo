import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

/**
 * Fait apparaître sections et cartes au scroll, sur toute la plateforme.
 * @param {import('vue').Ref<HTMLElement | null>} rootRef
 */
export function useReveal(rootRef) {
  const route = useRoute()
  /** @type {IntersectionObserver | null} */
  let io = null

  function bind() {
    const root = rootRef.value
    if (!root || typeof IntersectionObserver === 'undefined') return

    if (!io) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add('is-in')
            io?.unobserve(entry.target)
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -10% 0px' },
      )
    }

    let i = 0
    root.querySelectorAll('section, article, .archive-card').forEach((el) => {
      if (!(el instanceof HTMLElement)) return
      if (el.id === 'home' || el.classList.contains('om-reveal-skip')) return
      if (el.dataset.omReveal === 'bound') return
      el.dataset.omReveal = 'bound'
      el.classList.add('om-reveal')
      el.style.setProperty('--reveal-delay', `${(i % 7) * 70}ms`)
      i += 1
      io?.observe(el)
    })
  }

  onMounted(() => nextTick(bind))
  watch(
    () => route.fullPath,
    () => nextTick(bind),
  )
  onUnmounted(() => {
    io?.disconnect()
    io = null
  })
}
