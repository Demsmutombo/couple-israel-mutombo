import { ref } from 'vue'

const transitionName = ref('om-fade')

export function usePageTransition() {
  return { transitionName }
}

/**
 * Direction du slide selon l’ordre des routes (méta `order`).
 * @param {import('vue-router').RouteLocationNormalized} to
 * @param {import('vue-router').RouteLocationNormalized} from
 */
export function resolvePageTransition(to, from) {
  if (!from?.name) {
    transitionName.value = 'om-fade'
    return
  }
  if (to.name === from.name) {
    transitionName.value = 'om-fade'
    return
  }
  const toOrder = Number(to.meta?.order ?? 0)
  const fromOrder = Number(from.meta?.order ?? 0)
  transitionName.value = toOrder >= fromOrder ? 'om-slide-left' : 'om-slide-right'
}
