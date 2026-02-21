'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { useAuth } from '@/lib/auth-context'
import { ChevronLeft } from 'lucide-react'

export default function AccessPage() {

  const router = useRouter()
  const { setFarmerProfile } = useAuth()

  const [step, setStep] = useState<'mobile' | 'otp'>('mobile')
  const [mobileNumber, setMobileNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')


  // SEND OTP
  const handleSendOTP = () => {

    if (!mobileNumber || mobileNumber.length !== 10 || !/^\d+$/.test(mobileNumber)) {

      setError('Please enter a valid 10-digit mobile number')

      return
    }

    setError('')
    setStep('otp')

  }


  // VERIFY OTP
  const handleVerifyOTP = () => {

    if (!otp || otp.length !== 4 || !/^\d+$/.test(otp)) {

      setError('Please enter a valid 4-digit OTP')

      return
    }

    // Demo OTP
    if (otp !== '1234') {

      setError('Invalid OTP. For demo, use 1234')

      return
    }

    setError('')

    setFarmerProfile({
      mobileNumber: mobileNumber,
    })

    router.push('/dashboard')

  }


  return (

    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">

      <Navbar />


      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">

        <div className="w-full max-w-md">


          {/* Back Button */}
          {step === 'otp' && (

            <button
              onClick={() => {
                setStep('mobile')
                setOtp('')
                setError('')
              }}
              className="flex items-center gap-2 text-primary mb-6 text-sm font-medium"
            >

              <ChevronLeft className="h-4 w-4" />

              Edit Mobile Number

            </button>

          )}



          {/* Card */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">


            <h1 className="text-3xl font-bold text-foreground mb-2">

              Farmer Login

            </h1>


            <p className="text-muted-foreground mb-8 text-sm">

              Enter your mobile number to continue

            </p>



            {step === 'mobile' ? (

              <>

                <div className="space-y-4">


                  <div>

                    <label className="block text-sm font-semibold text-foreground mb-3">

                      Mobile Number

                    </label>


                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="Enter 10-digit mobile number"
                      value={mobileNumber}
                      onChange={(e) =>
                        setMobileNumber(e.target.value.replace(/\D/g, ''))
                      }
                      className="w-full px-4 py-3 text-lg border-2 border-border rounded-lg focus:outline-none focus:border-primary bg-background text-foreground"
                    />


                    {mobileNumber && (

                      <p className="text-xs text-muted-foreground mt-2">

                        {mobileNumber.length}/10 digits

                      </p>

                    )}

                  </div>



                  {error && (

                    <p className="text-sm text-destructive">

                      {error}

                    </p>

                  )}



                  <Button
                    onClick={handleSendOTP}
                    size="lg"
                    className="w-full h-14 text-base mt-6"
                  >

                    Send OTP

                  </Button>


                </div>

              </>

            ) : (

              <>

                <div className="space-y-4">


                  <div>

                    <label className="block text-sm font-semibold text-foreground mb-3">

                      Enter OTP

                    </label>


                    <p className="text-xs text-muted-foreground mb-4">

                      OTP sent to your mobile number

                    </p>


                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={4}
                      placeholder="0000"
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, ''))
                      }
                      className="w-full px-4 py-3 text-3xl text-center tracking-widest border-2 border-border rounded-lg focus:outline-none focus:border-primary bg-background text-foreground font-mono"
                    />


                    <p className="text-xs text-muted-foreground text-center mt-2">

                      {otp.length}/4 digits

                    </p>


                  </div>



                  {error && (

                    <p className="text-sm text-destructive">

                      {error}

                    </p>

                  )}



                  <div className="bg-accent/10 border rounded-lg p-3 text-xs">

                    Demo OTP: <strong>1234</strong>

                  </div>



                  <Button
                    onClick={handleVerifyOTP}
                    size="lg"
                    className="w-full h-14 text-base mt-6"
                  >

                    Verify OTP

                  </Button>


                </div>

              </>

            )}


          </div>



          <p className="text-center text-xs text-muted-foreground mt-8">

            Secure login for farmers

          </p>


        </div>

      </div>


    </main>

  )

}