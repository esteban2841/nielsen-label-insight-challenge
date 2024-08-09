<template lang="">
  <transition name="modal-fade">
    <Teleport to="#app">
      <div
        v-if="showModal"
        class="modal-backdrop backdrop-blur-3xl bg-[#000]/40 w-full flex h-screen items-center justify-center fixed"
      >
        <div class="modal" role="dialog">
          <div class="modal-body">
            <slot name="body">
              <div class="relative flex flex-col items-center justify-center detail-thumb">
                <img
                  :src="thumbnail.url"
                  class="p-[2px] md:p[10px] rounded-xl thumb-image"
                  :alt="title"
                />
                <label class="close-button-label">
                  <button @click="emits" class="close-button rounded-lg hover:backdrop-blur-lg">
                    X
                  </button>
                </label>
                <div class="title-container capitalize text-justify text-[#785dc8] w-full">
                  <h2>{{ thumbnail.title }}</h2>
                </div>
                <div class="title-description capitalize text-justify text-[#785dc8] w-full">
                  <h4>Description: {{ thumbDescription || thumbnail.description }}</h4>
                </div>
                <label for="description" class="input-label text-[#785dc8]">
                  <input
                    class="w-[300px] placeholder-[#785dc8] rounded-lg h-[40px] text-[#785dc8] br-4 thumb-description px-4"
                    @change="inputHandler"
                    type="text"
                    placeholder="Add a description"
                    v-model="thumbDescription"
                  />
                  <button
                    @click="emitDesc"
                    v-if="!thumbnail.description"
                    class="modify-buttons border-none tick"
                  >
                    ✔️
                  </button>
                  <button
                    @click="emitDesc"
                    v-if="thumbnail.description"
                    class="modify-buttons border-none edit"
                  >
                    🖊️
                  </button>
                </label>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </Teleport>
  </transition>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
  showModal: Boolean,
  thumbnail: Object
})

const thumbDescription = ref('')
const { thumbnail, showModal } = props

thumbDescription.value = thumbnail?.description || ''

const emit = defineEmits(['toggleModal', 'modifyDescription'])

const emits = () => {
  emit('toggleModal')
}
const emitDesc = () => {
  emit('modifyDescription', {
    ...thumbnail,
    description: thumbDescription.value
  })
}
</script>
<style lang="css">
.close-button-label {
  position: absolute;
  top: 20px;
  right: 20px;
}
.thumb-image {
  width: 500px;
  @media (max-width: 768px) {
    width: 100%;
  }
}
.tick {
  position: relative;
  background-color: transparent;
  color: #785dc8;
  bottom: 5px;
}
.modify-buttons {
  background-color: transparent;
  font-size: 30px;
}
.title-container {
  position: absolute;
  top: 40px;
  left: 10%;
  width: 400px;
  @media (max-width: 768px) {
    width: 80%;
  }
}
.title-description {
  position: absolute;
  bottom: 80px;
  left: 10%;
  width: 400px;
  @media (max-width: 768px) {
    width: 80%;
  }
}
.input-label {
  position: absolute;
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.close-button {
  border: 2px solid #785dc8;
  background: transparent;
  color: #785dc8;
  width: 40px;
}

.close-button:hover {
  transform: scale(1.05);
}
.thumb-description {
  background-color: transparent;
  border: #785dc8 solid 2px;
  padding: 10px;
}
</style>
