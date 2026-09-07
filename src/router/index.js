import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('@/views/HomeView.vue')
const AboutView = () => import('@/views/AboutView.vue')
const HistoireView = () => import('@/views/HistoireView.vue')
const TimelineView = () => import('@/views/TimelineView.vue')
const CeremonyView = () => import('@/views/CeremonyView.vue')
const VoicesView = () => import('@/views/VoicesView.vue')
const GalleryView = () => import('@/views/GalleryView.vue')
const TestimonialsView = () => import('@/views/TestimonialsView.vue')
const FamilyView = () => import('@/views/FamilyView.vue')
const BookView = () => import('@/views/BookView.vue')
const CapsuleView = () => import('@/views/CapsuleView.vue')
const VaultView = () => import('@/views/VaultView.vue')
const MuseumView = () => import('@/views/MuseumView.vue')
const MemoryCenterView = () => import('@/views/MemoryCenterView.vue')
const QuestionsView = () => import('@/views/QuestionsView.vue')
const MapView = () => import('@/views/MapView.vue')
const MessagesView = () => import('@/views/MessagesView.vue')
const AdminView = () => import('@/views/AdminView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Accueil', flush: true, order: 0 } },
    { path: '/apropos', name: 'apropos', component: AboutView, meta: { title: 'À propos', order: 1 } },
    { path: '/histoire', name: 'histoire', component: HistoireView, meta: { title: 'Histoire', order: 2 } },
    { path: '/evenement', name: 'evenement', component: TimelineView, meta: { title: 'Événement', order: 3 } },
    { path: '/timeline', redirect: '/evenement' },
    { path: '/ceremonie', name: 'ceremonie', component: CeremonyView, meta: { title: 'Cérémonie', order: 4 } },
    { path: '/voix', name: 'voix', component: VoicesView, meta: { title: 'Voix', order: 5 } },
    { path: '/galerie', name: 'galerie', component: GalleryView, meta: { title: 'Galerie', order: 6 } },
    { path: '/temoignages', name: 'temoignages', component: TestimonialsView, meta: { title: 'Témoignages', order: 7 } },
    { path: '/famille', name: 'famille', component: FamilyView, meta: { title: 'Famille', order: 8 } },
    { path: '/livre', name: 'livre', component: BookView, meta: { title: 'Livre', order: 9 } },
    { path: '/capsule', name: 'capsule', component: CapsuleView, meta: { title: 'Capsule temporelle', order: 10 } },
    { path: '/vault', name: 'vault', component: VaultView, meta: { title: 'Vault', order: 11 } },
    { path: '/musee', name: 'musee', component: MuseumView, meta: { title: 'Musée numérique', order: 12 } },
    { path: '/memoire', name: 'memoire', component: MemoryCenterView, meta: { title: 'Notre mémoire', order: 13 } },
    { path: '/questions', name: 'questions', component: QuestionsView, meta: { title: '15 questions', order: 14 } },
    { path: '/carte', name: 'carte', component: MapView, meta: { title: 'Carte des souvenirs', order: 15 } },
    { path: '/voeux', name: 'voeux', component: MessagesView, meta: { title: 'Messages', order: 16 } },
    { path: '/messages', redirect: '/voeux' },
    { path: '/onememoria', redirect: '/' },
    { path: '/admin/:tab?', name: 'admin', component: AdminView, meta: { title: 'Administration', admin: true, order: 18 } },
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
