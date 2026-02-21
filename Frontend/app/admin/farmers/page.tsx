'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { farmersList } from '@/lib/admin-data'
import { Search, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function FarmersPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFarmers = farmersList.filter(
    (farmer) =>
      farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.district.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Farmers Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            View and manage registered farmers
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search Farmers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by name, state, or district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Farmers Table */}
      <Card>
        <CardContent className="p-0">
          {filteredFarmers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                No farmers found
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-500">
                Try adjusting your search query
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200 dark:border-slate-700">
                  <tr className="bg-slate-50 dark:bg-slate-900/50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400">
                      Farmer Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400">
                      State
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400">
                      District
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400">
                      Registration Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400">
                      Schemes Applied
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {filteredFarmers.map((farmer) => (
                    <tr
                      key={farmer.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                        {farmer.name}
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                        {farmer.state}
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                        {farmer.district}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                        {new Date(farmer.registrationDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                          {farmer.schemes}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Total Farmers
            </p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
              {farmersList.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Average Schemes per Farmer
            </p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
              {(farmersList.reduce((sum, f) => sum + f.schemes, 0) / farmersList.length).toFixed(1)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              States Covered
            </p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
              {new Set(farmersList.map((f) => f.state)).size}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
