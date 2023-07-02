import { readonly, ref } from 'vue'
import { getRandomId } from '@/utils/getRandomId'
import type { Message } from '@/types/message'

const fetchData = async (offset: number): Promise<Message[]> => {
  const url = `https://numia.ru/api/getMessages?offset=${offset}`
  const response = await fetch(url)
  const data = await response.json()
  return data.result.map((text: string) => ({ id: getRandomId(), text }))
}

export function useMessages() {
  const messages = ref<Message[]>([])
  const isFinished = ref(false)
  const offset = ref(0)

  const getMessages = async () => {
    try {
      const data = await fetchData(offset.value)

      if (data.length) {
        offset.value += data.length
        messages.value = [...messages.value, ...data]
      } else {
        isFinished.value = true
      }
    } catch (error) {}
  }

  const sendMessage = (message: Message) => {
    messages.value.unshift(message)
  }

  return {
    messages: readonly(messages),
    isFinished,
    sendMessage,
    getMessages,
  }
}
