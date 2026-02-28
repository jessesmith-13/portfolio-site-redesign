import React, { useState } from 'react'
import { Step1ProjectType } from './Step1ProjectType'
import { Step2Scope } from './Step2Scope'
import { Step3Features } from './Step3Features'
import { Step4Timeline } from './Step4Timeline'
import { ResultScreen } from './ResultScreen'
import { LeadCapture } from './LeadCapture'
import { ConfirmationScreen } from './ConfirmationScreen'
import { Progress } from '../ui/progress'

export type ProjectType =
  | 'landing'
  | 'marketing'
  | 'ecommerce'
  | 'webapp'
  | 'retainer'
export type BudgetRange =
  | 'under_2500'
  | 'range_2500_5000'
  | 'range_5000_10000'
  | 'range_10000_20000'
  | 'over_20000'

export interface FormData {
  // Step 1
  projectType: ProjectType | null

  // Step 2
  pageCount: number
  screenCount: number
  contentReady: boolean
  designReady: boolean
  needsCMS: boolean

  // Step 3
  features: {
    auth: boolean
    stripe: boolean
    adminDashboard: boolean
    apiIntegrations: number
    advancedAnimations: boolean
    seoOptimization: boolean
    analyticsSetup: boolean
    multiRolePermissions: boolean
  }

  // Step 4 - Budget & Timeline
  budgetRange: BudgetRange | null
  idealLaunchDate: string

  // Lead capture
  name: string
  email: string
  company: string
  currentWebsiteUrl: string
  targetAudience: string
  goals: string
}

const initialFormData: FormData = {
  projectType: null,
  pageCount: 1,
  screenCount: 5,
  contentReady: true,
  designReady: true,
  needsCMS: false,
  features: {
    auth: false,
    stripe: false,
    adminDashboard: false,
    apiIntegrations: 0,
    advancedAnimations: false,
    seoOptimization: false,
    analyticsSetup: false,
    multiRolePermissions: false,
  },
  budgetRange: null,
  idealLaunchDate: '',
  name: '',
  email: '',
  company: '',
  currentWebsiteUrl: '',
  targetAudience: '',
  goals: '',
}

export function EstimateForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [showResults, setShowResults] = useState(false)
  const [showLeadCapture, setShowLeadCapture] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleViewResults = () => {
    setShowLeadCapture(true)
  }

  const handleSubmitLead = async () => {
    try {
      // Send data to Strapi backend (custom endpoint handles DB + email)
      const strapiUrl =
        process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
      const response = await fetch(`${strapiUrl}/api/estimate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          currentWebsiteUrl: formData.currentWebsiteUrl,
          targetAudience: formData.targetAudience,
          goals: formData.goals,
          projectType: formData.projectType,
          pageCount: formData.pageCount,
          screenCount: formData.screenCount,
          contentReady: formData.contentReady,
          designReady: formData.designReady,
          needsCMS: formData.needsCMS,
          features: formData.features,
          budgetRange: formData.budgetRange,
          idealLaunchDate: formData.idealLaunchDate,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit estimate')
      }

      setShowConfirmation(true)
    } catch (error) {
      console.error('Error submitting estimate:', error)
      // Still show confirmation for now, but you could add error handling UI
      setShowConfirmation(true)
    }
  }

  const handleRestart = () => {
    setFormData(initialFormData)
    setCurrentStep(1)
    setShowResults(false)
    setShowLeadCapture(false)
    setShowConfirmation(false)
  }

  if (showConfirmation) {
    return <ConfirmationScreen formData={formData} onRestart={handleRestart} />
  }

  if (showLeadCapture) {
    return (
      <LeadCapture
        formData={formData}
        updateFormData={updateFormData}
        onSubmit={handleSubmitLead}
        onBack={() => setShowLeadCapture(false)}
      />
    )
  }

  if (showResults) {
    return (
      <ResultScreen
        formData={formData}
        onNext={handleViewResults}
        onBack={() => setShowResults(false)}
      />
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl pt-20">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[#3d4654]">
              Step {currentStep} of {totalSteps}
            </h2>
            <span className="text-sm text-gray-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {currentStep === 1 && (
            <Step1ProjectType
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
            />
          )}
          {currentStep === 2 && (
            <Step2Scope
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <Step3Features
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 4 && (
            <Step4Timeline
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  )
}
