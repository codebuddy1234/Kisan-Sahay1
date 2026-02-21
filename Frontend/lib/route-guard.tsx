'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from './auth-context'

export function useRouteGuard() {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, isProfileComplete } = useAuth()

  useEffect(() => {
    // Public routes that don't require authentication
    const publicRoutes = ['/login', '/']

    // Routes that require authentication but not profile completion
    const authRequiredRoutes = ['/profile', '/settings']

    // Routes that require both authentication and profile completion
    const fullAuthRequiredRoutes = ['/dashboard', '/schemes', '/scheme']

    const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route))
    const isAuthRequiredRoute = authRequiredRoutes.some(
      (route) => pathname === route || pathname.startsWith(route)
    )
    const isFullAuthRequiredRoute = fullAuthRequiredRoutes.some(
      (route) => pathname === route || pathname.startsWith(route)
    )

    // If user is not authenticated and trying to access protected routes
    if (!isPublicRoute && !isAuthenticated) {
      router.push('/login')
      return
    }

    // If user is authenticated but trying to access login page, redirect to appropriate place
    if (isAuthenticated && pathname === '/login') {
      if (isProfileComplete) {
        router.push('/dashboard')
      } else {
        router.push('/profile')
      }
      return
    }

    // If user is authenticated but profile is incomplete and trying to access full auth routes
    if (isAuthenticated && !isProfileComplete && isFullAuthRequiredRoute) {
      router.push('/profile')
      return
    }

    // If user is authenticated and profile is complete and trying to access profile page
    if (isAuthenticated && isProfileComplete && pathname === '/profile') {
      router.push('/dashboard')
      return
    }
  }, [isAuthenticated, isProfileComplete, pathname, router])
}
