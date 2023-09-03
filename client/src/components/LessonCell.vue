<script lang="ts" setup>
import { toRefs, computed, ref } from 'vue';
import { useClassStore } from '../store'
import { getLesson } from '../helpers'
import { SvgTempLesson } from '../components/Svg'

const { currentClass } = toRefs(useClassStore())

interface LessonCellProps {
  rowIdx: number,
  minOrder: number,
  currentOrder: number
  currentDay: number
  cellDay: number
}

const props = defineProps<LessonCellProps>()
const { cellDay, currentDay, currentOrder, minOrder, rowIdx } = toRefs(props)
const isTemp = ref(false)

const orderLesson = computed(() => rowIdx.value + minOrder.value)

const lesson = computed(() => {
  if (currentClass.value) {
    const lessonCell = getLesson(currentClass.value, cellDay.value, orderLesson.value)
    isTemp.value = lessonCell?.isTemp || false
    return lessonCell
  } else {
    return null
  }
})

const isActive = computed(() => {
  return orderLesson.value == currentOrder.value &&
    cellDay.value == currentDay.value &&
    currentClass && lesson &&
    // Если не временное и не пустое name или если временное и не пустое tempName
    ((!lesson.value?.isTemp && lesson.value?.name !== '') || (lesson.value.isTemp && lesson.value?.tempName !== ''))
})

</script>

<template>
  <td class="cell cell__lesson" :class="{
    'cell--active': isActive,
    'cell--temp': currentClass && isTemp
  }">
    <template v-if="currentClass && !isTemp">{{ lesson?.name }}</template>
    <template v-else-if="isTemp">{{ lesson?.tempName }}</template>
    <SvgTempLesson v-if="currentClass && isTemp" class="icon" :class="{ 'icon--active': isActive && isTemp }" />
  </td>
</template>

<style lang="scss" scoped>
@import '@/style/var.scss';

.cell {
  &__lesson {
    width: calc(100vw / 7 + 7px);
  }

  &--active {
    background-color: $cell-active-border !important;
    color: $cell-active-text !important;
  }

  &--temp {
    position: relative !important;
  }

  .icon {
    position: absolute;
    right: 10px;
    top: 10px;
    height: 1.3rem;
    width: 1.3rem;
    cursor: auto;
    fill: black;

    &--active {
      fill: white;
    }
  }
}
</style>