export interface Scheme {
  id: string
  name: string
  category: string
  benefitType: 'Cash' | 'Subsidy' | 'Loan' | 'Insurance'
  eligibility: string
  bestForYou?: boolean
  isnew?: boolean
  endingSoon?: boolean
  description: string
  benefits: string[]
  requirements: string[]
  documents: string[]
  applicationSteps: string[]
  contactInfo: string
}

export const schemes: Scheme[] = [
  {
    id: '1',
    name: 'Pradhan Mantri Kisan Samman Nidhi',
    category: 'agriculture',
    benefitType: 'Cash',
    eligibility: 'Smallholder & Marginal Farmers',
    bestForYou: true,
    description:
      'Direct income support to farmers through direct benefit transfer.',
    benefits: [
      '₹6,000 per year in 3 installments',
      'Direct transfer to bank account',
      'No paperwork required',
    ],
    requirements: ['Farm ownership certificate', 'Bank account'],
    documents: [
      'Land ownership proof',
      'Aadhar card',
      'Bank passbook',
      'Land record certificate',
    ],
    applicationSteps: [
      'Visit agricultural office with documents',
      'Complete application form',
      'Submit documents',
      'Wait for verification',
      'Receive first installment',
    ],
    contactInfo: 'Agricultural Department, District Office',
  },
  {
    id: '2',
    name: 'Crop Insurance Scheme',
    category: 'insurance',
    benefitType: 'Insurance',
    eligibility: 'All registered farmers',
    description: 'Protection against crop loss due to natural calamities.',
    benefits: [
      'Up to 100% crop loss coverage',
      'Low premium rates',
      'Quick claim settlement',
    ],
    requirements: ['Land ownership', 'Registered farming'],
    documents: [
      'Aadhar card',
      'Land documents',
      'Bank account proof',
    ],
    applicationSteps: [
      'Register with insurance agent',
      'Pay premium',
      'Receive policy',
      'Report losses within 72 hours',
    ],
    contactInfo: 'Insurance Company Branch Office',
  },
  {
    id: '3',
    name: 'Agricultural Credit Scheme',
    category: 'finance',
    benefitType: 'Loan',
    eligibility: 'Farmers with land ownership',
    bestForYou: true,
    description: 'Low-interest loans for agricultural activities.',
    benefits: [
      '7-9% interest rate',
      '5-7 years repayment period',
      'No collateral for loans up to ₹1 lakh',
    ],
    requirements: [
      'Land ownership certificate',
      'Income proof',
      'Bank account',
    ],
    documents: [
      'Land ownership proof',
      'Aadhar card',
      'Bank passbook',
      'Income certificate',
    ],
    applicationSteps: [
      'Visit bank with documents',
      'Fill loan application',
      'Land verification',
      'Loan approval',
      'Disbursement',
    ],
    contactInfo: 'Bank Agricultural Department',
  },
  {
    id: '4',
    name: 'Soil Health Card Scheme',
    category: 'agriculture',
    benefitType: 'Subsidy',
    eligibility: 'All farmers',
    description: 'Free soil testing and recommendations.',
    benefits: [
      'Free soil testing',
      'Personalized fertilizer recommendations',
      'Improved crop yield',
    ],
    requirements: ['Farm location details'],
    documents: ['Aadhar card', 'Land location proof'],
    applicationSteps: [
      'Contact agricultural extension center',
      'Provide soil sample',
      'Get test results in 2 weeks',
      'Receive recommendations',
    ],
    contactInfo: 'Agricultural Extension Center',
  },
  {
    id: '5',
    name: 'Drip Irrigation Subsidy',
    category: 'irrigation',
    benefitType: 'Subsidy',
    eligibility: 'Farmers in water-stressed areas',
    description: 'Subsidy for drip and sprinkler irrigation systems.',
    benefits: ['50-80% subsidy', 'Water savings up to 60%'],
    requirements: ['Land with water source'],
    documents: [
      'Land ownership',
      'Water availability certificate',
    ],
    applicationSteps: [
      'Apply through agricultural department',
      'Site verification',
      'Installation',
      'Subsidy disbursement',
    ],
    contactInfo: 'Irrigation Department',
  },
  {
    id: '6',
    name: 'Farm Machinery Subsidy',
    category: 'machinery',
    benefitType: 'Subsidy',
    eligibility: 'Small and marginal farmers',
    isnew: true,
    description: 'Subsidy on purchase of agricultural machinery.',
    benefits: ['40-50% subsidy', 'Approved machinery list'],
    requirements: ['Bank account'],
    documents: [
      'Aadhar card',
      'Land documents',
      'Bank account proof',
    ],
    applicationSteps: [
      'Select machinery from approved list',
      'Get quotation',
      'Apply for subsidy',
      'Get subsidy amount',
      'Purchase machinery',
    ],
    contactInfo: 'Agricultural Machinery Board',
  },
  {
    id: '7',
    name: 'Women Farmer Scheme',
    category: 'women-youth',
    benefitType: 'Cash',
    eligibility: 'Women farmers',
    bestForYou: true,
    description: 'Special support for women engaged in farming.',
    benefits: [
      '₹5,000 annual support',
      'Free skill training',
      'Market linkage support',
    ],
    requirements: ['Women farmer registration'],
    documents: [
      'Aadhar card',
      'Land documents',
      'Farming registration',
    ],
    applicationSteps: [
      'Register as woman farmer',
      'Apply for scheme',
      'Get approval',
      'Receive benefits',
    ],
    contactInfo: "Women's Agricultural Cell",
  },
  {
    id: '8',
    name: 'Farmer Training Program',
    category: 'training-skill',
    benefitType: 'Subsidy',
    eligibility: 'All interested farmers',
    endingSoon: true,
    description: 'Free skill training for modern farming techniques.',
    benefits: [
      'Free training courses',
      'Certification',
      'Job placement assistance',
    ],
    requirements: ['Age 18+'],
    documents: ['Aadhar card', 'Educational proof'],
    applicationSteps: [
      'Register online or offline',
      'Attend training sessions',
      'Pass assessment',
      'Get certificate',
    ],
    contactInfo: 'Agricultural Training Center',
  },
  {
    id: '9',
    name: 'Pension Scheme for Farmers',
    category: 'health-pension',
    benefitType: 'Cash',
    eligibility: 'Farmers above 60 years',
    description: 'Monthly pension for elderly farmers.',
    benefits: [
      '₹3,000 monthly pension',
      'Health insurance included',
      '500 lifetime medical benefits',
    ],
    requirements: ['Age above 60', 'Farming experience 10+ years'],
    documents: [
      'Aadhar card',
      'Age proof',
      'Farming certificate',
    ],
    applicationSteps: [
      'Apply to social welfare department',
      'Age and farming verification',
      'Medical check-up',
      'Pension approval',
    ],
    contactInfo: 'Social Welfare Department',
  },
]

export function getSchemesByCategory(category: string): Scheme[] {
  return schemes.filter(
    (scheme) => scheme.category.toLowerCase() === category.toLowerCase(),
  )
}

export function getSchemeById(id: string): Scheme | undefined {
  return schemes.find((scheme) => scheme.id === id)
}

export const categories = [
  { id: 'agriculture', name: 'Agriculture', icon: '🌾' },
  { id: 'insurance', name: 'Insurance', icon: '🛡️' },
  { id: 'finance', name: 'Finance', icon: '💰' },
  { id: 'machinery', name: 'Machinery', icon: '⚙️' },
  { id: 'irrigation', name: 'Irrigation', icon: '💧' },
  { id: 'health-pension', name: 'Health & Pension', icon: '❤️' },
  { id: 'women-youth', name: 'Women & Youth', icon: '👥' },
  { id: 'training-skill', name: 'Training & Skill', icon: '📚' },
]
