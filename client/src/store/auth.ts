import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', () => {
  const isAuthenticated = ref(false)

  const setAuth = (flag: boolean) => isAuthenticated.value = flag

  return { isAuthenticated, setAuth }
})