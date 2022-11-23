import { onMounted, onUnmounted } from "vue"

export const useEvent = (el: HTMLElement, type: string, callback: (e: Event) => void) => {

  onMounted(() => {
    el.addEventListener(type, callback)
  })

  onUnmounted(() => {
    el.removeEventListener(type, callback)
  })
}