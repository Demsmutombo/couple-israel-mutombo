import { computed, reactive } from 'vue'
import { memoryContent } from '@/content'

const STORAGE_ENTERED = 'om-entered'
const STORAGE_DEMO = 'om-demo-mode'

function readDemo() {
  try {
    const raw = sessionStorage.getItem(STORAGE_DEMO)
    if (raw === 'false') return false
  } catch {
    /* ignore */
  }
  return true
}

const state = reactive({
  entered: false,
  demoMode: true,
  role: 'VISITEUR',
  musicOn: false,
  tourActive: false,
  tourIntro: true,
  tourIndex: 0,
  tourMode: 'guided',
  pitchOpen: false,
  presentation: false,
  tourFinished: false,
  favorites: [],
  seenTips: [],
  activeTip: null,
  messages: [],
  moderation: [
    { id: 'mod-1', author: 'Un proche', type: 'Texte', excerpt: 'Message d’un proche pour le couple.', status: 'pending' },
    { id: 'mod-2', author: 'Un invité', type: 'Photo + message', excerpt: 'Souvenir de la réception.', status: 'pending' },
    { id: 'mod-3', author: 'Un ami', type: 'Message vocal', excerpt: 'Témoignage audio (fichier à venir).', status: 'approved' },
  ],
  searchResult: null,
  analytics: [],
  mediaDraft: {
    title: '',
    date: '',
    category: 'Cérémonie',
    people: '',
    description: '',
    place: '',
    visibility: 'PUBLIC',
    kind: 'photo',
  },
})

try {
  state.entered = sessionStorage.getItem(STORAGE_ENTERED) === '1'
  state.demoMode = readDemo()
} catch {
  /* ignore */
}

export const tourBeats = [
  {
    id: 'histoire',
    route: '/histoire',
    kicker: 'HISTOIRE',
    title: 'Tout commence par une histoire.',
    body: 'Cette mémoire ne commence pas avec une photo ou une vidéo. Elle commence avec l’histoire des personnes que nous voulons préserver.',
  },
  {
    id: 'ans',
    route: '/evenement',
    kicker: '15 ANS',
    title: '15 ans ne tiennent pas dans une publication.',
    body: 'Les souvenirs sont souvent dispersés entre téléphones, réseaux sociaux, albums et messages. Ici, ils se rassemblent dans une histoire structurée.',
  },
  {
    id: 'ceremonie',
    route: '/ceremonie',
    kicker: 'CÉRÉMONIE',
    title: 'Maintenant, revivons cette journée.',
    body: 'De l’arrivée à la célébration, chaque heure ouvre photos, voix et films.',
  },
  {
    id: 'voix',
    route: '/voix',
    kicker: 'VOIX',
    title: 'Les images montrent. Les voix font revivre.',
    body: 'Israël, son épouse, la famille, les amis — chaque timbre devient archive.',
  },
  {
    id: 'temoignages',
    route: '/temoignages',
    kicker: 'TÉMOIGNAGES',
    title: 'Une histoire ne se raconte jamais par une seule voix.',
    body: 'Les proches ajoutent ce que le couple ne peut pas dire seul.',
  },
  {
    id: 'ia',
    route: '/memoire',
    kicker: 'IA',
    title: 'Et si la mémoire pouvait être interrogée ?',
    body: 'Une recherche conceptuelle dans les souvenirs — démonstration UX, sans backend d’IA.',
  },
  {
    id: 'capsule',
    route: '/capsule',
    kicker: 'CAPSULE',
    title: 'Mais cette mémoire ne conserve pas seulement le passé.',
    body: 'Elle permet aussi de parler au futur.',
  },
  {
    id: 'livre',
    route: '/livre',
    kicker: 'LIVRE',
    title: 'Une histoire peut aussi devenir un livre.',
    body: 'Quinze années de souvenirs réunies dans un héritage numérique.',
  },
  {
    id: 'musee',
    route: '/musee',
    kicker: 'MUSÉE',
    title: 'Imaginez maintenant que tous ces souvenirs deviennent un lieu.',
    body: 'Chaque salle est une porte. Choisissez où entrer.',
  },
  {
    id: 'vault',
    route: '/vault',
    kicker: 'VAULT',
    title: 'Une mémoire doit aussi être protégée.',
    body: 'Protection et conservation à long terme — ici, une simulation visuelle.',
  },
  {
    id: 'qr',
    route: '/',
    hash: '#qr',
    kicker: 'QR',
    title: 'Et si une seule image pouvait donner accès à toute une histoire ?',
    body: 'Un objet physique peut devenir une porte vers la mémoire numérique.',
  },
  {
    id: 'futur',
    route: '/evenement',
    kicker: 'FUTUR',
    title: 'La mémoire ne s’arrête pas à la cérémonie.',
    body: 'Une mémoire qui évolue avec la famille — 2026, 2027, 2028, 2030.',
  },
  {
    id: 'fin',
    route: '/',
    hash: '#finale',
    kicker: 'FIN',
    title: 'Ce que nous vivons aujourd’hui peut devenir leur histoire demain.',
    body: 'Aujourd’hui. Demain. Les générations futures.',
  },
]

