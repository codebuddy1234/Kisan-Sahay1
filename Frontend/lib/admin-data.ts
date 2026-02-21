import { mockSchemes, Category, CATEGORIES } from './mock-schemes'

export { CATEGORIES }

export interface AdminScheme {
  id: string
  name: string
  category: Category
  status: 'active' | 'inactive' | 'draft'
  states: string[]
  benefitType: 'cash' | 'subsidy' | 'loan' | 'insurance'
  createdDate: string
  createdBy: string
  lastUpdated: string
  applicationsCount: number
}

export interface AdminUser {
  id: string
  name: string
  email: string
  role: 'admin' | 'moderator' | 'viewer'
  department: string
  lastLogin: string
}

export interface ActivityLog {
  id: string
  type: 'scheme_added' | 'scheme_updated' | 'scheme_deleted' | 'farmer_registered' | 'application_submitted'
  description: string
  timestamp: string
  userId: string
  userName: string
  details?: string
}

export interface PlatformStats {
  totalSchemes: number
  activeSchemes: number
  totalFarmers: number
  recommendationsGenerated: number
}

// Mock admin schemes
export const adminSchemes: AdminScheme[] = mockSchemes.map((scheme, index) => ({
  id: scheme.id,
  name: scheme.name,
  category: scheme.category,
  status: index % 3 === 0 ? 'draft' : 'active',
  states: scheme.states,
  benefitType: scheme.benefitType,
  createdDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  createdBy: ['Raj Kumar', 'Priya Singh', 'Amit Patel'][index % 3],
  lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  applicationsCount: Math.floor(Math.random() * 5000) + 100,
}))

// Mock admin users
export const adminUsers: AdminUser[] = [
  {
    id: 'admin-1',
    name: 'Raj Kumar',
    email: 'raj.kumar@agriculture.gov.in',
    role: 'admin',
    department: 'Scheme Management',
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'admin-2',
    name: 'Priya Singh',
    email: 'priya.singh@agriculture.gov.in',
    role: 'moderator',
    department: 'Farmer Support',
    lastLogin: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'admin-3',
    name: 'Amit Patel',
    email: 'amit.patel@agriculture.gov.in',
    role: 'moderator',
    department: 'Analytics',
    lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'admin-4',
    name: 'Neha Gupta',
    email: 'neha.gupta@agriculture.gov.in',
    role: 'viewer',
    department: 'Quality Assurance',
    lastLogin: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

// Mock activity logs
export const activityLogs: ActivityLog[] = [
  {
    id: 'log-1',
    type: 'scheme_added',
    description: 'New scheme "PM Kisan Yantra" added',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    userId: 'admin-1',
    userName: 'Raj Kumar',
    details: 'Machinery subsidy scheme for equipment purchase',
  },
  {
    id: 'log-2',
    type: 'farmer_registered',
    description: '150 new farmers registered',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    userId: 'admin-2',
    userName: 'Priya Singh',
    details: 'Registration spike from Maharashtra state',
  },
  {
    id: 'log-3',
    type: 'scheme_updated',
    description: 'Updated "PM Fasal Bima Yojana" eligibility criteria',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    userId: 'admin-1',
    userName: 'Raj Kumar',
    details: 'Expanded crop coverage for insurance scheme',
  },
  {
    id: 'log-4',
    type: 'application_submitted',
    description: '450 scheme applications processed',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    userId: 'admin-3',
    userName: 'Amit Patel',
    details: 'Daily batch processing completed successfully',
  },
  {
    id: 'log-5',
    type: 'scheme_updated',
    description: 'Updated "Kisan Credit Card" interest rates',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    userId: 'admin-2',
    userName: 'Priya Singh',
    details: 'Reduced interest rates effective from today',
  },
  {
    id: 'log-6',
    type: 'farmer_registered',
    description: '320 farmers from Gujarat region verified',
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    userId: 'admin-1',
    userName: 'Raj Kumar',
    details: 'KYC verification batch completed',
  },
]

// Mock platform statistics
export const platformStats: PlatformStats = {
  totalSchemes: adminSchemes.length,
  activeSchemes: adminSchemes.filter((s) => s.status === 'active').length,
  totalFarmers: 145320,
  recommendationsGenerated: 89453,
}

// Mock data for Manage Schemes page
export interface FarmerData {
  id: string
  name: string
  state: string
  district: string
  registrationDate: string
  schemes: number
}

export const farmersList: FarmerData[] = [
  {
    id: 'farmer-1',
    name: 'Rajesh Kumar',
    state: 'Maharashtra',
    district: 'Pune',
    registrationDate: '2024-01-15',
    schemes: 3,
  },
  {
    id: 'farmer-2',
    name: 'Priya Sharma',
    state: 'Punjab',
    district: 'Ludhiana',
    registrationDate: '2024-02-10',
    schemes: 5,
  },
  {
    id: 'farmer-3',
    name: 'Amit Singh',
    state: 'Haryana',
    district: 'Hisar',
    registrationDate: '2024-03-05',
    schemes: 2,
  },
  {
    id: 'farmer-4',
    name: 'Lakshmi Devi',
    state: 'Uttar Pradesh',
    district: 'Agra',
    registrationDate: '2024-01-20',
    schemes: 4,
  },
  {
    id: 'farmer-5',
    name: 'Vikram Patel',
    state: 'Gujarat',
    district: 'Ahmedabad',
    registrationDate: '2024-02-28',
    schemes: 6,
  },
]

// Mock notifications
export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'error'
  timestamp: string
  read: boolean
}

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'System Update',
    message: 'Platform maintenance scheduled for tonight at 10 PM',
    type: 'info',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 'notif-2',
    title: 'High Volume Alert',
    message: 'Unusually high number of scheme applications today',
    type: 'warning',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Batch Processing Complete',
    message: '500 applications successfully processed and approved',
    type: 'success',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: 'notif-4',
    title: 'Data Sync Error',
    message: 'Failed to sync with state portal. Manual intervention required.',
    type: 'error',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
]
