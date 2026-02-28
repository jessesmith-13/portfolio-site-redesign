import { FormData } from '../src/components/estimate/EstimateForm'

interface EstimateResult {
  basePrice: number
  minPrice: number
  maxPrice: number
  timeline: string
  confidence: 'High' | 'Medium' | 'Low'
  confidenceNote: string
  summary: string[]
}

// UPDATED: Match backend controller logic
const RUSH_MULTIPLIER = 1.2

export function calculateEstimate(formData: FormData): EstimateResult {
  let baseMin = 0
  let baseMax = 0

  // FIXED: More realistic pricing for solo freelancer ($50-80/hr range)
  switch (formData.projectType) {
    case 'landing':
      baseMin = 2000
      baseMax = 4000
      break
    case 'marketing':
      baseMin = 4000
      baseMax = 8000
      break
    case 'ecommerce':
      baseMin = 7000
      baseMax = 12000
      break
    case 'webapp':
      baseMin = 8000 // Lowered from 10k
      baseMax = 15000 // Lowered from 18k, includes basic auth
      break
    case 'retainer':
      baseMin = 3000
      baseMax = 6000
      break
  }

  // FIXED: Reduced scope multiplier from 0.15 to 0.05, cap at 1.5x instead of 2x
  let scopeMultiplier = 1
  if (formData.projectType === 'webapp') {
    // For web apps: much gentler growth, capped at 1.5x
    const baseScreens = 5
    const extraScreens = Math.max(0, formData.screenCount - baseScreens)
    scopeMultiplier = 1 + Math.min(extraScreens * 0.05, 0.5) // Max 1.5x at ~15 screens
  } else if (formData.projectType !== 'retainer') {
    // For websites: gentler growth, capped at 1.8x
    const basePages = 3
    const extraPages = Math.max(0, formData.pageCount - basePages)
    scopeMultiplier = 1 + Math.min(extraPages * 0.08, 0.8) // Max 1.8x at ~13 pages
  }

  baseMin *= scopeMultiplier
  baseMax *= scopeMultiplier

  // Content and Design - now uses multipliers for consistency
  if (formData.contentReady) {
    baseMin *= 0.9
    baseMax *= 0.9
  }
  if (formData.designReady) {
    baseMin *= 0.85
    baseMax *= 0.85
  }

  // CMS
  if (formData.needsCMS) {
    baseMin += 1500
    baseMax += 2500 // Tightened from 4000 (67% variance instead of 133%)
  }

  // Features - FIXED: Tightened variance from 100% to 50% for more professional estimates
  if (formData.features.auth) {
    baseMin += 1200
    baseMax += 2000 // Was 1500-3000, now ~67% variance
  }
  if (formData.features.stripe) {
    baseMin += 1800
    baseMax += 3000 // Was 2000-4000, now ~67% variance
  }
  if (formData.features.adminDashboard) {
    baseMin += 2500
    baseMax += 4000 // Was 3000-6000, now ~60% variance
  }
  // API integrations stay at reasonable $400-$800 each
  if (formData.features.apiIntegrations > 0) {
    baseMin += formData.features.apiIntegrations * 400
    baseMax += formData.features.apiIntegrations * 800 // 100% variance is OK for APIs (small amounts)
  }
  if (formData.features.advancedAnimations) {
    baseMin += 800
    baseMax += 1500 // Was 1000-2500, now ~88% variance
  }
  if (formData.features.seoOptimization) {
    baseMin += 600
    baseMax += 1000 // Was 800-1500, now ~67% variance
  }
  if (formData.features.analyticsSetup) {
    baseMin += 400
    baseMax += 700 // Was 500-1000, now ~75% variance
  }
  if (formData.features.multiRolePermissions) {
    baseMin += 1800
    baseMax += 3000 // Was 2000-4000, now ~67% variance
  }

  // Rush timeline (if launch date is within 30 days)
  const isRush = formData.idealLaunchDate
    ? checkIfRush(formData.idealLaunchDate)
    : false
  if (isRush) {
    baseMin *= RUSH_MULTIPLIER
    baseMax *= RUSH_MULTIPLIER
  }

  // Round to nearest 100
  const minPrice = Math.round(baseMin / 100) * 100
  const maxPrice = Math.round(baseMax / 100) * 100
  const basePrice = Math.round((minPrice + maxPrice) / 2 / 100) * 100 // Average

  // FIXED: Dynamic timeline based on project complexity
  const timeline = calculateTimeline(formData)

  // Confidence calculation
  let confidenceScore = 0
  if (formData.contentReady) confidenceScore++
  if (formData.designReady) confidenceScore++
  if (
    formData.projectType === 'landing' ||
    formData.projectType === 'marketing'
  )
    confidenceScore++

  const confidence: 'High' | 'Medium' | 'Low' =
    confidenceScore >= 3 ? 'High' : confidenceScore >= 2 ? 'Medium' : 'Low'

  const confidenceNote =
    confidence === 'High'
      ? 'Clear scope with ready assets'
      : confidence === 'Medium'
        ? 'May need minor refinement'
        : 'Requires discovery phase'

  // Summary
  const summary = buildSummary(formData, timeline)

  return {
    basePrice,
    minPrice,
    maxPrice,
    timeline,
    confidence,
    confidenceNote,
    summary,
  }
}

