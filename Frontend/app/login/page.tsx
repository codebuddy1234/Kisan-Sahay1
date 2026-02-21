'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Smartphone, Phone } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export default function LoginPage() {
  const router = useRouter()
  const { setFarmerProfile } = useAuth()
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSendOtp = () => {
    setError('')

    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      const demoOtp = '1234'
      setGeneratedOtp(demoOtp)
      setStep('otp')
      setIsLoading(false)
    }, 800)
  }

  const handleVerifyOtp = () => {
    setError('')

    if (otp.length !== 4) {
      setError('Please enter a 4-digit OTP')
      return
    }

    if (otp !== generatedOtp) {
      setError('Invalid OTP. Demo OTP is: 1234')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setFarmerProfile({
        mobileNumber: phoneNumber,
      })
      router.push('/profile')
      setIsLoading(false)
    }, 800)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Smartphone className="h-6 w-6" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-foreground">Kisan Sahay</h1>
          <p className="text-sm text-muted-foreground">
            Discover schemes designed for you
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-muted-foreground">
              Step 1 of 3
            </span>
            <span className="text-xs text-muted-foreground">Authentication</span>
          </div>
          <Progress value={33} className="h-2" />
        </div>

        {/* Card */}
        <Card className="p-6 border border-border">
          {step === 'phone' ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  Enter Mobile Number
                </h2>
                <p className="text-sm text-muted-foreground">
                  We'll send you an OTP to verify your identity
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Phone className="h-5 w-5" />
                  </div>
                  <Input
                    type="tel"
                    placeholder="Enter 10-digit number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.slice(0, 10))}
                    className="pl-10 text-lg font-semibold tracking-wider"
                    maxLength={10}
                    disabled={isLoading}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Format: 10-digit mobile number (e.g., 9876543210)
                </p>
              </div>

              {error && (
                <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <Button
                onClick={handleSendOtp}
                disabled={isLoading || phoneNumber.length !== 10}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Demo: Use any 10-digit number, OTP is 1234
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  Verify OTP
                </h2>
                <p className="text-sm text-muted-foreground">
                  We've sent a 4-digit OTP to {phoneNumber}
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Enter OTP
                </label>
                <Input
                  type="text"
                  placeholder="0000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.slice(0, 4))}
                  className="text-center text-3xl font-bold tracking-widest"
                  maxLength={4}
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setStep('phone')
                    setOtp('')
                    setError('')
                  }}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  disabled={isLoading}
                >
                  Back
                </Button>
                <Button
                  onClick={handleVerifyOtp}
                  disabled={isLoading || otp.length !== 4}
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </Button>
              </div>

              <p className="text-center text-xs text-muted-foreground">
                Demo OTP: 1234
              </p>
            </div>
          )}
        </Card>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </main>
  )
}
