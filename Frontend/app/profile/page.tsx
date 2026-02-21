'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ChevronRight } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useLanguage } from '@/lib/language-context'
import { useVoice } from '@/lib/voice-context'
import { VoiceSpeaker } from '@/components/voice-speaker'
import { VoiceInput } from '@/components/voice-input'
import {Navbar} from '@/components/navbar' // Import Navbar component
import {
  STATES,
  DISTRICTS,
  LAND_OWNERSHIP_TYPES,
  LAND_SIZES,
  CROP_TYPES,
  ANNUAL_INCOME_RANGES,
  FARMER_CATEGORIES,
  FARMING_SEASONS,
} from '@/lib/profile-data'

type StepType =
  | 'state'
  | 'district'
  | 'land'
  | 'cropType'
  | 'season'
  | 'income'
  | 'category'

const steps: StepType[] = [
  'state',
  'district',
  'land',
  'cropType',
  'season',
  'income',
  'category',
]

interface ProfileData {
  state: string
  district: string
  customDistrict?: string
  landOwnership: string
  customLandOwnership?: string
  landSize: string
  cropType: string
  customCropType?: string
  farmingseason: string
  farmerCategory: string
  annualIncome: string
}

export default function ProfilePage() {
  const router = useRouter()
  const { t } = useLanguage()
  const { speak } = useVoice()
  const { farmerProfile, updateProfile, completeProfile } = useAuth()
  const [currentStep, setCurrentStep] = useState<StepType>('state')
  // Initialize with existing data if available (for updates)
  const [profileData, setProfileData] = useState<ProfileData>({
    state: farmerProfile.state || '',
    district: farmerProfile.district || '',
    customDistrict: '',
    landOwnership: farmerProfile.landOwnership || '',
    customLandOwnership: '',
    landSize: farmerProfile.landSize || '',
    cropType: farmerProfile.cropType || '',
    customCropType: '',
    farmingseason: (farmerProfile as any).farmingseason || '',
    farmerCategory: farmerProfile.farmerCategory || '',
    annualIncome: (farmerProfile as any).annualIncome || '',
  })

  const isUpdatingProfile = !!farmerProfile.state

  // Add state for showing custom input
  const [showCustomDistrict, setShowCustomDistrict] = useState(false)
  const [showCustomLandOwnership, setShowCustomLandOwnership] = useState(false)
  const [showCustomCropType, setShowCustomCropType] = useState(false)

  const steps: StepType[] = ['state', 'district', 'land', 'cropType', 'season', 'category']
  const stepIndex = steps.indexOf(currentStep)
  const progress = ((stepIndex + 1) / steps.length) * 100

  const handleNext = () => {
    let isValid = false
    if (currentStep === 'state') isValid = isStateValid
    if (currentStep === 'district') isValid = isDistrictValid
    if (currentStep === 'land') isValid = isLandValid
    if (currentStep === 'cropType') isValid = isCropValid
    if (currentStep === 'season') isValid = isSeasonValid
    if (currentStep === 'category') isValid = isCategoryValid
    if (currentStep === 'income') isValid = isIncomeValid

    if (!isValid) return

    if (stepIndex < steps.length - 1) {
      setCurrentStep(steps[stepIndex + 1])
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    const currentIdx = steps.indexOf(currentStep)
    if (currentIdx > 0) {
      setCurrentStep(steps[currentIdx - 1])
    }
  }

  const handleComplete = () => {
    const finalData = {
      ...farmerProfile,
      state: profileData.state,
      district: getDistrictDisplay(),
      landOwnership: getLandOwnershipDisplay(),
      landSize: profileData.landSize,
      cropType: getCropTypeDisplay(),
      annualIncome: profileData.annualIncome,
      farmerCategory: profileData.farmerCategory,
      farmingseason: profileData.farmingseason,
    }
    updateProfile(finalData)
    if (!isUpdatingProfile) {
      completeProfile()
    }
    router.push('/')
  }

  const isStateValid = profileData.state !== ''
  const isDistrictValid =
    profileData.district !== '' || (showCustomDistrict && profileData.customDistrict?.trim() !== '')
  const isLandValid =
    profileData.landOwnership !== '' &&
    profileData.landSize !== '' &&
    (!showCustomLandOwnership || profileData.customLandOwnership?.trim() !== '')
  const isCropValid =
    profileData.cropType !== '' && (!showCustomCropType || profileData.customCropType?.trim() !== '')
  const isIncomeValid = profileData.annualIncome !== ''
  const isCategoryValid = profileData.farmerCategory !== ''
  const isSeasonValid = profileData.farmingseason !== '' // Declare isSeasonValid variable

  const getDistrictDisplay = () => {
    if (showCustomDistrict && profileData.customDistrict) {
      return profileData.customDistrict
    }
    return profileData.district
  }

  const getLandOwnershipDisplay = () => {
    if (showCustomLandOwnership && profileData.customLandOwnership) {
      return profileData.customLandOwnership
    }
    return profileData.landOwnership
  }

  const getCropTypeDisplay = () => {
    if (showCustomCropType && profileData.customCropType) {
      return profileData.customCropType
    }
    return profileData.cropType
  }

  const states = STATES
  const districts = DISTRICTS

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary px-4 py-8">
        <div className="mx-auto max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-muted-foreground">
                Step {stepIndex + 1} of {steps.length}
              </span>
              <span className="text-sm text-muted-foreground">
                {isUpdatingProfile ? 'Update Profile' : 'Profile Setup'}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="p-8 border border-border">
            {/* Step: State Selection */}
            {currentStep === 'state' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Which state are you in?</h2>
                    <p className="text-sm text-muted-foreground">Select your state to see relevant schemes</p>
                  </div>
                  <VoiceSpeaker text="Which state are you in? Select your state to see relevant schemes" lang="en-IN" />
                </div>

                <div className="space-y-3">
                  <VoiceInput
                    onTranscript={(text) => {
                      const matchedState = STATES.find(s => s.toLowerCase().includes(text.toLowerCase()))
                      if (matchedState) {
                        setProfileData({
                          ...profileData,
                          state: matchedState,
                          district: '',
                          customDistrict: '',
                        })
                        setShowCustomDistrict(false)
                      }
                    }}
                    placeholder="Say state name"
                  />
                  <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-2">
                    {STATES.map((state) => (
                      <button
                        key={state}
                        onClick={() => {
                          setProfileData({
                            ...profileData,
                            state,
                            district: '',
                            customDistrict: '',
                          })
                          setShowCustomDistrict(false)
                        }}
                        className={`p-4 rounded-lg border-2 text-left font-medium transition-all h-14 flex items-center justify-center text-center ${
                          profileData.state === state
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-card text-foreground hover:border-primary/50'
                        }`}
                      >
                        {state}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step: District Selection */}
            {currentStep === 'district' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Which district?</h2>
                    <p className="text-sm text-muted-foreground">{profileData.state} - Select your district</p>
                  </div>
                  <VoiceSpeaker text={`Which district in ${profileData.state}? Select your district.`} lang="en-IN" />
                </div>

                <div className="space-y-3">
                  <VoiceInput
                    onTranscript={(text) => {
                      const matchedDistrict = DISTRICTS[profileData.state]?.find(d => d.toLowerCase().includes(text.toLowerCase()))
                      if (matchedDistrict) {
                        setProfileData({
                          ...profileData,
                          district: matchedDistrict,
                          customDistrict: '',
                        })
                        setShowCustomDistrict(false)
                      }
                    }}
                    placeholder="Say district name"
                  />
                  <div className="grid grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-2">
                    {DISTRICTS[profileData.state]?.map((district) => (
                      <button
                        key={district}
                        onClick={() => {
                          setProfileData({
                            ...profileData,
                            district,
                            customDistrict: '',
                          })
                          setShowCustomDistrict(false)
                        }}
                        className={`p-4 rounded-lg border-2 text-left font-medium transition-all h-14 flex items-center justify-center text-center ${
                          profileData.district === district
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-card text-foreground hover:border-primary/50'
                        }`}
                      >
                        {district}
                      </button>
                    ))}
                  </div>

                  {/* Custom District Input */}
                  <div className="border-t pt-4 space-y-2">
                    <button
                      onClick={() => {
                        setShowCustomDistrict(!showCustomDistrict)
                        setProfileData({
                          ...profileData,
                          district: '',
                        })
                      }}
                      className={`w-full p-4 rounded-lg border-2 text-left font-medium transition-all ${
                        showCustomDistrict
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-card text-foreground hover:border-primary/50'
                      }`}
                    >
                      Not in list? Type your district
                    </button>
                    {showCustomDistrict && (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter your district name"
                          value={profileData.customDistrict}
                          onChange={(e) => {
                            setProfileData({
                              ...profileData,
                              customDistrict: e.target.value,
                            })
                          }}
                          className="flex-1 p-3 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                        />
                        <VoiceInput
                          onTranscript={(text) => {
                            setProfileData({
                              ...profileData,
                              customDistrict: text,
                            })
                          }}
                          placeholder="Use microphone for district name"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step: Land Ownership & Size */}
            {currentStep === 'land' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Land ownership details</h2>
                    <p className="text-sm text-muted-foreground">Tell us about your farming land</p>
                  </div>
                  <VoiceSpeaker text="Tell us about your land ownership type and land size in hectares" lang="en-IN" />
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-3 block">
                      Land Ownership Type
                    </label>
                    <VoiceInput
                      onTranscript={(text) => {
                        const matchedType = LAND_OWNERSHIP_TYPES.find(t => t.toLowerCase().includes(text.toLowerCase()))
                        if (matchedType) {
                          setProfileData({
                            ...profileData,
                            landOwnership: matchedType,
                            customLandOwnership: '',
                          })
                          setShowCustomLandOwnership(false)
                        }
                      }}
                      placeholder="Say ownership type"
                    />
                    <div className="grid gap-3 max-h-72 overflow-y-auto pr-2 mt-3">
                      {LAND_OWNERSHIP_TYPES.slice(0, -1).map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            setProfileData({
                              ...profileData,
                              landOwnership: type,
                              customLandOwnership: '',
                            })
                            setShowCustomLandOwnership(false)
                          }}
                          className={`p-4 rounded-lg border-2 text-left font-medium transition-all h-14 flex items-center ${
                            profileData.landOwnership === type
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border bg-card text-foreground hover:border-primary/50'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                      <button
                        onClick={() => {
                          setShowCustomLandOwnership(!showCustomLandOwnership)
                          setProfileData({
                            ...profileData,
                            landOwnership: '',
                          })
                        }}
                        className={`p-4 rounded-lg border-2 text-left font-medium transition-all h-14 flex items-center ${
                          showCustomLandOwnership
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-card text-foreground hover:border-primary/50'
                        }`}
                      >
                        Other (Type)
                      </button>
                    </div>
                    {showCustomLandOwnership && (
                      <div className="flex gap-2 mt-3">
                        <input
                          type="text"
                          placeholder="Enter your land ownership type"
                          value={profileData.customLandOwnership}
                          onChange={(e) => {
                            setProfileData({
                              ...profileData,
                              customLandOwnership: e.target.value,
                            })
                          }}
                          className="flex-1 p-3 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                        />
                        <VoiceInput
                          onTranscript={(text) => {
                            setProfileData({
                              ...profileData,
                              customLandOwnership: text,
                            })
                          }}
                          placeholder="Use microphone for land ownership type"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-foreground mb-3 block">
                      Land Size (in hectares)
                    </label>
                    <div className="grid gap-3">
                      {LAND_SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => {
                            setProfileData({ ...profileData, landSize: size })
                          }}
                          className={`p-4 rounded-lg border-2 text-left font-medium transition-all h-14 flex items-center ${
                            profileData.landSize === size
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border bg-card text-foreground hover:border-primary/50'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step: Crop Type */}
            {currentStep === 'cropType' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">What do you grow?</h2>
                    <p className="text-sm text-muted-foreground">Select your primary crop type</p>
                  </div>
                  <VoiceSpeaker text="What do you grow? Select your primary crop type from the list." lang="en-IN" />
                </div>

                <div className="space-y-3">
                  <VoiceInput
                    onTranscript={(text) => {
                      const matchedCrop = CROP_TYPES.find(c => c.toLowerCase().includes(text.toLowerCase()))
                      if (matchedCrop) {
                        setProfileData({
                          ...profileData,
                          cropType: matchedCrop,
                          customCropType: '',
                        })
                        setShowCustomCropType(false)
                      }
                    }}
                    placeholder="Say crop name"
                  />
                  <div className="grid gap-3 max-h-72 overflow-y-auto pr-2">
                    {CROP_TYPES.slice(0, -1).map((crop) => (
                      <button
                        key={crop}
                        onClick={() => {
                          setProfileData({
                            ...profileData,
                            cropType: crop,
                            customCropType: '',
                          })
                          setShowCustomCropType(false)
                        }}
                        className={`p-4 rounded-lg border-2 text-left font-medium transition-all h-14 flex items-center ${
                          profileData.cropType === crop
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-card text-foreground hover:border-primary/50'
                        }`}
                      >
                        {crop}
                      </button>
                    ))}
                  </div>

                  {/* Custom Crop Type Input */}
                  <div className="border-t pt-3">
                    <button
                      onClick={() => {
                        setShowCustomCropType(!showCustomCropType)
                        setProfileData({
                          ...profileData,
                          cropType: '',
                        })
                      }}
                      className={`w-full p-4 rounded-lg border-2 text-left font-medium transition-all h-14 flex items-center ${
                        showCustomCropType
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-card text-foreground hover:border-primary/50'
                      }`}
                    >
                      Other crop (Type)
                    </button>
                    {showCustomCropType && (
                      <div className="flex gap-2 mt-3">
                        <input
                          type="text"
                          placeholder="Enter your crop type"
                          value={profileData.customCropType}
                          onChange={(e) => {
                            setProfileData({
                              ...profileData,
                              customCropType: e.target.value,
                            })
                          }}
                          className="flex-1 p-3 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                        />
                        <VoiceInput
                          onTranscript={(text) => {
                            setProfileData({
                              ...profileData,
                              customCropType: text,
                            })
                          }}
                          placeholder="Use microphone for crop type"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step: Farming Season */}
            {currentStep === 'season' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Farming Season</h2>
                    <p className="text-sm text-muted-foreground">Select your farming season</p>
                  </div>
                  <VoiceSpeaker text="What is your farming season? This helps us find schemes suitable for your farming activities." lang="en-IN" />
                </div>

                <div className="space-y-3">
                  <VoiceInput
                    onTranscript={(text) => {
                      const matchedSeason = FARMING_SEASONS.find(s => s.toLowerCase().includes(text.toLowerCase()))
                      if (matchedSeason) {
                        setProfileData({ ...profileData, farmingseason: matchedSeason })
                      }
                    }}
                    placeholder="Say farming season"
                  />
                  <div className="grid gap-3">
                    {FARMING_SEASONS.map((season) => (
                      <button
                        key={season}
                        onClick={() => {
                          setProfileData({ ...profileData, farmingseason: season })
                        }}
                        className={`p-4 rounded-lg border-2 text-left font-medium transition-all h-14 flex items-center ${
                          profileData.farmingseason === season
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-card text-foreground hover:border-primary/50'
                        }`}
                      >
                        {season}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step: Annual Income */}
            {currentStep === 'income' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Annual Income</h2>
                    <p className="text-sm text-muted-foreground">Select your annual income range</p>
                  </div>
                  <VoiceSpeaker text="What is your annual income range? This helps us find schemes suitable for your financial situation." lang="en-IN" />
                </div>

                <div className="space-y-3">
                  <VoiceInput
                    onTranscript={(text) => {
                      const matchedIncome = ANNUAL_INCOME_RANGES.find(i => i.toLowerCase().includes(text.toLowerCase()))
                      if (matchedIncome) {
                        setProfileData({ ...profileData, annualIncome: matchedIncome })
                      }
                    }}
                    placeholder="Say income range"
                  />
                  <div className="grid gap-3">
                    {ANNUAL_INCOME_RANGES.map((income) => (
                      <button
                        key={income}
                        onClick={() => {
                          setProfileData({ ...profileData, annualIncome: income })
                        }}
                        className={`p-4 rounded-lg border-2 text-left font-medium transition-all h-14 flex items-center ${
                          profileData.annualIncome === income
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-card text-foreground hover:border-primary/50'
                        }`}
                      >
                        {income}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step: Farmer Category */}
            {currentStep === 'category' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Your farmer category</h2>
                    <p className="text-sm text-muted-foreground">Select your category to unlock tailored schemes</p>
                  </div>
                  <VoiceSpeaker text="Select your farmer category to unlock tailored government schemes and support programs." lang="en-IN" />
                </div>

                <div className="grid gap-3 max-h-72 overflow-y-auto pr-2">
                  {FARMER_CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setProfileData({ ...profileData, farmerCategory: category })
                      }}
                      className={`p-4 rounded-lg border-2 text-left font-medium transition-all h-14 flex items-center ${
                        profileData.farmerCategory === category
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-card text-foreground hover:border-primary/50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex gap-3">
              <Button
                onClick={handlePrevious}
                disabled={stepIndex === 0}
                variant="outline"
                size="lg"
                className="flex-1 bg-transparent"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={
                  (currentStep === 'state' && !isStateValid) ||
                  (currentStep === 'district' && !isDistrictValid) ||
                  (currentStep === 'land' && !isLandValid) ||
                  (currentStep === 'cropType' && !isCropValid) ||
                  (currentStep === 'season' && !isSeasonValid) ||
                  (currentStep === 'income' && !isIncomeValid) ||
                  (currentStep === 'category' && !isCategoryValid)
                }
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
              >
                {stepIndex === steps.length - 1 ? (
                  <>
                    Start Exploring <ChevronRight className="h-5 w-5" />
                  </>
                ) : (
                  <>
                    Next <ChevronRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Footer Text */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Your profile helps us match you with the best schemes. You can update this anytime.
          </p>
        </div>
      </main>
    </>
  )
}
