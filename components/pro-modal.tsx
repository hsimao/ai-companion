'use client'

import { useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useProModal } from '@/hooks/use-pro-modal'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'

export const ProModal = () => {
  const proModal = useProModal()
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onSubscribe = async () => {
    try {
      setLoading(true)

      const response = await axios.get('/api/stripe')

      window.location.href = response.data.url
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Something went wrong.',
      })
      setLoading(false)
    }
  }

  if (!isMounted) return null

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">Upgrade to Pro</DialogTitle>
          <DialogDescription className="space-y-2 text-center">
            Create
            <span className="mx-1 font-medium text-sky-500">Custom AI</span>
            Companions!
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="flex justify-between">
          <p className="text-2xl font-medium">
            $9
            <span className="text-sm font-normal">.99 / mo</span>
          </p>
          <Button disabled={loading} onClick={onSubscribe} variant="premium">
            Subscribe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
