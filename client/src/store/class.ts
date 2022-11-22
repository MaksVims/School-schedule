import { defineStore } from "pinia"
import { ref, computed, watch } from "vue"
import { CourseClass } from '../types'
import { numberSort } from '../helpers'

export const useClassStore = defineStore('class', () => {
  //данные с сервера
  let classes = ref<CourseClass[]>([])

  // выбранный курс
  let selectedCourseClass = ref('')

  // выбранный номер
  let selectedNumberClass = ref('')

  const currentCourseClasses = computed(() => classes.value?.find(cl => cl.course == selectedCourseClass.value))
  const coursesClasses = computed(() => classes.value?.map((cl) => String(cl.course)).sort(numberSort))
  const numbersClasses = computed(() => {
    if (!selectedCourseClass.value) return [];
    return currentCourseClasses.value?.children.map(child => child.number).sort(numberSort) || []
  })
  const currentClass = computed(() => currentCourseClasses.value?.children.find(ch => ch.number === selectedNumberClass.value))

  const setClasses = (data: CourseClass[]) => classes.value = data
  const setSelectCourseClass = (course: string) => selectedCourseClass.value = course
  const setSelectNumberClass = (number: string) => selectedNumberClass.value = number

  watch(numbersClasses, () => {
    if (!numbersClasses.value?.length || !numbersClasses.value.includes(selectedNumberClass.value)) {
      selectedNumberClass.value = "";
    }
  });

  return {
    classes,
    setClasses,
    coursesClasses,
    numbersClasses,
    currentClass,
    selectedCourseClass,
    selectedNumberClass,
    setSelectCourseClass,
    setSelectNumberClass,
  }
})