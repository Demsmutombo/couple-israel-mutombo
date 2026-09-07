<script setup>
import { computed } from 'vue'

const props = defineProps({
  href: { type: String, required: true },
  kind: { type: String, default: 'video' },
  title: { type: String, default: '' },
  compact: { type: Boolean, default: false },
  hideSource: { type: Boolean, default: false },
})

const isPhoto = computed(() => props.kind === 'post' || props.kind === 'photo')

const pluginSrc = computed(() => {
  const encoded = encodeURIComponent(props.href.replace('web.facebook.com', 'www.facebook.com'))
  const base = isPhoto.value
    ? 'https://www.facebook.com/plugins/post.php'
    : 'https://www.facebook.com/plugins/video.php'
  return `${base}?href=${encoded}&show_text=false&width=734`
})
</script>

<template>
  <article v-if="isPhoto" class="overflow-hidden bg-void">
    <div class="relative aspect-[4/5] bg-night" :class="compact ? '' : ''">
      <iframe
        :src="pluginSrc"
        class="absolute inset-0 h-full w-full"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowfullscreen
        loading="lazy"
        :title="title || 'Publication'"
      />
    </div>
  </article>
  <article v-else class="mx-auto w-full overflow-hidden bg-black">
    <div class="fb-video-only">
      <iframe
        :src="pluginSrc"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowfullscreen
        loading="lazy"
        :title="title || 'Vidéo'"
      />
    </div>
  </article>
</template>

<style scoped>
.fb-video-only {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #000;
}

.fb-video-only iframe {
  position: absolute;
  top: -48px;
  left: 0;
  width: 100%;
  height: calc(100% + 200px);
  border: 0;
}
</style>
