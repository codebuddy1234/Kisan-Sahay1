'use client'

import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  platformStats,
  adminSchemes,
  activityLogs,
  CATEGORIES,
} from '@/lib/admin-data'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { mockSchemes, MainDomain } from '@/lib/mock-schemes'

export default function AdminDashboard() {
  const MAIN_DOMAINS: MainDomain[] = ['Schemes', 'Insurance', 'Financial Support']

  // Helper function to get category count for a specific mainDomain
  const getCategoryCountForDomain = (categoryId: string, mainDomain: MainDomain) => {
    return mockSchemes.filter(
      (s) => s.category === categoryId && s.mainDomain === mainDomain
    ).length
  }

  // Helper function to get total schemes for a mainDomain
  const getDomainTotal = (mainDomain: MainDomain) => {
    return mockSchemes.filter((s) => s.mainDomain === mainDomain).length
  }

  return (
    <div className="space-y-8">
      {/* Section 1: Main Domains with Categories */}
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Government Agricultural Schemes
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Structured monitoring system with 3 main domains and 8 categories
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          {MAIN_DOMAINS.map((domain) => {
            const domainIcons: Record<MainDomain, string> = {
              'Schemes': '🌾',
              'Insurance': '🛡️',
              'Financial Support': '💰',
            }

            const domainColors: Record<MainDomain, string> = {
              'Schemes': 'border-emerald-200 dark:border-emerald-800',
              'Insurance': 'border-blue-200 dark:border-blue-800',
              'Financial Support': 'border-purple-200 dark:border-purple-800',
            }

            const domainBgAccent: Record<MainDomain, string> = {
              'Schemes': 'bg-emerald-50 dark:bg-emerald-950/20',
              'Insurance': 'bg-blue-50 dark:bg-blue-950/20',
              'Financial Support': 'bg-purple-50 dark:bg-purple-950/20',
            }

            return (
              <Card key={domain} className={`border-2 ${domainColors[domain]} transition-all hover:shadow-xl`}>
                <CardHeader className={`${domainBgAccent[domain]} pb-4`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-4xl mb-3">{domainIcons[domain]}</div>
                      <CardTitle className="text-xl">{domain}</CardTitle>
                      <CardDescription className="mt-1">
                        National level monitoring
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">
                        {getDomainTotal(domain)}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        {getDomainTotal(domain) === 1 ? 'scheme' : 'schemes'}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-6">
                  {/* Categories Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {CATEGORIES.map((category) => {
                      const count = getCategoryCountForDomain(category.id, domain)
                      return (
                        <Link
                          key={category.id}
                          href={`/admin/schemes?category=${category.id}&domain=${domain}`}
                        >
                          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="text-lg mb-1">{category.icon}</div>
                                <p className="text-xs font-medium text-slate-900 dark:text-white leading-tight">
                                  {category.label}
                                </p>
                              </div>
                              <div className="rounded-full bg-slate-100 dark:bg-slate-700 px-2 py-0.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                {count}
                              </div>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>

                  <Button className="w-full" variant="outline">
                    View All Schemes
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Section 2: Platform Statistics */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Platform Statistics
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Current metrics and insights
          </p>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: 'Total Schemes',
              value: platformStats.totalSchemes,
              icon: '📋',
              color: 'emerald',
            },
            {
              label: 'Active Schemes',
              value: platformStats.activeSchemes,
              icon: '✅',
              color: 'blue',
            },
            {
              label: 'Total Farmers',
              value: platformStats.totalFarmers.toLocaleString(),
              icon: '👨‍🌾',
              color: 'purple',
            },
            {
              label: 'Recommendations',
              value: platformStats.recommendationsGenerated.toLocaleString(),
              icon: '🎯',
              color: 'orange',
            },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-2xl">{stat.icon}</div>
                </div>
                <p className="mt-2 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="h-3 w-3" />
                  Last 30 days
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 3: Recent Activity */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Recent Activity
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Latest platform updates and actions
            </p>
          </div>
          <Link href="/admin/notifications">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {activityLogs.slice(0, 6).map((log, index) => (
                <div
                  key={log.id}
                  className="flex items-start gap-4 border-b border-slate-200 p-4 last:border-0 dark:border-slate-700"
                >
                  {/* Activity icon */}
                  <div className="mt-1 text-xl">
                    {log.type === 'scheme_added' && '➕'}
                    {log.type === 'scheme_updated' && '✏️'}
                    {log.type === 'scheme_deleted' && '🗑️'}
                    {log.type === 'farmer_registered' && '✅'}
                    {log.type === 'application_submitted' && '📤'}
                  </div>

                  {/* Activity details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {log.description}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {log.details}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                      By {log.userName} • {formatTime(new Date(log.timestamp))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
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
