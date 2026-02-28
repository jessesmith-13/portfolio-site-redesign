import React from 'react'
import { FormData } from './EstimateForm'
import { Button } from '../ui/Button'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { Slider } from '../ui/slider'
import {
  Lock,
  CreditCard,
  LayoutDashboard,
  Zap,
  TrendingUp,
  BarChart,
  Users,
} from 'lucide-react'

interface Step3Props {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

const featuresList = [
  {
    id: 'auth',
    label: 'Authentication',
    description: 'User login, registration, and role management',
    icon: Lock,
  },
  {
    id: 'stripe',
    label: 'Stripe / Payments',
    description: 'Payment processing and subscriptions',
    icon: CreditCard,
  },
  {
    id: 'adminDashboard',
    label: 'Admin Dashboard',
    description: 'Custom admin panel for managing content',
    icon: LayoutDashboard,
  },
  {
    id: 'advancedAnimations',
    label: 'Advanced Animations',
    description: 'Complex animations and interactions',
    icon: Zap,
  },
  {
    id: 'seoOptimization',
    label: 'SEO Optimization',
    description: 'Search engine optimization setup',
    icon: TrendingUp,
  },
  {
    id: 'analyticsSetup',
    label: 'Analytics Setup',
    description: 'Google Analytics and event tracking',
    icon: BarChart,
  },
  {
    id: 'multiRolePermissions',
    label: 'Multi-role Permissions',
    description: 'Complex user permission systems',
    icon: Users,
  },
]

export function Step3Features({
  formData,
  updateFormData,
  onNext,
  onBack,
}: Step3Props) {
  const handleFeatureToggle = (featureId: string, checked: boolean) => {
    updateFormData({
      features: {
        ...formData.features,
        [featureId]: checked,
      },
    })
  }

  const handleApiIntegrationsChange = (value: number) => {
    updateFormData({
      features: {
        ...formData.features,
        apiIntegrations: value,
      },
    })
  }

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-[#3d4654] mb-3">
          Select additional features
        </h3>
        <p className="text-gray-600">
          Choose any features you&apos;ll need (optional)
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {featuresList.map((feature) => {
          const Icon = feature.icon
          const isChecked = formData.features[
            feature.id as keyof typeof formData.features
          ] as boolean

          return (
            <div
              key={feature.id}
              className={`bg-gray-50 rounded-lg p-5 transition-all duration-200 ${
                isChecked ? 'ring-2 ring-[#FCBF28] bg-[#FCBF28]/5' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <Checkbox
                  id={feature.id}
                  checked={isChecked}
                  onCheckedChange={(checked) =>
                    handleFeatureToggle(feature.id, checked as boolean)
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded bg-[#3d4654] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#FCBF28]" />
                    </div>
                    <Label
                      htmlFor={feature.id}
                      className="text-lg font-semibold text-[#3d4654] cursor-pointer"
                    >
                      {feature.label}
                    </Label>
                  </div>
                  <p className="text-sm text-gray-600 ml-11">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}

        {/* API Integrations Slider */}
        <div className="bg-gray-50 rounded-lg p-6">
          <Label className="text-lg font-semibold text-[#3d4654] mb-4 block">
            API Integrations
          </Label>
          <p className="text-sm text-gray-600 mb-4">
            Number of third-party API integrations needed
          </p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">Integrations</span>
            <span className="text-2xl font-bold text-[#3d4654]">
              {formData.features.apiIntegrations}
            </span>
          </div>
          <Slider
            value={[formData.features.apiIntegrations]}
            onValueChange={([value]) => handleApiIntegrationsChange(value)}
            min={0}
            max={10}
            step={1}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0</span>
            <span>10+</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline" size="lg">
          Back
        </Button>
        <Button
          onClick={onNext}
          size="lg"
          className="bg-[#3d4654] hover:bg-[#2d3644] text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
