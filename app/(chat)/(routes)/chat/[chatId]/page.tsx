import { redirect } from 'next/navigation'

import { auth, redirectToSignIn } from '@clerk/nextjs'

import prismadb from '@/lib/prismadb'
import { ChatClient } from './components/client'

interface ChatIdPageProps {
  params: { chatId: string }
}

const ChatIdPage = async ({ params }: ChatIdPageProps) => {
  const { userId } = auth()
  if (!userId) return redirectToSignIn()

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: 'asc',
        },
        // 只取得跟當前用戶交談的資料
        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  })
  console.log('companion', companion)

  if (!companion) return redirect('/')

  return <ChatClient companion={companion} />
}

export default ChatIdPage