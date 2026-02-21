'use client'

import React from "react"

import { useRouteGuard } from '@/lib/route-guard'

export function RouteGuardWrapper({ children }: { children: React.ReactNode }) {
  useRouteGuard()
  return children
}
