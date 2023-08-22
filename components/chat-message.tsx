'use client'

import { useTheme } from 'next-themes'
import { BeatLoader } from 'react-spinners'
import { Copy } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'
import { BotAvatar } from '@/components/bot-avatar'
import { UserAvatar } from '@/components/user-avatar'
import { Button } from '@/components/ui/button'

export interface ChatMessageProps {
  role: 'system' | 'user'
  content?: string
  isLoading?: boolean
  src?: string
}

export const ChatMessage = ({
  role,
  content,
  isLoading,
  src,
}: ChatMessageProps) => {
  const { toast } = useToast()
  const { theme } = useTheme()

  const onCopy = () => {
    if (!content) return

    navigator.clipboard.writeText(content)
    toast({
      description: 'Message copied to clipboard',
    })
  }
  return (
    <div
      className={cn(
        'group flex w-full items-start gap-x-3 py-4',
        role === 'user' && 'justify-end',
      )}
    >
      {/* System avatar */}
      {role !== 'user' && src && <BotAvatar src={src} />}

      {/* Content */}
      <div className="max-w-sm rounded-md bg-primary/10 px-4 py-2 text-sm">
        {isLoading ? (
          <BeatLoader size={5} color={theme === 'light' ? 'black' : 'white'} />
        ) : (
          content
        )}
      </div>

      {/* User avatar */}
      {role === 'user' && <UserAvatar />}

      {/* copy system message */}
      {role !== 'user' && !isLoading && (
        <Button
          onClick={onCopy}
          className="opacity-0 transition group-hover:opacity-100"
          size="icon"
          variant="ghost"
        >
          <Copy className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
