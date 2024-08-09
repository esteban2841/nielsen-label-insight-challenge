<template>
  <section class="border-box w-max-7xl flex flex-col items-center gap-4 w-full">
    <Modal
      v-if="showModal"
      :thumbnail="thumbnailModalImage"
      :showModal="showModal"
      @toggleModal="toggleModal"
      @modifyDescription="updateElement"
    />
    <div ref="thumbnailsContainer" class="flex flex-wrap justify-center thumbnails-container">
      <div
        :class="`thumb-container cursor-pointer p-1 md:p[10px]`"
        v-for="{ thumbnailUrl, title, id } in thumbnails"
        :key="id"
        @click="toggleModal(id)"
      >
        <img
          :src="thumbnailUrl"
          class="p-[2px] md:p[10px]"
          :style="{
            width: thumbnailWidth + 'px'
          }"
          :alt="title"
        />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { type Thumbnail } from '../../types/index'
import { getPaginatedThumbnails } from '../../helpers'
import Modal from '../molecules/Modal.vue'

const thumbnails = ref<Array<Thumbnail>>([])
const thumbnailsContainer = ref()
const isMobile = window.innerWidth < 768
const thumbnailModalImage = ref<Thumbnail>()

// first calc made base on mobile as 768 px and having on mind of paddings same for desktop
let thumbnailWidth = isMobile
  ? ref((window.innerWidth - 60) / 5)
  : ref((window.innerWidth - 120) / 5)
const showModal = ref(false)

const toggleModal = (elementId?: number) => {
  thumbnailModalImage.value = thumbnails.value.find((thumb: Thumbnail) => thumb.id === elementId)
  showModal.value = !showModal.value
}

const updateElement = (modThumbnail: Thumbnail) => {
  thumbnails.value = thumbnails.value.map((thumbnail) =>
    thumbnail.id == modThumbnail.id ? { ...modThumbnail } : { ...thumbnail }
  )
  localStorage.setItem('thumbnails', JSON.stringify(thumbnails.value))
}

const updateThumnailDimentions = () => {
  const paddingLeftoverDesktop = 20 * 5
  let debounce
  clearTimeout(debounce)
  debounce = setTimeout(() => {
    const individualThumbnailWidth =
      (thumbnailsContainer.value.offsetWidth - paddingLeftoverDesktop) / 5
    thumbnailWidth.value = individualThumbnailWidth
  }, 200)
}

onMounted(async () => {
  window.addEventListener('resize', updateThumnailDimentions)
  // in case of localstorage reference use it and do not ask the api
  const storedThumbnails = localStorage.getItem('thumbnails')
  if (storedThumbnails) {
    thumbnails.value = JSON.parse(storedThumbnails)
  } else {
    const { elements: thumbnailsMainPage } = await getPaginatedThumbnails()
    thumbnails.value = thumbnailsMainPage
  }
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateThumnailDimentions)
})
</script>
<style></style>
