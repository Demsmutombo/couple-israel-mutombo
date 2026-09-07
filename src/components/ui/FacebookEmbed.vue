<script setup>
import { computed } from 'vue'

const props = defineProps({
  href: { type: String, required: true },
  kind: { type: String, default: 'video' },
  title: { type: String, default: '' },
})

const pluginSrc = computed(() => {
  const encoded = encodeURIComponent(props.href.replace('web.facebook.com', 'www.facebook.com'))
  const isPost = props.kind === 'post'
  const base = isPost
    ? 'https://www.facebook.com/plugins/post.php'
    : 'https://www.facebook.com/plugins/video.php'
  return `${base}?href=${encoded}&show_text=${isPost ? 'true' : 'false'}&width=560`
})
</script>

<template>
  <article class="overflow-hidden bg-void">
    <div class="relative bg-night" :class="kind === 'post' ? 'min-h-[720px]' : 'aspect-video'">
      <iframe
        :src="pluginSrc"
        class="absolute inset-0 h-full w-full"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowfullscreen
        loading="lazy"
        :title="title || 'Publication Facebook'"
      />
    </div>
    <div v-if="title" class="flex items-center justify-between gap-3 px-4 py-3">
      <p class="font-display text-lg text-white">{{ title }}</p>
      <a :href="href" target="_blank" rel="noopener noreferrer" class="text-[10px] uppercase tracking-[0.16em] text-primary">
        Source
      </a>
    </div>
  </article>
</template>
