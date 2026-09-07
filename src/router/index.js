import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('@/views/HomeView.vue')
const HistoireView = () => import('@/views/HistoireView.vue')
const ParcoursView = () => import('@/views/ParcoursView.vue')
const CeremonyView = () => import('@/views/CeremonyView.vue')
const VoicesView = () => import('@/views/VoicesView.vue')
const GalleryView = () => import('@/views/GalleryView.vue')
const FamilyView = () => import('@/views/FamilyView.vue')
const MapView = () => import('@/views/MapView.vue')
const MessagesView = () => import('@/views/MessagesView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Accueil', flush: true, order: 0 } },
    { path: '/histoire', name: 'histoire', component: HistoireView, meta: { title: 'Histoire', order: 1 } },
    { path: '/parcours', name: 'parcours', component: ParcoursView, meta: { title: 'Parcours', order: 2 } },
    { path: '/galerie', name: 'galerie', component: GalleryView, meta: { title: 'Galerie', order: 3 } },
    { path: '/ceremonie', name: 'ceremonie', component: CeremonyView, meta: { title: 'Cérémonie', order: 4 } },
    { path: '/voix', name: 'voix', component: VoicesView, meta: { title: 'Voix', order: 5 } },
    { path: '/famille', name: 'famille', component: FamilyView, meta: { title: 'Famille', order: 6 } },
    { path: '/carte', name: 'carte', component: MapView, meta: { title: 'Carte', order: 7 } },
    { path: '/voeux', name: 'voeux', component: MessagesView, meta: { title: 'Messages', order: 8 } },
    { path: '/messages', redirect: '/voeux' },
    { path: '/apropos', redirect: '/histoire' },
    { path: '/evenement', redirect: '/histoire' },
    { path: '/timeline', redirect: '/histoire' },
    { path: '/temoignages', redirect: '/voeux' },
    { path: '/livre', redirect: '/' },
    { path: '/capsule', redirect: '/' },
    { path: '/vault', redirect: '/' },
    { path: '/musee', redirect: '/' },
    { path: '/memoire', redirect: '/' },
    { path: '/questions', redirect: '/histoire' },
    { path: '/onememoria', redirect: '/' },
    { path: '/admin/:tab?', redirect: '/' },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          resolve({
            el: to.hash,
            behavior: 'smooth',
            top: 88,
          })
        })
      })
    }
    return { top: 0, behavior: 'smooth' }
  },
})

router.afterEach((to) => {
  const base = 'Couple Israël Mutombo — 15 ans'
  document.title = to.meta?.title ? `${to.meta.title} · ${base}` : base
})

export default router
