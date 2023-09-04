<script setup lang="ts">
import { useClassStore } from "../../store";
import { onMounted, ref, toRefs, watch } from "vue";
import { useLocalStorage } from "../../hooks";

const { setSelectCourseClass, setSelectNumberClass, setClasses } =
  useClassStore();

const {
  selectedCourseClass,
  selectedNumberClass,
  coursesClasses,
  numbersClasses,
} = toRefs(useClassStore());

// Получаем данные из локального хранилища
const storageSelectCourse = useLocalStorage("currentCourse");
const storageSelectNumber = useLocalStorage("currentNumber");

const displayCourseClass = ref("");
const displayNumberClass = ref("");

const handleSetSelectCourseClass = (value: string) => {
  setSelectCourseClass(value);
  storageSelectCourse.value = value;
};

const handleSetSelectNumberClass = (value: string) => {
  setSelectNumberClass(value);
  storageSelectNumber.value = value;
};

onMounted(() => {
  // Установка данных о выбранном курсе и номере из localStorage в state
  if (coursesClasses.value.includes(storageSelectCourse.value)) {
    setSelectCourseClass(storageSelectCourse.value);
  }

  if (numbersClasses.value.includes(storageSelectNumber.value)) {
    setSelectNumberClass(storageSelectNumber.value);
  }
});

watch(selectedCourseClass, () => {
  displayCourseClass.value = "Класс " + selectedCourseClass.value;
});

watch(selectedNumberClass, () => {
  displayNumberClass.value = "Номер " + selectedNumberClass.value;
});
</script>

<template>
  <a-col :span="24" class="mobile__select-menu">
    <a-select
      :value="displayCourseClass || null"
      @change="handleSetSelectCourseClass"
      placeholder="Укажи класс"
      style="width: 140px; display: block"
      size="large"
      :listHeight="300"
    >
      <a-select-option
        v-for="item in coursesClasses.map((classes) => ({
          value: classes,
          label: classes,
        }))"
        :key="item.value"
        :value="item.value"
        >{{ item.label }}</a-select-option
      >
    </a-select>

    <a-select
      :value="displayNumberClass || null"
      @change="handleSetSelectNumberClass"
      placeholder="Номер"
      :showArrow="!!selectedCourseClass || false"
      style="width: 140px; display: block"
      size="large"
      :listHeight="340"
      :disabled="!numbersClasses.length"
    >
      <a-select-option
        v-for="item in numbersClasses.map((number) => ({
          value: number,
          label: number,
        }))"
        :key="item.value"
        :value="item.value"
        >{{ item.label }}</a-select-option
      >
    </a-select>
  </a-col>
</template>

<style scoped lang="scss">
@import "@/style/var.scss";

.mobile {
  &__select-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: $gap-small;
  }
}
</style>