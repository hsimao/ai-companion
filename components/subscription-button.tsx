'use client'

import { useState } from 'react'

import { Sparkles } from 'lucide-react'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

interface SubscriptionButtonProps {
  isPro: boolean
}

export const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const onClick = async () => {
    try {
      setLoading(true)

      const response = await axios.get('/api/stripe')

      window.location.href = response.data.url
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Something went wrong.',
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <Button onClick={onClick} size="sm" variant={isPro ? 'default' : 'premium'}>
      {isPro ? 'Manage Subscription' : 'Upgrade'}
      {!isPro && <Sparkles className="ml-2 h-4 w-4 fill-white" />}
    </Button>
  )
}
