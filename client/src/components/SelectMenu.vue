<script setup lang="ts">
import { ref, toRefs, onMounted } from "vue";
import { useClassStore } from "../store";
import { ButtonApp } from "../components/UI";
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
  <a-row justify="center" class="select-menu">
    <a-button class="menu-btn" @click="showCourseClass">
      <span>
        {{
          !selectedCourseClass
            ? "Выбрать класс"
            : `Класс ${selectedCourseClass}`
        }}
      </span>
    </a-button>

    <a-button class="menu-btn" @click="showNumberClass">
      <span>
        {{
          !selectedNumberClass
            ? "Выбрать номер"
            : `Номер ${selectedNumberClass}`
        }}
      </span>
    </a-button>

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
  </a-row>
</template>

<style scoped lang="scss">
@import "@/style/var.scss";

.select-menu {
  position: relative;
  gap: $gap-xxl;
  z-index: 10;
}

.menu-btn {
  border-radius: $radius-normal;
  background: $btn-select-menu-bg;
  color: $btn-select-menu-color;
  width: 250px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: $accent;
    font-size: $text-veryBig;
    font-weight: 700;
  }
}

.modal__content {
  display: flex;
  flex-direction: column;
  text-align: center;
  min-height: 400px;
  padding: 20px;
  background-color: white;
}

@media (min-height: $height-desktop-big) {
  .menu-btn {
    padding: 0px 80px;
  }
}

@media (max-width: $tabletop) {
  .menu-btn span {
    font-size: 28px;
  }
}
</style>

