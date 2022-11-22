import { onMounted, ref, watch } from 'vue'

export const useLocalStorage = (name: string) => {
  const entity = ref('')

  onMounted(() => {
    const json = localStorage.getItem(name)
    if (json) {
      entity.value = JSON.parse(json)
    }
  })

  watch(entity, () => {
    localStorage.setItem(name, JSON.stringify(entity.value))
  })

  return entity
}