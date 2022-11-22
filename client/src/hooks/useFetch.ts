import { ref, Ref } from 'vue'
import { FetchError } from '../types'

interface ResponseFetch<T> {
  fetch: () => Promise<T | undefined>,
  loading: Ref<boolean>,
  error: Ref<string | null>
}

export function useFetch<T>(callback: () => Promise<T>): ResponseFetch<T> {
  const error = ref<string | null>(null)
  const loading = ref(false)

  async function fetch(): Promise<T | undefined> {
    try {
      loading.value = true
      error.value = null
      return await callback()
    } catch (e) {
      error.value = (e as FetchError).response.data.message
    } finally {
      loading.value = false
    }
  }

  return { fetch, loading: loading, error: error }
}