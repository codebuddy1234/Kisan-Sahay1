import React from 'react'
import type { Metadata } from 'next'
import { AdminLayout } from '@/components/admin-layout'

export const metadata: Metadata = {
  title: 'Admin Panel - Kisan Sahay',
  description: 'Government scheme management and administration panel',
}

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  )
}
