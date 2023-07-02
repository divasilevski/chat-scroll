import { ref, toValue, watch, type Ref, type WatchSource } from 'vue'

interface HoldScrollParams {
  scrollRef: Ref<HTMLElement | undefined>
  sources: WatchSource<unknown>[]
}

export function useHoldScroll(params: HoldScrollParams) {
  const { scrollRef, sources } = params
  const prevScrollTop = ref(0)

  watch(sources, () => {
    const el = toValue(scrollRef.value) as HTMLElement
    prevScrollTop.value = el.scrollTop

    requestAnimationFrame(() => {
      if (prevScrollTop.value !== el.scrollTop) {
        el.scrollTo(0, prevScrollTop.value)
      }
    })
  })
}
