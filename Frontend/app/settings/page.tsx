'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Navbar } from '@/components/navbar'
import { useAuth } from '@/lib/auth-context'
import { ChevronLeft, Edit2, Globe, Lightbulb } from 'lucide-react'

export default function SettingsPage() {
  const router = useRouter()
  const { farmerProfile, updateProfile, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [language, setLanguage] = useState('English')
  const [simpleMode, setSimpleMode] = useState(true)

  const handleEditProfile = () => {
    setIsEditing(!isEditing)
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const handleUpdateProfile = () => {
    // Navigate to profile page to update the profile
    router.push('/profile')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <Button
          onClick={() => router.back()}
          variant="outline"
          size="sm"
          className="mb-6"
        >
          <ChevronLeft className="h-5 w-5" />
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        </Button>
      </div>
      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Your Profile
          </h2>
          <Card className="p-6 border border-border">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">
                    Mobile Number
                  </p>
                  <p className="text-foreground font-medium">
                    {farmerProfile.mobileNumber}
                  </p>
                </div>
                <Button
                  onClick={handleUpdateProfile}
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-transparent"
                >
                  <Edit2 className="h-4 w-4" />
                  Update Profile
                </Button>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">
                    State
                  </p>
                  <p className="text-foreground font-medium">
                    {farmerProfile.state || 'Not set'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">
                    District
                  </p>
                  <p className="text-foreground font-medium">
                    {farmerProfile.district || 'Not set'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">
                    Land Ownership
                  </p>
                  <p className="text-foreground font-medium">
                    {farmerProfile.landOwnership || 'Not set'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">
                    Land Size
                  </p>
                  <p className="text-foreground font-medium">
                    {farmerProfile.landSize || 'Not set'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">
                    Crop Type
                  </p>
                  <p className="text-foreground font-medium">
                    {farmerProfile.cropType || 'Not set'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">
                    Farming Season
                  </p>
                  <p className="text-foreground font-medium">
                    {farmerProfile.farmingseason || 'Not set'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">
                    Farmer Category
                  </p>
                  <p className="text-foreground font-medium">
                    {farmerProfile.farmerCategory || 'Not set'}
                  </p>
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => router.push('/profile')}
                    size="sm"
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Edit Profile
                  </Button>
                  <Button
                    onClick={handleSaveProfile}
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                  >
                    Done
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </section>

        {/* Data & Privacy Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Data & Privacy
          </h2>
          <Card className="p-6 border border-border">
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                <h3 className="font-semibold text-foreground mb-2">
                  How we use your data
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Your profile information is used to:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Match you with eligible government schemes</li>
                  <li>✓ Personalize your scheme recommendations</li>
                  <li>✓ Simplify your application process</li>
                  <li>✓ Improve our service based on your feedback</li>
                </ul>
              </div>

              <Separator />

              <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                <h3 className="font-semibold text-foreground mb-2">
                  Data Security
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your personal information is encrypted and stored securely. We never share your data with third parties without your consent.
                </p>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/10 border border-accent/20">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mt-1 h-5 w-5 cursor-pointer"
                />
                <div>
                  <p className="font-semibold text-foreground mb-1">
                    Allow data reuse for scheme matching
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Your data will be saved and reused to automatically match you with new schemes as they are added.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Preferences Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Preferences
          </h2>
          <Card className="p-6 border border-border space-y-6">
            {/* Language */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Language</p>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred language
                  </p>
                </div>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 rounded-lg border border-border bg-card text-foreground font-medium"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Tamil</option>
                <option>Telugu</option>
                <option>Kannada</option>
                <option>Marathi</option>
                <option>Bengali</option>
                <option>Gujarati</option>
              </select>
            </div>

            <Separator />

            {/* Simple Mode */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lightbulb className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Simple Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Easier language, step-by-step guidance
                  </p>
                </div>
              </div>
              <Switch
                checked={simpleMode}
                onCheckedChange={setSimpleMode}
              />
            </div>

            <Separator />

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">
                  Push Notifications
                </p>
                <p className="text-sm text-muted-foreground">
                  Get alerts for new schemes and deadlines
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            {/* Scheme Deadlines */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">
                  Scheme Deadline Reminders
                </p>
                <p className="text-sm text-muted-foreground">
                  Remind me 7 days before scheme deadlines
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </Card>
        </section>

        {/* Support Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Support & Help
          </h2>
          <Card className="p-6 border border-border space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start text-foreground font-medium bg-transparent"
            >
              Frequently Asked Questions
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-foreground font-medium bg-transparent"
            >
              Contact Support
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-foreground font-medium bg-transparent"
            >
              Report a Problem
            </Button>
          </Card>
        </section>

        {/* About Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">
            About Kisan Sahay
          </h2>
          <Card className="p-6 border border-border space-y-4">
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-2">
                Version
              </p>
              <p className="text-foreground">1.0.0</p>
            </div>
            <Separator />
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
              >
                Terms of Service
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
              >
                Privacy Policy
              </Button>
            </div>
          </Card>
        </section>

        {/* Logout */}
        <div className="flex gap-3">
          <Button
            onClick={handleLogout}
            variant="outline"
            size="lg"
            className="flex-1 text-destructive hover:bg-destructive/10 bg-transparent"
          >
            Logout
          </Button>
        </div>
      </div>
    </main>
  )
}
