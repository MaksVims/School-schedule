<script setup lang="ts" >
import { toRefs } from "vue";

interface PropsPopup {
  handleClose: () => void;
  isShow: boolean;
}

const props = defineProps<PropsPopup>();
const { handleClose } = props;
const { isShow } = toRefs(props);

const handleClosePopup = (e: Event) => {
  if (e.target === e.currentTarget) {
    handleClose();
  }
};
</script>

<template>
  <Teleport v-if="isShow" to="#popup">
    <div class="modal" @click="handleClosePopup">
      <slot>
        <div class="modal__content center">
          <h2>Выбранные данные не найдены</h2>
        </div>
      </slot>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
@import "@/style/var.scss";

.modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $bg-popup;

  &__content {
    width: 700px;
    min-height: 400px;
    padding: 40px 20px;
    border-radius: $radius-big;
    background-color: white;
  }
}
</style>