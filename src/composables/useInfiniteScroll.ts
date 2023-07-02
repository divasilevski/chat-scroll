import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'

interface InfiniteScrollParams {
  scrollRef: Ref<HTMLElement | undefined>
  loadMore: () => Promise<void>
  threshold?: number // 200px by default
}

export function useInfiniteScroll(params: InfiniteScrollParams) {
  const { scrollRef, loadMore, threshold } = params

  const isLoading = ref(false)
  const isDisabled = ref(false)

  const checkAndLoad = async () => {
    if (!scrollRef.value || isDisabled.value || isLoading.value) return

    const { scrollHeight, clientHeight, scrollTop } = scrollRef.value
    const isTop = scrollHeight + scrollTop - clientHeight <= (threshold ?? 200)

    if (isTop) {
      isLoading.value = true
      await loadMore()
      isLoading.value = false
    }
  }

  onMounted(() => {
    if (scrollRef.value) {
      checkAndLoad()
      scrollRef.value.addEventListener('scroll', checkAndLoad)
    }
  })

  onBeforeUnmount(() => {
    if (scrollRef.value) {
      scrollRef.value.removeEventListener('scroll', checkAndLoad)
    }
  })

  return {
    enable: () => (isDisabled.value = false),
    disable: () => (isDisabled.value = true),
  }
}
