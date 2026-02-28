import React from 'react'
import { FormData, BudgetRange } from './EstimateForm'
import { Button } from '../ui/Button'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import Input from '../ui/Input'
import { Calendar, AlertCircle, CheckCircle2 } from 'lucide-react'
import { calculateEstimate } from '../../../lib/estimateCalculator'

interface Step4Props {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

const budgetRanges: Array<{
  value: BudgetRange
  label: string
  icon: string
  description: string
}> = [
  {
    value: 'under_2500',
    label: 'Under $2,500',
    icon: '⚠️',
    description: 'Below my starting range',
  },
  {
    value: 'range_2500_5000',
    label: '$2,500 - $5,000',
    icon: '💡',
    description: 'Small to medium projects',
  },
  {
    value: 'range_5000_10000',
    label: '$5,000 - $10,000',
    icon: '✨',
    description: 'Medium to large projects',
  },
  {
    value: 'range_10000_20000',
    label: '$10,000 - $20,000',
    icon: '🚀',
    description: 'Large, feature-rich projects',
  },
  {
    value: 'over_20000',
    label: '$20,000+',
    icon: '💎',
    description: 'Premium enterprise projects',
  },
]

export function Step4Timeline({
  formData,
  updateFormData,
  onNext,
  onBack,
}: Step4Props) {
  const handleContinue = () => {
    if (formData.budgetRange && formData.idealLaunchDate) {
      onNext()
    }
  }

  // Calculate the estimate based on current form data
  const estimate = calculateEstimate(formData)

  // Budget range max values
  const budgetMaxValues: Record<BudgetRange, number> = {
    under_2500: 2500,
    range_2500_5000: 5000,
    range_5000_10000: 10000,
    range_10000_20000: 20000,
    over_20000: Infinity,
  }

  // Check if selected budget is too low for the project scope
  const budgetMax = formData.budgetRange
    ? budgetMaxValues[formData.budgetRange]
    : Infinity
  const hasBudgetMismatch = budgetMax < estimate.minPrice

  const isPremium = formData.budgetRange === 'over_20000'

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-[#3d4654] mb-3">
          Budget & Timeline
        </h3>
        <p className="text-gray-600">
          Help me understand your investment range and ideal launch date
        </p>
      </div>

      {/* Budget Range */}
      <div className="mb-8">
        <Label className="text-lg font-semibold text-[#3d4654] mb-3 block">
          What&apos;s your budget range?
        </Label>
        <p className="text-sm text-gray-600 mb-4">
          Sharing your budget range helps me recommend the right technologies
          and features to get you the best ROI within your means.
        </p>

        <RadioGroup
          value={formData.budgetRange || ''}
          onValueChange={(value) =>
            updateFormData({ budgetRange: value as BudgetRange })
          }
          className="space-y-3"
        >
          {budgetRanges.map((range) => (
            <div
              key={range.value}
              className={`relative rounded-xl border-2 p-4 transition-all duration-200 cursor-pointer ${
                formData.budgetRange === range.value
                  ? 'border-[#FCBF28] bg-[#FCBF28]/5 shadow-md'
                  : 'border-gray-200 hover:border-[#FCBF28]/50 hover:shadow-sm'
              }`}
              onClick={() => updateFormData({ budgetRange: range.value })}
            >
              <div className="flex items-center gap-4">
                <RadioGroupItem value={range.value} id={range.value} />
                <div className="flex-1 flex items-center gap-3">
                  <span className="text-2xl">{range.icon}</span>
                  <div>
                    <Label
                      htmlFor={range.value}
                      className="font-semibold text-[#3d4654] cursor-pointer block"
                    >
                      {range.label}
                    </Label>
                    <p className="text-sm text-gray-600">{range.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>

        {/* Budget Feedback Messages */}
        {hasBudgetMismatch && (
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800">
                Based on your project scope, my estimated price range is{' '}
                <strong>
                  ${estimate.minPrice.toLocaleString()} - $
                  {estimate.maxPrice.toLocaleString()}
                </strong>
                . I&apos;d be happy to discuss how we can prioritize features to
                fit your budget, or we can explore a phased approach.
              </p>
            </div>
          </div>
        )}

        {isPremium && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-green-800">
                <strong>Excellent!</strong> I&apos;d love to discuss your
                premium project needs in detail. We&apos;ll ensure you get the
                best architecture, design, and long-term support.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Ideal Launch Date */}
      <div className="mb-8">
        <Label
          htmlFor="idealLaunchDate"
          className="text-lg font-semibold text-[#3d4654] mb-3 block"
        >
          When would you ideally like to launch?
        </Label>
        <p className="text-sm text-gray-600 mb-4">
          This helps me plan my development pipeline and ensure I can meet your
          timeline.
        </p>
        <div className="relative max-w-md">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="idealLaunchDate"
            type="date"
            value={formData.idealLaunchDate}
            onChange={(e) =>
              updateFormData({ idealLaunchDate: e.target.value })
            }
            className="pl-10 h-12 text-base"
            placeholder="Select a date"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline" size="lg">
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!formData.budgetRange || !formData.idealLaunchDate}
          size="lg"
          className="bg-[#3d4654] hover:bg-[#2d3644] text-white"
        >
          Calculate Estimate
        </Button>
      </div>
    </div>
  )
}
