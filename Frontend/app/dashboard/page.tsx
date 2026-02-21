'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { Navbar } from '@/components/navbar'
import { categories, schemes } from '@/lib/schemes-data'
import { Settings, LogOut } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const { farmerProfile, logout } = useAuth()

  const recommendedSchemes = schemes.filter((s) => s.bestForYou).slice(0, 3)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Recommended Section */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Recommended for You
            </h2>
            <p className="text-muted-foreground">
              Based on your profile, here are schemes you might be eligible for
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {recommendedSchemes.map((scheme) => (
              <Card
                key={scheme.id}
                className="p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => router.push(`/scheme/${scheme.id}`)}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {scheme.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {scheme.benefitType}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent-foreground">
                        Best for You
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="icon"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {scheme.description}
                </p>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push(`/scheme/${scheme.id}`)
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  View Details
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Explore All Schemes
            </h2>
            <p className="text-muted-foreground">
              Browse by category to find more schemes
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Card
                key={category.id}
                onClick={() => router.push(`/schemes/${category.id}`)}
                className="p-6 border border-border hover:border-primary/50 hover:shadow-lg hover:bg-primary/5 transition-all cursor-pointer group flex flex-col items-center text-center"
              >
                <div className="mb-4 text-5xl">{category.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {schemes.filter((s) => s.category === category.id).length}{' '}
                  schemes
                </p>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push(`/schemes/${category.id}`)
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
                >
                  Explore
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Info Section */}
        <section className="mt-16 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/5 to-accent/10 p-8">
          <h3 className="text-xl font-bold text-foreground mb-4">
            How to Apply
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary font-bold flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">
                  Find Schemes
                </p>
                <p className="text-sm text-muted-foreground">
                  Browse categories or check recommended schemes
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary font-bold flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">
                  Check Eligibility
                </p>
                <p className="text-sm text-muted-foreground">
                  View requirements and what you'll get
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary font-bold flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">
                  Apply Now
                </p>
                <p className="text-sm text-muted-foreground">
                  Follow step-by-step guidance to apply
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
