<script setup lang="ts">
import { onMounted, onUnmounted, ref, toRefs } from 'vue'
import { DAY_OF_WEEK, TIME_LESSON } from "../consts";
import { getDayDate, getLesson, getCurrentOrderLesson } from "../helpers";
import { useClassStore } from '../store/class'
import moment from "moment";
import { computed } from '@vue/reactivity';

// Текущий день недели, начиная с 1
const dayOfWeek = ref(moment().isoWeekday())

// Текущий порядок урока, для обозначения активного урока
const currentOrderLesson = ref(getCurrentOrderLesson(new Date()))

const { currentClass } = toRefs(useClassStore())
const intervalId = ref<null | NodeJS.Timer>(null)
const tableBodyRef = ref<null | HTMLTableElement>(null)

// Таймер проверки номер урока и текущий день недели
const runTimeObserve = () => {
  if (!intervalId.value) {
    intervalId.value = setInterval(() => {
      dayOfWeek.value = moment().isoWeekday()
      currentOrderLesson.value = getCurrentOrderLesson(new Date())
    }, 1000);
  }
}

// Вычисление на основе currentClass min номера урока и max
const startAndEndOrderLesson = computed(() => {
  let min = 13
  let max = 0
  if (currentClass.value) {
    // Перебор всех уроков
    currentClass.value.schedule.forEach(dayLessons => {
      dayLessons.lessons.forEach(lesson => {
        if (lesson.order < min) {
          min = lesson.order
        }
        if (lesson.order > max) {
          max = lesson.order
        }
      })
    })
  }

  return { min, max }
})

// Вычисление массива времени уроков
const displayTimeLessons = computed(() => {
  const min = startAndEndOrderLesson.value.min
  const max = startAndEndOrderLesson.value.max

  if (min > max) {
    return TIME_LESSON.slice(0, 7)
  }
  return TIME_LESSON.slice(min - 1, max)
})

onMounted(() => {
  runTimeObserve()
})

onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
})
</script>

<template>
  <section class="schedule">
    <table class="table">
      <thead>
        <tr class="row">
          <th class="cell"></th>
          <th class="cell cell__th" v-for="(day, idx) in DAY_OF_WEEK" :key="day">
            <div>{{ getDayDate(+idx) }}</div>
            <div>{{ day }}</div>
          </th>
        </tr>
      </thead>
      <tbody ref="tableBodyRef">
        <!-- По min и max обрезаем массив -->
        <tr class="row"
          v-for="(time, order) in displayTimeLessons"
          :key="order">
          <!-- order - номер строки в таблице -->
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
          <td v-for="(day, dayOfWeekCell) in DAY_OF_WEEK" class="cell cell__lesson" :class="{
            'cell--active': order + startAndEndOrderLesson.min == currentOrderLesson &&
              dayOfWeekCell + 1 == dayOfWeek &&
              currentClass && getLesson(currentClass, dayOfWeekCell + 1, startAndEndOrderLesson.min + order)
          }" :key="dayOfWeekCell">
            <!-- order + 1 -->
            {{ currentClass && getLesson(currentClass, dayOfWeekCell + 1, startAndEndOrderLesson.min + order) }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped lang="scss">
@import '@/style/var.scss';

body {
  overflow-x: auto;
}

.schedule {
  width: 100%;
  height: 100%;
  padding: 10px 5px;
}

.table {
  width: 100%;
  height: 100%;
  border-collapse: collapse;
}

.cell {
  padding: 24px 7px;
  text-align: center;
  border: 1px solid $cell-border;
  font-size: $text-big;

  &__th {
    padding: 20px 7px;
  }

  &__time {
    width: 80px;
    font-size: $text-normal;
  }

  &__lesson {
    width: calc(100vw / 7 + 7px);
    text-align: left;
  }

  &--active {
    background-color: $cell-active-border;
    color: $cell-active-text;
  }
}

.cell:first-child {
  max-width: 100px;
}

th.cell:first-child {
  min-width: 100px;
}

@media (max-width: $desktop) {
  .cell {
    font-size: $text-normal;
  }
}
</style>