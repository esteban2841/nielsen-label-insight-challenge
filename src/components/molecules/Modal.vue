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
              <div class="relative">
                <img
                  :src="thumbnail.url"
                  class="p-[2px] md:p[10px]"
                  :style="{
                    width: '500px'
                  }"
                  :alt="title"
                />
                <label class="close-button-label">
                  <button @click="emits" class="close-button hover:backdrop-blur-lg">X</button>
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
const props = defineProps({
  showModal: Boolean,
  thumbnail: Object
})

const { thumbnail, showModal } = props
const emit = defineEmits(['toggleModal'])

const emits = () => {
  emit('toggleModal')
}
</script>
<style lang="css">
.close-button-label {
  position: absolute;
  top: 10px;
  right: 10px;
}
.close-button {
  border: 2px solid white;
  background: transparent;
  color: white;
  width: 30px;
}
.close-button:hover {
  transform: scale(1.05);
}
</style>
