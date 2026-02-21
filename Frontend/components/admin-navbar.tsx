'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, Moon, Sun, LogOut, Settings, User } from 'lucide-react'
import { useTheme } from '@/lib/theme-context'

interface AdminNavbarProps {
  title?: string
  onMenuClick?: () => void
}

export function AdminNavbar({ title, onMenuClick }: AdminNavbarProps) {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // Generate title from pathname if not provided
  const pageTitle = title || getPageTitle(pathname)

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Menu and Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="text-slate-600 lg:hidden dark:text-slate-300"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
            {pageTitle}
          </h1>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Admin dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-lg font-semibold text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-100"
            >
              👨
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
                <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Raj Kumar
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Admin
                  </p>
                </div>
                <div className="space-y-1 p-2">
                  <button className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
                    <User className="h-4 w-4" />
                    Profile
                  </button>
                  <button className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                  <button className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

function getPageTitle(pathname: string): string {
  const titles: Record<string, string> = {
    '/admin': 'Dashboard',
    '/admin/schemes': 'Manage Schemes',
    '/admin/schemes/new': 'Add New Scheme',
    '/admin/farmers': 'Farmers',
    '/admin/analytics': 'Analytics',
    '/admin/notifications': 'Notifications',
    '/admin/settings': 'Settings',
  }
  return titles[pathname] || 'Admin Panel'
}
