'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { mockNotifications } from '@/lib/admin-data'
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'unread') return !notif.read
    if (filter === 'read') return notif.read
    return true
  })

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notif) => ({ ...notif, read: true }))
    )
  }

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
    }
  }

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 dark:bg-emerald-950/30'
      case 'error':
        return 'bg-red-50 dark:bg-red-950/30'
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-950/30'
      case 'info':
      default:
        return 'bg-blue-50 dark:bg-blue-950/30'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Notifications
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            System alerts and updates
          </p>
        </div>
        {notifications.some((n) => !n.read) && (
          <Button
            variant="outline"
            onClick={handleMarkAllAsRead}
          >
            Mark all as read
          </Button>
        )}
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        {(['all', 'unread', 'read'] as const).map((filterType) => (
          <Button
            key={filterType}
            variant={filter === filterType ? 'default' : 'outline'}
            onClick={() => setFilter(filterType)}
            className={filter === filterType ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            {filterType === 'unread' && (
              <span className="ml-2">
                ({notifications.filter((n) => !n.read).length})
              </span>
            )}
            {filterType === 'read' && (
              <span className="ml-2">
                ({notifications.filter((n) => n.read).length})
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                No notifications to display
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-500">
                Try adjusting your filters
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notif) => (
            <Card
              key={notif.id}
              className={`${getBackgroundColor(notif.type)} border-transparent ${
                !notif.read ? 'ring-2 ring-offset-2 ring-emerald-500' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="mt-1">
                    {getNotificationIcon(notif.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {notif.title}
                        </h3>
                        <p className="text-slate-700 dark:text-slate-300 mt-1">
                          {notif.message}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                          {formatTime(new Date(notif.timestamp))}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!notif.read && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMarkAsRead(notif.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                        <button
                          onClick={() => handleDelete(notif.id)}
                          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

function formatTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString()
}
