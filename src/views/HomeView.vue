<script setup>
import { RouterLink } from 'vue-router'
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import ArchiveVisual from '@/components/ui/ArchiveVisual.vue'
import CoupleAbout from '@/components/memory/CoupleAbout.vue'
import QrMemory from '@/components/ui/QrMemory.vue'
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider.vue'
import SearchMemory from '@/components/ui/SearchMemory.vue'
import { useMemory } from '@/composables/useMemory.js'

const { content, couple } = useMemory()
const media = content.media
</script>

<template>
  <MemoryLayout flush>
    <section id="home" class="relative flex min-h-[100svh] items-center overflow-hidden pb-28 pt-28">
      <ArchiveVisual
        class="om-reveal-skip !absolute inset-0"
        seed="hero"
        ratio="h-full w-full"
        :src="media.hero"
        alt="Israël Mutombo et son épouse"
        eager
        object-position="center 18%"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/25" />
      <div class="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center lg:px-8">
        <p class="museum-kicker text-primary">{{ content.hero.kicker }}</p>
        <h1 class="mt-4 max-w-3xl font-display text-4xl leading-[1.15] text-white sm:text-6xl md:text-7xl">
          {{ content.hero.titleBefore }}
          <em class="script mt-1 block text-5xl sm:text-6xl md:text-7xl">{{ content.hero.titleScript }}</em>
        </h1>
        <p class="mt-4 text-[11px] uppercase tracking-[0.28em] text-white/80">{{ content.hero.tagline }}</p>
        <p class="mt-6 max-w-lg text-sm leading-relaxed text-white/80">
          {{ content.hero.subtitle }}
        </p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <RouterLink class="gold-btn-solid" to="/ceremonie">Revivre la cérémonie</RouterLink>
          <RouterLink class="btn-ghost-light" to="/histoire">Notre histoire →</RouterLink>
        </div>
      </div>
    </section>

    <section class="bg-page px-6 py-12 lg:px-8">
      <div class="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <article v-for="v in content.values" :key="v.title" class="text-center">
          <i :class="v.icon" class="mb-4 text-xl text-primary" />
          <h3 class="text-sm font-semibold tracking-wide text-ink">{{ v.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-subtle">{{ v.text }}</p>
        </article>
      </div>
    </section>

    <CoupleAbout preview />

    <section id="story" class="bg-page px-6 py-20 lg:px-8">
      <div class="mx-auto max-w-6xl text-center">
        <p class="museum-kicker">{{ content.story.sectionKicker }}</p>
        <h2 class="museum-title mt-3">{{ content.story.sectionTitle }}</h2>
      </div>
      <div class="mx-auto mt-14 grid max-w-6xl gap-12 md:grid-cols-2">
        <article>
          <ArchiveVisual
            seed="meet"
            ratio="aspect-[4/5]"
            :src="content.story.firstMeeting.image"
            :title="content.story.firstMeeting.title"
            kicker="Première rencontre"
            :object-position="content.story.firstMeeting.objectPosition"
          />
          <p class="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            {{ content.story.firstMeeting.dateLabel }}
          </p>
          <h3 class="mt-2 font-display text-3xl text-ink">{{ content.story.firstMeeting.title }}</h3>
          <p class="mt-4 text-sm leading-relaxed text-ink/80">{{ content.story.firstMeeting.body }}</p>
        </article>
        <article>
          <ArchiveVisual
            seed="journey"
            ratio="aspect-[4/5]"
            :src="content.story.journey.image"
            :title="content.story.journey.title"
            kicker="Parcours"
            :object-position="content.story.journey.objectPosition"
          />
          <p class="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            {{ content.story.journey.dateLabel }}
          </p>
          <h3 class="mt-2 font-display text-3xl text-ink">{{ content.story.journey.title }}</h3>
          <p class="mt-4 text-sm leading-relaxed text-ink/80">{{ content.story.journey.body }}</p>
        </article>
      </div>
      <div class="mt-12 text-center">
        <RouterLink class="gold-btn inline-flex" to="/histoire">Lire l’histoire complète</RouterLink>
      </div>
    </section>

    <section class="bg-page px-6 pb-20 lg:px-8">
      <div class="mx-auto max-w-7xl text-center">
        <p class="museum-kicker">Galerie</p>
        <h2 class="mt-3 font-display text-4xl text-ink md:text-5xl">
          Notre <em class="script text-5xl">galerie</em>
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-sm text-subtle">
          Le couple, la cérémonie, la fête — les visuels de cette journée, réunis ici.
        </p>
        <div class="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          <RouterLink v-for="card in content.homeStories" :key="card.id" to="/galerie" class="group">
            <ArchiveVisual
              :seed="card.id"
              ratio="aspect-[3/4]"
              :src="card.src"
              :title="card.title"
              :kicker="card.kicker"
              :caption="card.caption"
              :object-position="card.objectPosition"
            />
          </RouterLink>
        </div>
        <RouterLink class="btn-ink mt-10 inline-flex" to="/galerie">Voir toute la galerie</RouterLink>
      </div>
    </section>

    <section class="bg-page px-6 pb-20 lg:px-8">
      <div class="mx-auto max-w-7xl text-center">
        <p class="museum-kicker">15 ans en un regard</p>
        <h2 class="museum-title mt-3">2011 versus 2026</h2>
        <div class="mt-10 overflow-hidden">
          <BeforeAfterSlider
            :before-src="media.before"
            :after-src="media.after"
            before-position="center 18%"
            after-position="center 42%"
          />
        </div>
        <RouterLink class="gold-btn mt-10 inline-flex" to="/evenement">Voir la timeline</RouterLink>
      </div>
    </section>

    <section class="bg-page px-6 pb-20 lg:px-8">
      <div class="mx-auto max-w-6xl">
        <div class="text-center">
          <p class="museum-kicker">Mémoire intelligente</p>
          <h2 class="museum-title mt-3">Interroger les souvenirs</h2>
        </div>
        <div class="mt-10">
          <SearchMemory />
        </div>
      </div>
    </section>

    <section class="bg-page px-6 pb-20 lg:px-8">
      <div class="mx-auto max-w-7xl text-center">
        <p class="museum-kicker">Salles de la mémoire</p>
        <h2 class="museum-title mt-3">Ce que cette archive permet</h2>
      </div>
      <div class="mx-auto mt-12 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <RouterLink
          v-for="item in content.innovations"
          :key="item.n"
          :to="item.to"
          class="border border-primary/15 p-5 text-left transition hover:border-primary/50"
        >
          <p class="text-[10px] uppercase tracking-[0.2em] text-primary">{{ item.n }}</p>
          <h3 class="mt-3 font-display text-xl text-ink">{{ item.title }}</h3>
          <p class="mt-2 text-sm text-subtle">{{ item.text }}</p>
        </RouterLink>
      </div>
    </section>

    <section id="rsvp" class="section-dark px-6 py-20 text-center lg:px-8">
      <p class="museum-kicker">{{ content.message.voeuxKicker }}</p>
      <h2 class="mt-4 font-display text-4xl text-white md:text-5xl">{{ content.message.voeuxTitle }}</h2>
      <p class="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/75">
        {{ content.message.voeuxIntro }}
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <RouterLink class="gold-btn-solid" to="/voeux">Laisser un message</RouterLink>
        <RouterLink class="gold-btn" to="/voix">Écouter les voix</RouterLink>
      </div>
      <blockquote class="mx-auto mt-16 max-w-xl font-display text-2xl italic text-primary-soft">
        “{{ content.message.quote }}”
      </blockquote>
      <p class="mt-4 text-sm text-white/60">{{ content.footer.quotePremium }}</p>
    </section>

    <section id="qr" class="bg-page px-6 py-20 text-center lg:px-8">
      <p class="museum-kicker">QR Memory</p>
      <h2 class="museum-title mt-3">Emporter la mémoire avec soi</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm text-subtle">Scannez le QR original pour accéder à la mémoire numérique.</p>
      <div class="mt-12">
        <QrMemory :years="couple.anniversary" :label="`${couple.anniversary} ANS — ${couple.shortName}`" />
      </div>
    </section>
  </MemoryLayout>
</template>
