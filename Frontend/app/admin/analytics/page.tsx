'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { adminSchemes, platformStats, CATEGORIES } from '@/lib/admin-data'

// Prepare data for charts
const schemesPerCategory = CATEGORIES.map((cat) => ({
  name: cat.label,
  schemes: adminSchemes.filter((s) => s.category === cat.id).length,
}))

const schemesByStatus = [
  { name: 'Active', value: adminSchemes.filter((s) => s.status === 'active').length },
  { name: 'Inactive', value: adminSchemes.filter((s) => s.status === 'inactive').length },
  { name: 'Draft', value: adminSchemes.filter((s) => s.status === 'draft').length },
]

const COLORS = ['#10b981', '#ef4444', '#eab308']

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Analytics & Reports
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Platform insights and statistics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Total Schemes
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                  {platformStats.totalSchemes}
                </p>
              </div>
              <span className="text-3xl">📋</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Active Schemes
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                  {platformStats.activeSchemes}
                </p>
              </div>
              <span className="text-3xl">✅</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Total Farmers
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                  {platformStats.totalFarmers.toLocaleString()}
                </p>
              </div>
              <span className="text-3xl">👨‍🌾</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Recommendations
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                  {platformStats.recommendationsGenerated.toLocaleString()}
                </p>
              </div>
              <span className="text-3xl">🎯</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Bar Chart: Schemes per Category */}
        <Card>
          <CardHeader>
            <CardTitle>Schemes per Category</CardTitle>
            <CardDescription>
              Distribution of schemes across categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={schemesPerCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="schemes" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart: Schemes by Status */}
        <Card>
          <CardHeader>
            <CardTitle>Schemes by Status</CardTitle>
            <CardDescription>
              Current status distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={schemesByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} (${value})`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {schemesByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Top Schemes by Applications</CardTitle>
          <CardDescription>
            Schemes with highest farmer applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {adminSchemes
              .sort((a, b) => b.applicationsCount - a.applicationsCount)
              .slice(0, 5)
              .map((scheme, index) => (
                <div
                  key={scheme.id}
                  className="flex items-center justify-between border-b border-slate-200 pb-4 last:border-0 dark:border-slate-700"
                >
                  <div className="flex items-center gap-4">
                    <span className="inline-block h-8 w-8 rounded-full bg-emerald-100 text-center text-sm font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {scheme.name}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {scheme.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900 dark:text-white">
                      {scheme.applicationsCount}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                      applications
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