export function useMemory() {
  const couple = memoryContent.couple

  const currentBeat = computed(() => tourBeats[state.tourIndex] || tourBeats[0])
  const tourProgress = computed(() => `${String(state.tourIndex + 1).padStart(2, '0')} / 13`)

  function track(event, payload = {}) {
    state.analytics.push({ event, at: Date.now(), ...payload })
  }

  function persistEntered(v) {
    state.entered = v
    try {
      sessionStorage.setItem(STORAGE_ENTERED, v ? '1' : '0')
    } catch {
      /* ignore */
    }
  }

  function setDemoMode(v) {
    state.demoMode = v
    try {
      sessionStorage.setItem(STORAGE_DEMO, String(v))
    } catch {
      /* ignore */
    }
  }

  function enterMemory() {
    persistEntered(true)
    track('feature_opened', { name: 'enter' })
  }

  function startTour(mode = 'guided') {
    persistEntered(true)
    state.tourActive = true
    state.tourIntro = true
    state.tourFinished = false
    state.tourIndex = 0
    state.tourMode = mode
    state.presentation = mode === 'presentation'
    document.documentElement.classList.toggle('presentation-mode', state.presentation)
    track('demo_started', { mode })
  }

  function skipTour() {
    state.tourActive = false
    state.tourIntro = false
    state.tourFinished = false
    state.presentation = false
    document.documentElement.classList.remove('presentation-mode')
    track('demo_step_viewed', { action: 'skip' })
  }

  function beginTourSteps() {
    state.tourIntro = false
    state.tourIndex = 0
    track('demo_step_viewed', { step: 1 })
  }

  function nextTour() {
    if (state.tourIndex >= tourBeats.length - 1) {
      state.tourFinished = true
      track('demo_completed')
      return 'end'
    }
    state.tourIndex += 1
    track('demo_step_viewed', { step: state.tourIndex + 1 })
    return 'next'
  }

  function prevTour() {
    if (state.tourIntro) return
    if (state.tourIndex <= 0) {
      state.tourIntro = true
      return
    }
    state.tourIndex -= 1
  }

  function restartTour() {
    startTour(state.tourMode === 'presentation' ? 'presentation' : 'guided')
  }

  function openPitch() {
    persistEntered(true)
    state.pitchOpen = true
    track('feature_opened', { name: 'pitch' })
  }

  function toggleFavorite(id) {
    const i = state.favorites.indexOf(id)
    if (i >= 0) state.favorites.splice(i, 1)
    else state.favorites.push(id)
  }

  function showTip(id, title, body) {
    if (state.seenTips.includes(id) || state.activeTip) return
    state.activeTip = { id, title, body }
  }

  function dismissTip() {
    if (!state.activeTip) return
    state.seenTips.push(state.activeTip.id)
    state.activeTip = null
  }

  function addMessage(payload) {
    const item = {
      id: `msg-${Date.now()}`,
      status: 'pending',
      ...payload,
    }
    state.messages.unshift(item)
    state.moderation.unshift({
      id: item.id,
      author: payload.author || 'Visiteur',
      type: payload.type,
      excerpt: payload.excerpt,
      status: 'pending',
    })
  }

  function setModeration(id, status) {
    const row = state.moderation.find((m) => m.id === id)
    if (row) row.status = status
  }

  return {
    state,
    couple,
    content: memoryContent,
    currentBeat,
    tourProgress,
    track,
    persistEntered,
    setDemoMode,
    enterMemory,
    startTour,
    skipTour,
    beginTourSteps,
    nextTour,
    prevTour,
    restartTour,
    openPitch,
    toggleFavorite,
    showTip,
    dismissTip,
    addMessage,
    setModeration,
  }
}
