<script setup lang="ts">
import Thumbnail from './components/views/Thumbnail.vue'
import ThumbnnailsTitleSVG from './components/atoms/ThumbnailTitleSVG.vue'
</script>

<template>
  <header class="w-full p-2">
    <nav class="w-full flex items-center justify-center p-4">
      <ThumbnnailsTitleSVG />
    </nav>
  </header>
  <main class="w-full p-2">
    <Thumbnail />
  </main>
</template>
