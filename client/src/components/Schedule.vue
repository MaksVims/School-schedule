<script setup lang="ts">
import { onMounted, onUnmounted, ref, toRefs, computed, watch } from "vue";
import moment from "moment";
import { DAY_OF_WEEK, TIME_LESSON } from "../consts";
import {
  getDayDate,
  getCurrentOrderLesson,
  installHeightCell,
} from "../helpers";
import { useClassStore } from "../store";
import { useEvent } from "../hooks";
import { LessonCell } from "../components";

const tableRef = ref<null | HTMLTableElement>(null);
const tableBodyRef = ref<null | HTMLTableElement>(null);
const intervalId = ref<null | NodeJS.Timer>(null);
const { currentClass, classes } = toRefs(useClassStore());

// Текущий день недели, начиная с 1
const dayOfWeek = ref(moment().isoWeekday());

// Текущий порядок урока, для обозначения активного урока
const currentOrderLesson = ref(getCurrentOrderLesson(new Date()));

// Изменение высоты строк таблицы при изменении размеров экрана
useEvent(window, "resize", (e: Event) => {
  if (tableRef.value) {
    installHeightCell(tableBodyRef.value, displayTimeLessons.value.length + 1);
  }
});

// Таймер проверки номер урока и текущий день недели
const runTimeObserve = () => {
  if (!intervalId.value) {
    intervalId.value = setInterval(() => {
      dayOfWeek.value = moment().isoWeekday();
      currentOrderLesson.value = getCurrentOrderLesson(new Date());
    }, 1000);
  }
};

// Вычисление на основе currentClass min номера урока и max
const startAndEndOrderLesson = computed(() => {
  let min = 13;
  let max = 0;
  if (currentClass.value) {
    // Перебор всех уроков
    currentClass.value.schedule.forEach((dayLessons) => {
      dayLessons.lessons.forEach((lesson) => {
        // Ликвидирует отсутствие пустых строк
        // Если временный и не пустой или постоянный не пустой
        if (
          lesson.order < min &&
          ((lesson.name && !lesson.isTemp) ||
            (lesson.tempName && lesson.isTemp))
        ) {
          min = lesson.order;
        }
        if (
          lesson.order > max &&
          ((lesson.name && !lesson.isTemp) ||
            (lesson.tempName && lesson.isTemp))
        ) {
          max = lesson.order;
        }
      });
    });
  }

  return { min, max };
});

// Вычисление массива времени уроков
const displayTimeLessons = computed(() => {
  const min = startAndEndOrderLesson.value.min;
  const max = startAndEndOrderLesson.value.max;

  if (min > max) {
    return TIME_LESSON.slice(0, 7);
  }
  return TIME_LESSON.slice(min - 1, max);
});

watch(classes, () => {
  if (tableRef.value) {
    installHeightCell(tableRef.value, displayTimeLessons.value.length + 1);
  }
});

watch(currentClass, () => {
  if (tableRef.value) {
    setTimeout(() => {
      installHeightCell(tableRef.value, displayTimeLessons.value.length + 1);
    }, 0);
  }
});

onMounted(() => {
  runTimeObserve();
  if (tableRef.value) {
    installHeightCell(tableRef.value, displayTimeLessons.value.length + 1);
  }
});

onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
});
</script>

<template>
  <section class="schedule">
    <table class="table" ref="tableRef">
      <thead>
        <tr class="row">
          <th class="cell"></th>
          <th
            class="cell cell__th"
            v-for="(day, idx) in DAY_OF_WEEK"
            :key="day"
          >
            <div>{{ getDayDate(+idx) }}</div>
            <div>{{ day }}</div>
          </th>
        </tr>
      </thead>
      <tbody ref="tableBodyRef">
        <!-- По min и max обрезаем массив -->
        <tr
          class="row"
          v-for="(time, rowIdx) in displayTimeLessons"
          :key="`${time.start.hour}:${time.start.min}`"
        >
          <!-- order - номер строки в tbody -->
          <!-- Первая cell в строке отображает время -->
          <td class="cell cell__time">
            <span>
              {{ time.start.hour }}
              <sup>{{ time.start.min }}</sup>
            </span>
            -
            <span>
              {{ time.end.hour }}
              <sup>{{ time.end.min }}</sup>
            </span>
          </td>
          <!-- dayOfWeekCell день недели -->
          <LessonCell
            v-for="(day, dayOfWeekCell) in DAY_OF_WEEK"
            :isMobile="false"
            class="cell"
            :key="dayOfWeekCell"
            :rowIdx="rowIdx"
            :min-order="startAndEndOrderLesson.min"
            :cell-day="dayOfWeekCell + 1"
            :current-order="currentOrderLesson"
            :current-day="dayOfWeek"
          />
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped lang="scss">
@import "@/style/var.scss";

.schedule {
  overflow-x: auto;
  width: 100%;
  height: 100%;
  padding: 10px 5px;
}

.table {
  width: 100%;
  height: inherit;
  border-collapse: collapse;
  border-spacing: 0;
}

.cell {
  padding: 10px 7px;
  text-align: center;
  border: 1px solid $cell-border;
  font-size: $text-big;

  &:not(:first-child) {
    min-width: 200px;
  }

  &__time {
    width: 100px;
  }
}

.cell:first-child {
  max-width: 120px;
}

th.cell:first-child {
  min-width: 120px;
}

@media (max-width: $desktop) {
  .cell {
    font-size: $text-normal;
  }

  .cell:first-child {
    max-width: 100px;
  }

  th.cell:first-child {
    min-width: 100px;
  }
}
</style>