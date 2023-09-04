<script setup lang="ts">
import { useClassStore } from "../../store";
import { ref, toRefs, watch } from "vue";

const { setSelectCourseClass, setSelectNumberClass, setClasses } =
  useClassStore();

const {
  selectedCourseClass,
  selectedNumberClass,
  coursesClasses,
  numbersClasses,
} = toRefs(useClassStore());

const displayCourseClass = ref("");
const displayNumberClass = ref("");

watch(selectedCourseClass, () => {
  displayCourseClass.value = "Класс " + selectedCourseClass.value;
  setSelectNumberClass("");
  displayNumberClass.value = "";
});

watch(selectedNumberClass, () => {
  displayNumberClass.value = "Номер " + selectedNumberClass.value;
});
</script>

<template>
  <a-col :span="24" class="mobile__select-menu">
    <a-select
      :value="displayCourseClass || null"
      @change="setSelectCourseClass"
      placeholder="Укажи класс"
      style="width: 150px; display: block"
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
      @change="setSelectNumberClass"
      placeholder="Номер"
      :showArrow="selectedCourseClass || false"
      style="width: 150px; display: block"
      size="large"
      :listHeight="300"
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