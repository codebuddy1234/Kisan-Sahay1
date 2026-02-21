'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Menu, Settings, LogOut, Smartphone } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useState } from 'react'

interface HeaderProps {
  title?: string
  showBack?: boolean
  showSettings?: boolean
  showMenu?: boolean
}

export function Header({ title, showBack = true, showSettings = false, showMenu = false }: HeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { logout } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleBack = () => {
    router.back()
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const handleSettings = () => {
    router.push('/settings')
    setShowDropdown(false)
  }

  // Don't show header on login page or home page
  if (pathname === '/login' || pathname === '/') {
    return null
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          {showBack && pathname !== '/dashboard' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="gap-2"
              aria-label="Go back"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          {pathname === '/dashboard' && (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Smartphone className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-foreground">Kisan Sahay</span>
            </div>
          )}
          {title && <h1 className="text-lg font-semibold text-foreground">{title}</h1>}
        </div>

        <div className="relative">
          {showSettings || showMenu ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDropdown(!showDropdown)}
              aria-label="Menu"
            >
              {showSettings ? (
                <Settings className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          ) : null}

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg">
              <button
                onClick={handleSettings}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-secondary first:rounded-t-lg"
              >
                <Settings className="h-4 w-4" />
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-secondary last:rounded-b-lg"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
