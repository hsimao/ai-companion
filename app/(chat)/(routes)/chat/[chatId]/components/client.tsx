'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import { useCompletion } from 'ai/react'
import { Companion, Message } from '@prisma/client'

import { ChatHeader } from '@/components/chat-header'
import { ChatForm } from '@/components/chat-form'

interface ChatClientProps {
  companion: Companion & {
    messages: Message[]
    _count: {
      messages: number
    }
  }
}
export const ChatClient = ({ companion }: ChatClientProps) => {
  const router = useRouter()
  const [messages, setMessages] = useState<any[]>(companion.messages)

  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${companion.id}`,
      onFinish(prompt, completion) {
        const systemMessage = {
          role: 'system',
          content: completion,
        }

        setMessages((current) => [...current, systemMessage])
        setInput('')

        router.refresh()
      },
    })

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage = {
      role: 'user',
      content: input,
    }

    setMessages((current) => [...current, userMessage])
    handleSubmit(e)
  }
  return (
    <div className="flex h-full flex-col space-y-2 p-4">
      <ChatHeader companion={companion} />
      <div>Message TODO</div>
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  )
}
