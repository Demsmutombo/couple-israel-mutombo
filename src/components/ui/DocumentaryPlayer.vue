<script setup>
import FacebookEmbed from '@/components/ui/FacebookEmbed.vue'
import { memoryContent } from '@/content'

const media = memoryContent.media
</script>

<template>
  <div class="overflow-hidden border border-primary/20 bg-void">
    <FacebookEmbed
      :href="media.ceremonyHref"
      kind="video"
      :title="media.youtubeTitle"
    />
  </div>
</template>
