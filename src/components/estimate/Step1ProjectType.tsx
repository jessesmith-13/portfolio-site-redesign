import React from 'react'
import { FormData, ProjectType } from './EstimateForm'
import { Button } from '../ui/Button'
import {
  CheckCircle2,
  Layers,
  ShoppingCart,
  Rocket,
  Repeat,
} from 'lucide-react'

interface Step1Props {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  onNext: () => void
}

const projectTypes = [
  {
    id: 'landing' as ProjectType,
    title: 'Landing Page',
    description: 'Single page designed to convert visitors',
    startingPrice: '$2,500',
    icon: Layers,
  },
  {
    id: 'marketing' as ProjectType,
    title: 'Marketing Website',
    description: '3–8 pages showcasing your business',
    startingPrice: '$4,000',
    icon: Rocket,
  },
  {
    id: 'ecommerce' as ProjectType,
    title: 'E-commerce',
    description: 'Online store with product catalog',
    startingPrice: '$6,500',
    icon: ShoppingCart,
  },
  {
    id: 'webapp' as ProjectType,
    title: 'Web App / MVP',
    description: 'Custom application or minimum viable product',
    startingPrice: '$9,000',
    icon: Rocket,
  },
  {
    id: 'retainer' as ProjectType,
    title: 'Ongoing Development',
    description: 'Monthly retainer for continuous support',
    startingPrice: '$2,000/mo',
    icon: Repeat,
  },
]

export function Step1ProjectType({
  formData,
  updateFormData,
  onNext,
}: Step1Props) {
  const handleSelect = (type: ProjectType) => {
    // Auto-set page/screen counts based on project type
    const updates: Partial<FormData> = { projectType: type }

    switch (type) {
      case 'landing':
        updates.pageCount = 1 // Landing pages are always 1 page
        break
      case 'marketing':
        updates.pageCount = 5 // Default to middle of 3-8 range
        break
      case 'ecommerce':
        updates.pageCount = 8 // E-commerce typically has more pages
        break
      case 'webapp':
        updates.screenCount = 8 // Web apps default to 8 screens
        break
      case 'retainer':
        // No page count needed for retainer
        break
    }

    updateFormData(updates)
  }

  const handleContinue = () => {
    if (formData.projectType) {
      onNext()
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-[#3d4654] mb-3">
          What type of project do you need?
        </h3>
        <p className="text-gray-600">
          Select the option that best matches your project
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {projectTypes.map((type) => {
          const Icon = type.icon
          const isSelected = formData.projectType === type.id

          return (
            <button
              key={type.id}
              onClick={() => handleSelect(type.id)}
              className={`relative text-left p-6 rounded-xl border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-[#FCBF28] bg-[#FCBF28]/5 shadow-lg'
                  : 'border-gray-200 hover:border-[#FCBF28]/50 hover:shadow-md'
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4">
                  <CheckCircle2 className="w-6 h-6 text-[#FCBF28]" />
                </div>
              )}

              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#3d4654] flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-[#FCBF28]" />
                </div>
                <h4 className="text-xl font-semibold text-[#3d4654] mb-2">
                  {type.title}
                </h4>
                <p className="text-gray-600 text-sm mb-3">{type.description}</p>
                <p className="text-[#FCBF28] font-semibold text-sm">
                  Starting at {type.startingPrice}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleContinue}
          disabled={!formData.projectType}
          size="lg"
          className="bg-[#3d4654] hover:bg-[#2d3644] text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
