'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface FarmerProfile {
  mobileNumber: string
  state?: string
  district?: string
  landOwnership?: string
  landSize?: string
  cropType?: string
  farmingseason?: string
  farmerCategory?: string
}

interface AuthContextType {
  isAuthenticated: boolean
  isProfileComplete: boolean
  farmerProfile: FarmerProfile
  setFarmerProfile: (profile: FarmerProfile) => void
  updateProfile: (updates: Partial<FarmerProfile>) => void
  completeProfile: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isProfileComplete, setIsProfileComplete] = useState(false)
  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile>({
    mobileNumber: '',
  })

  // Load from localStorage if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProfile = localStorage.getItem('farmerProfile')
      if (savedProfile) {
        const profile = JSON.parse(savedProfile)
        setFarmerProfile(profile)
        setIsAuthenticated(true)
        setIsProfileComplete(
          !!(profile.state && profile.district && profile.cropType && profile.farmerCategory)
        )
      }
    }
  }, [])

  const value: AuthContextType = {
    isAuthenticated,
    isProfileComplete,
    farmerProfile,
    setFarmerProfile: (profile) => {
      setFarmerProfile(profile)
      setIsAuthenticated(true)
      if (typeof window !== 'undefined') {
        localStorage.setItem('farmerProfile', JSON.stringify(profile))
      }
    },
    updateProfile: (updates) => {
      const newProfile = { ...farmerProfile, ...updates }
      setFarmerProfile(newProfile)
      if (typeof window !== 'undefined') {
        localStorage.setItem('farmerProfile', JSON.stringify(newProfile))
      }
    },
    completeProfile: () => {
      setIsProfileComplete(true)
    },
    logout: () => {
      setIsAuthenticated(false)
      setIsProfileComplete(false)
      setFarmerProfile({ mobileNumber: '' })
      if (typeof window !== 'undefined') {
        localStorage.removeItem('farmerProfile')
      }
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
