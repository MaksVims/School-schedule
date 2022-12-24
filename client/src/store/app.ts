import { ref } from 'vue'
import { defineStore } from 'pinia'
import { DateLastUpdate } from '../types'

export const useAppStore = defineStore('useApp', () => {
  const lastUpdateDate = ref<null | DateLastUpdate>(null)

  const setLastUpdateDate = (date: DateLastUpdate) => lastUpdateDate.value = date 

  return { lastUpdateDate, setLastUpdateDate }
})