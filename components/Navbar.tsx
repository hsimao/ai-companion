import Link from 'next/link'
import { Poppins } from 'next/font/google'

import { Sparkles } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'

import { cn } from '@/lib/utils'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import MobileSidebar from '@/components/mobile-sidebar'

const font = Poppins({
  weight: '600',
  subsets: ['latin'],
})

export const Navbar = () => {
  return (
    <div className="fixed z-50 flex h-16 w-full items-center justify-between border-b border-primary/10 bg-secondary px-4 py-2">
      <div className="flex items-center">
        <MobileSidebar />
        <Link href="/">
          <h1
            className={cn(
              'hidden text-xl font-bold text-primary md:block md:text-3xl',
              font.className,
            )}
          >
            companion.ai
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        <Button variant="premium" size="sm">
          Upgrade
          <Sparkles className="ml-2 h-4 w-4 fill-white text-white" />
        </Button>
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}
