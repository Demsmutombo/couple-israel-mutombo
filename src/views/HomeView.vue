<script setup>
import { RouterLink } from 'vue-router'
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import ArchiveVisual from '@/components/ui/ArchiveVisual.vue'
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider.vue'
import QrMemory from '@/components/ui/QrMemory.vue'
import { useMemory } from '@/composables/useMemory.js'

const { content, couple, startTour } = useMemory()
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
        alt="Israël Mutombo et son épouse — arrivée de la célébration"
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
        <p class="mt-6 max-w-lg text-sm leading-relaxed text-white/80">
          {{ content.hero.subtitle }}
        </p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <RouterLink class="gold-btn-solid" to="/ceremonie">Revivre la cérémonie</RouterLink>
          <RouterLink class="btn-ghost-light" to="/histoire">Notre histoire →</RouterLink>
          <button type="button" class="inline-flex items-center gap-3 text-sm text-white" @click="startTour('guided')">
            <span class="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
              <i class="fas fa-play pl-0.5 text-xs" />
            </span>
            Découvrir en 5 min
          </button>
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

    <section class="bg-page px-6 py-20 lg:px-8">
      <div class="mx-auto max-w-7xl text-center">
        <p class="museum-kicker">Archives du couple</p>
        <h2 class="museum-title mt-3">Les publications, en entier</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm text-subtle">
          Les deux photographies du marié et de son épouse.
        </p>
        <div class="mt-12 grid gap-6 lg:grid-cols-2">
          <article v-for="post in media.facebookPosts" :key="post.id">
            <ArchiveVisual
              :seed="post.id"
              ratio="aspect-[4/5]"
              :src="post.src"
              :title="post.title"
              :caption="post.caption"
              kicker="Le couple"
              eager
              :object-position="post.objectPosition"
            />
          </article>
        </div>
      </div>
    </section>

    <section class="bg-page px-6 pb-20 lg:px-8">
      <div class="mx-auto max-w-7xl text-center">
        <p class="museum-kicker">Galerie</p>
        <div class="mt-3 flex flex-col items-center gap-6">
          <h2 class="max-w-xl font-display text-4xl text-ink md:text-5xl">
            Chaque image raconte une
            <em class="script text-5xl">histoire</em>
          </h2>
          <div class="max-w-sm">
            <p class="text-sm leading-relaxed text-subtle">
              Le couple, l’arrivée, la salle, la cérémonie — les visuels de cette journée, réunis ici.
            </p>
            <RouterLink class="btn-ink mt-5 inline-flex" to="/galerie">Voir toute la galerie</RouterLink>
          </div>
        </div>
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
      </div>
    </section>

    <section class="section-dark px-6 py-20 lg:px-8">
      <div class="mx-auto grid max-w-7xl items-center gap-10 text-center lg:grid-cols-3 lg:text-left">
        <article>
          <p class="font-script text-6xl leading-none text-primary">“</p>
          <p class="mt-2 text-sm leading-relaxed text-white/80">
            {{ content.guests[0].message }}
          </p>
          <p class="mt-4 text-primary">★★★★★</p>
          <p class="mt-3 text-[11px] uppercase tracking-[0.2em] text-white/70">{{ content.guests[0].name }}</p>
        </article>
        <ArchiveVisual
          seed="about-center"
          ratio="aspect-[3/4]"
          :src="media.couple"
          title="Le couple"
          kicker="Célébration 2026"
          object-position="center 20%"
        />
        <article>
          <p class="museum-kicker">Le couple</p>
          <h2 class="mt-3 font-display text-4xl text-white">
            {{ couple.husband }}
            <em class="script block text-5xl">& son épouse</em>
          </h2>
          <p class="mt-5 text-sm leading-relaxed text-white/75">
            {{ couple.years }}. {{ couple.anniversary }} ans de mariage, une mémoire qui se transmet.
          </p>
          <RouterLink class="gold-btn-solid mt-8 inline-flex" to="/histoire">Découvrir l’histoire</RouterLink>
        </article>
      </div>
    </section>

    <section class="bg-page px-6 py-16 lg:px-8">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div class="flex items-start gap-4">
          <i class="far fa-clock mt-1 text-2xl text-primary" />
          <div>
            <h2 class="font-display text-3xl text-ink">Conservons cette journée</h2>
            <p class="mt-2 max-w-lg text-sm text-subtle">
              Prêt à transformer la cérémonie en une mémoire qui se transmet ?
            </p>
          </div>
        </div>
        <RouterLink class="btn-ink" to="/messages">Laisser un message</RouterLink>
      </div>
    </section>

    <section class="bg-page px-6 py-16 lg:px-8">
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
      </div>
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
