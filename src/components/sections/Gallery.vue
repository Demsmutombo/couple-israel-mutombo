<script setup>
import { onMounted, onUnmounted, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import { siteContent } from '@/content'
import { usePublicUrl } from '@/composables/usePublicUrl.js'

import 'swiper/css'
import 'swiper/css/navigation'

const modules = [Navigation]

function shuffle(list) {
  const arr = [...list]
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const shuffledGalleryFilenames = shuffle(siteContent.galleryFilenames || [])

const slides = computed(() =>
  shuffledGalleryFilenames.map((name) => ({
    name,
    href: usePublicUrl(`img/${name}`),
    thumb: usePublicUrl(`img/${name}`),
  })),
)

const hasLocalGallery = computed(() => slides.value.length > 0)

let lightbox = null

onMounted(async () => {
  await import('glightbox/dist/css/glightbox.min.css')
  const { default: GLightbox } = await import('glightbox')
  lightbox = GLightbox({
    selector: '.js-wedding-glightbox',
    touchNavigation: true,
    loop: true,
    zoomable: true,
    draggable: true,
  })
})

onUnmounted(() => {
  lightbox?.destroy()
  lightbox = null
})
</script>

<template>
  <section
    id="gallery"
    class="relative py-24 lg:my-20 lg:py-28"
    :style="{
      backgroundImage: `linear-gradient(rgba(18, 13, 16, 0.58), rgba(18, 13, 16, 0.72)), url(${usePublicUrl(`img/${siteContent.gallery.backgroundImage}`)})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  >
    <div class="section-title mb-10 lg:mb-16">
      <p class="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        {{ siteContent.gallery.sectionKicker }}
      </p>
      <h2 class="font-secondary text-4xl text-secondary md:text-5xl">
        {{ siteContent.gallery.sectionTitle }}
      </h2>
      <i class="far fa-heart mt-2 text-primary drop-shadow-sm" aria-hidden="true" />
      <p
        v-if="siteContent.gallery.subtitle"
        class="mx-auto mt-4 max-w-2xl text-sm text-secondary/90 md:text-base"
      >
        {{ siteContent.gallery.subtitle }}
      </p>
      <div
        v-if="siteContent.gallery.driveUrl"
        class="mt-6 flex flex-wrap items-center justify-center gap-3"
      >
        <a
          :href="siteContent.gallery.driveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 border-2 border-primary bg-primary/15 px-5 py-2.5 text-sm font-bold text-secondary backdrop-blur-sm transition hover:bg-primary hover:text-secondary"
        >
          <i class="fab fa-google-drive" aria-hidden="true" />
          {{ siteContent.gallery.driveCtaLabel || 'Photos & vidéos' }}
        </a>
      </div>
    </div>

    <Swiper
      v-if="hasLocalGallery"
      class="gallery-swiper px-2"
      :modules="modules"
      :slides-per-view="1"
      :space-between="16"
      :loop="true"
      :navigation="true"
      :breakpoints="{
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        992: { slidesPerView: 4 },
        1200: { slidesPerView: 5 },
      }"
    >
      <SwiperSlide v-for="(slide, i) in slides" :key="`${slide.name}-${i}`">
        <div class="gallery-item group aspect-[4/5] overflow-hidden rounded-sm bg-brand-dark/35">
          <img
            :src="slide.thumb"
            :alt="slide.name"
            class="h-full w-full object-cover"
            loading="lazy"
          />
          <a
            class="gallery-zoom js-wedding-glightbox group-hover:opacity-100"
            :href="slide.href"
            data-gallery="wedding-gallery"
            aria-label="Agrandir la photo"
          >
            <i class="fas fa-plus text-2xl text-secondary" aria-hidden="true" />
          </a>
        </div>
      </SwiperSlide>
    </Swiper>
    <p
      v-else-if="!siteContent.gallery.driveUrl"
      class="mx-auto max-w-xl px-4 text-center text-sm text-secondary/85"
    >
      Galerie à venir.
    </p>
  </section>
</template>

<style scoped>
.gallery-swiper :deep(.swiper-button-prev),
.gallery-swiper :deep(.swiper-button-next) {
  color: var(--secondary);
  text-shadow: 0 0 8px rgba(18, 13, 16, 0.55);
}
.gallery-swiper :deep(.swiper-button-prev::after),
.gallery-swiper :deep(.swiper-button-next::after) {
  font-size: 1.35rem;
}
</style>
