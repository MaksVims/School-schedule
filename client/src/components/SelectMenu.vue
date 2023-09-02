<script setup lang="ts">
import { ref, toRefs, onMounted } from "vue";
import { useClassStore } from "../store";
import { ButtonApp, PopupApp } from "../components/UI";
import { ListVariants } from "../components";
import { useLocalStorage } from "../hooks";

const { setSelectNumberClass, setSelectCourseClass } = useClassStore();
const {
  selectedCourseClass,
  selectedNumberClass,
  coursesClasses,
  numbersClasses,
} = toRefs(useClassStore());

const isShowCourseClasses = ref(false);
const isShowNumberClasses = ref(false);

const hideCourseClass = () => (isShowCourseClasses.value = false);
const hideNumberClass = () => (isShowNumberClasses.value = false);
const showCourseClass = () => (isShowCourseClasses.value = true);
const showNumberClass = () => (isShowNumberClasses.value = true);

// Получаем данные из локального хранилища
const storageSelectCourse = useLocalStorage("currentCourse");
const storageSelectNumber = useLocalStorage("currentNumber");

onMounted(() => {
  // Установка данных о выбранном курсе и номере из localStorage в state
  if (coursesClasses.value.includes(storageSelectCourse.value)) {
    setSelectCourseClass(storageSelectCourse.value);
  }
  if (numbersClasses.value.includes(storageSelectNumber.value)) {
    setSelectNumberClass(storageSelectNumber.value);
  }
});

const handleSetSelectCourseClass = (value: string) => {
  hideCourseClass();
  setSelectCourseClass(value);
  storageSelectCourse.value = value;
  showNumberClass();
};

const handleSetSelectNumberClass = (value: string) => {
  hideNumberClass();
  setSelectNumberClass(value);
  storageSelectNumber.value = value;
};
</script>

<template>
  <div class="select-menu">
    <ButtonApp class="menu-btn" @click="showCourseClass">
      {{
        !selectedCourseClass ? "Выбрать класс" : `Класс ${selectedCourseClass}`
      }}
    </ButtonApp>
    <ButtonApp class="menu-btn" @click="showNumberClass">
      {{
        !selectedNumberClass ? "Выбрать номер" : `Номер ${selectedNumberClass}`
      }}
    </ButtonApp>

    <a-modal
      v-model:open="isShowCourseClasses"
      @ok="hideCourseClass"
      centered
      :footer="null"
      width="700px"
    >
      <div class="modal__content center">
        <h2>Выбери класс</h2>
        <ListVariants
          class="modal__content center"
          :items="coursesClasses.filter((c) => c != selectedCourseClass)"
          :handleClick="handleSetSelectCourseClass"
        />
      </div>
    </a-modal>

    <a-modal
      v-model:open="isShowNumberClasses"
      @ok="hideNumberClass"
      centered
      :footer="null"
      width="700px"
    >
      <div class="modal__content center">
        <h2>Выбери номер</h2>
        <ListVariants
          class="modal__content center"
          :items="numbersClasses"
          :handleClick="handleSetSelectNumberClass"
        />
      </div>
    </a-modal>
  </div>
</template>

<style scoped lang="scss">
@import "@/style/var.scss";

.select-menu {
  position: relative;
  display: flex;
  justify-content: center;
  gap: $gap-xxs;
  z-index: 10;
}

.menu-btn {
  transition: box-shadow linear 0.3s;
  border-radius: $radius-normal;
  font-size: $text-big;
  background: $btn-select-menu-bg;
  color: $btn-select-menu-color;
  background: $btn-select-menu-bg;
  padding: 10px 60px;

  &:active,
  &:hover {
    transition: box-shadow linear 0.3s;
    box-shadow: 1px 2px 4px rgba($color: #000000, $alpha: 0.4);
  }
}

.modal__content {
  display: flex;
  flex-direction: column;
  text-align: center;
  min-height: 400px;
  padding: 20px 20px;
  background-color: white;
}

@media (min-height: $height-desktop-big) {
  .menu-btn {
    padding: 20px 60px;
  }
}
</style>

