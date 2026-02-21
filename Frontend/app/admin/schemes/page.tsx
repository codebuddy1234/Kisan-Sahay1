'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { adminSchemes, CATEGORIES } from '@/lib/admin-data'
import { Edit2, Trash2, Search, Plus } from 'lucide-react'

export default function ManageSchemesPage() {
  const searchParams = useSearchParams()
  const categoryFilter = searchParams.get('category')

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'draft'>('all')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // Filter schemes based on search and filters
  const filteredSchemes = useMemo(() => {
    return adminSchemes.filter((scheme) => {
      const matchesSearch =
        scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !categoryFilter || scheme.category === categoryFilter
      const matchesStatus = statusFilter === 'all' || scheme.status === statusFilter

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [searchQuery, statusFilter, categoryFilter])

  const categoryLabel = categoryFilter
    ? CATEGORIES.find((c) => c.id === categoryFilter)?.label
    : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Manage Schemes
          </h1>
          {categoryLabel && (
            <p className="text-slate-600 dark:text-slate-400">
              Filtering by: <span className="font-semibold">{categoryLabel}</span>
            </p>
          )}
        </div>
        <Link href="/admin/schemes/new">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" />
            Add New Scheme
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            {/* Search input */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search schemes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status filter */}
            <Select value={statusFilter} onValueChange={(v: any) => setStatusFilter(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            {/* Results count */}
            <div className="flex items-center justify-end rounded-lg bg-slate-100 px-4 py-2 dark:bg-slate-800">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {filteredSchemes.length} scheme{filteredSchemes.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schemes Table */}
      <Card>
        <CardContent className="p-0">
          {filteredSchemes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-slate-600 dark:text-slate-400 mb-2">No schemes found</p>
              <p className="text-sm text-slate-500 dark:text-slate-500">
                Try adjusting your filters or search query
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200 dark:border-slate-700">
                  <tr className="bg-slate-50 dark:bg-slate-900/50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400">
                      Scheme Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400">
                      Benefit Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400">
                      Applications
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 dark:text-slate-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {filteredSchemes.map((scheme) => (
                    <tr
                      key={scheme.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                        {scheme.name}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                          {scheme.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                        {scheme.benefitType}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                            scheme.status === 'active'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                              : scheme.status === 'inactive'
                                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}
                        >
                          {scheme.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                        {scheme.applicationsCount}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="rounded p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                            <Edit2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </button>
                          <button
                            onClick={() =>
                              setDeleteConfirm(
                                deleteConfirm === scheme.id ? null : scheme.id
                              )
                            }
                            className="rounded p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                          </button>
                        </div>
                        {deleteConfirm === scheme.id && (
                          <div className="absolute right-0 top-full mt-1 rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900 p-3">
                            <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                              Delete scheme?
                            </p>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setDeleteConfirm(null)}
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                className="bg-red-600 hover:bg-red-700"
                                onClick={() => {
                                  setDeleteConfirm(null)
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