function buildSummary(formData: FormData, timeline: string): string[] {
  const summary: string[] = []

  // Project type
  const typeNames = {
    landing: 'Landing Page',
    marketing: 'Marketing Website',
    ecommerce: 'E-commerce Site',
    webapp: 'Web Application',
    retainer: 'Ongoing Development Retainer',
  }
  summary.push(typeNames[formData.projectType!])

  // Pages/Screens
  if (formData.projectType === 'webapp') {
    summary.push(`${formData.screenCount} screens`)
  } else if (formData.projectType !== 'retainer') {
    summary.push(
      `${formData.pageCount} page${formData.pageCount > 1 ? 's' : ''}`
    )
  }

  // Content & Design
  if (!formData.contentReady) summary.push('Professional copywriting')
  if (!formData.designReady) summary.push('Custom design work')
  if (formData.needsCMS) summary.push('Content Management System')

  // Features
  const features = []
  if (formData.features.auth) features.push('Authentication')
  if (formData.features.stripe) features.push('Payment processing')
  if (formData.features.adminDashboard) features.push('Admin dashboard')
  if (formData.features.advancedAnimations) features.push('Advanced animations')
  if (formData.features.seoOptimization) features.push('SEO optimization')
  if (formData.features.analyticsSetup) features.push('Analytics setup')
  if (formData.features.multiRolePermissions)
    features.push('Multi-role permissions')
  if (formData.features.apiIntegrations > 0) {
    features.push(
      `${formData.features.apiIntegrations} API integration${formData.features.apiIntegrations > 1 ? 's' : ''}`
    )
  }

  if (features.length > 0) {
    summary.push(...features)
  }

  // Timeline - extract from calculated timeline string
  let timelineLabel = 'Standard timeline'
  if (timeline.includes('Rush timeline')) {
    timelineLabel = 'Rush timeline'
  } else if (timeline.includes('Flexible timeline')) {
    timelineLabel = 'Flexible timeline'
  }
  summary.push(timelineLabel)

  return summary
}

function checkIfRush(idealLaunchDate: string): boolean {
  const launchDate = new Date(idealLaunchDate)
  const currentDate = new Date()
  const timeDifference = launchDate.getTime() - currentDate.getTime()
  const daysDifference = timeDifference / (1000 * 3600 * 24)
  return daysDifference <= 30
}

function calculateTimeline(formData: FormData): string {
  // Calculate realistic timeline based on project complexity
  let weeksNeeded = 2 // Minimum baseline

  // Base time by project type
  switch (formData.projectType) {
    case 'landing':
      weeksNeeded = 2
      break
    case 'marketing':
      weeksNeeded = 3
      break
    case 'ecommerce':
      weeksNeeded = 6
      break
    case 'webapp':
      weeksNeeded = 8
      break
    case 'retainer':
      weeksNeeded = 0 // Ongoing
      break
  }

  // Add time for scope (pages/screens)
  if (formData.projectType === 'webapp') {
    const extraScreens = Math.max(0, formData.screenCount - 5)
    weeksNeeded += Math.floor(extraScreens * 0.3) // ~3 days per extra screen
  } else if (
    formData.projectType !== 'retainer' &&
    formData.projectType !== 'landing'
  ) {
    const extraPages = Math.max(0, formData.pageCount - 3)
    weeksNeeded += Math.floor(extraPages * 0.4) // ~2-3 days per extra page
  }

  // Add time for content/design work
  if (!formData.contentReady) weeksNeeded += 1
  if (!formData.designReady) weeksNeeded += 2

  // Add time for complex features
  if (formData.features.auth) weeksNeeded += 0.5
  if (formData.features.stripe) weeksNeeded += 1
  if (formData.features.adminDashboard) weeksNeeded += 2
  if (formData.features.multiRolePermissions) weeksNeeded += 1
  if (formData.features.apiIntegrations > 0)
    weeksNeeded += formData.features.apiIntegrations * 0.3
  if (formData.needsCMS) weeksNeeded += 1

  // Round to whole or half weeks
  weeksNeeded = Math.ceil(weeksNeeded * 2) / 2

  // Check their desired launch date
  if (formData.idealLaunchDate) {
    const launchDate = new Date(formData.idealLaunchDate)
    const currentDate = new Date()
    const timeDiff = launchDate.getTime() - currentDate.getTime()
    const weeksUntilLaunch = Math.floor(timeDiff / (1000 * 3600 * 24 * 7))

    // If they want it sooner than realistic, show rush timeline
    if (weeksUntilLaunch < weeksNeeded * 0.7) {
      return `${Math.max(2, Math.floor(weeksNeeded * 0.7))}-${weeksNeeded} weeks (Rush timeline)`
    }

    // If their date aligns with realistic timeline
    if (
      weeksUntilLaunch >= weeksNeeded &&
      weeksUntilLaunch <= weeksNeeded * 1.5
    ) {
      return `${weeksNeeded}-${Math.ceil(weeksNeeded * 1.2)} weeks`
    }

    // If they have plenty of time, show flexible range
    if (weeksUntilLaunch > weeksNeeded * 1.5) {
      return `${weeksNeeded}-${Math.ceil(weeksNeeded * 1.3)} weeks (Flexible timeline)`
    }
  }

  // Default range if no date provided
  return `${weeksNeeded}-${Math.ceil(weeksNeeded * 1.3)} weeks`
}
