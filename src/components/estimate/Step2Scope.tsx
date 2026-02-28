import React from 'react'
import { FormData } from './EstimateForm'
import { Button } from '../ui/Button'
import { Slider } from '../ui/slider'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'

interface Step2Props {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

export function Step2Scope({
  formData,
  updateFormData,
  onNext,
  onBack,
}: Step2Props) {
  const isWebApp = formData.projectType === 'webapp'
  const isRetainer = formData.projectType === 'retainer'
  const isLanding = formData.projectType === 'landing'
  const isMarketing = formData.projectType === 'marketing'
  const isEcommerce = formData.projectType === 'ecommerce'

  // Determine slider min/max based on project type
  const getPageSliderConfig = () => {
    if (isMarketing) {
      return { min: 3, max: 8, default: 5 }
    } else if (isEcommerce) {
      return { min: 5, max: 20, default: 8 }
    } else {
      return { min: 1, max: 12, default: 5 }
    }
  }

  const pageConfig = getPageSliderConfig()

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-[#3d4654] mb-3">
          Define your project scope
        </h3>
        <p className="text-gray-600">
          Help us understand the size and complexity
        </p>
      </div>

      <div className="space-y-8 mb-8">
        {/* Pages/Screens Slider */}
        {!isRetainer && !isLanding && (
          <div>
            <Label className="text-lg font-semibold text-[#3d4654] mb-4 block">
              {isWebApp ? 'Number of Screens' : 'Number of Pages'}
            </Label>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">
                  {isWebApp ? 'Screens' : 'Pages'}
                </span>
                <span className="text-2xl font-bold text-[#3d4654]">
                  {isWebApp ? formData.screenCount : formData.pageCount}
                </span>
              </div>
              <Slider
                value={[isWebApp ? formData.screenCount : formData.pageCount]}
                onValueChange={([value]) => {
                  if (isWebApp) {
                    updateFormData({ screenCount: value })
                  } else {
                    updateFormData({ pageCount: value })
                  }
                }}
                min={isWebApp ? 3 : pageConfig.min}
                max={isWebApp ? 25 : pageConfig.max}
                step={1}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{isWebApp ? '3' : pageConfig.min}</span>
                <span>{isWebApp ? '25' : pageConfig.max}</span>
              </div>
            </div>
          </div>
        )}

        {/* Landing Page Notice (if landing page is selected) */}
        {isLanding && (
          <div className="bg-[#FCBF28]/10 border border-[#FCBF28] rounded-lg p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FCBF28] flex items-center justify-center flex-shrink-0">
                <span className="text-[#3d4654] font-bold text-lg">1</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#3d4654] mb-1">
                  Single Page Project
                </h4>
                <p className="text-sm text-gray-600">
                  Your landing page will be optimized as a single,
                  high-converting page.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Content Ready Toggle */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label
                htmlFor="content-ready"
                className="text-lg font-semibold text-[#3d4654] mb-1 block cursor-pointer"
              >
                Content Status
              </Label>
              <p className="text-sm text-gray-600">
                {formData.contentReady
                  ? 'Content is ready to go'
                  : 'Need professional copywriting'}
              </p>
            </div>
            <Switch
              id="content-ready"
              checked={formData.contentReady}
              onCheckedChange={(checked) =>
                updateFormData({ contentReady: checked })
              }
            />
          </div>
        </div>

        {/* Design Ready Toggle */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label
                htmlFor="design-ready"
                className="text-lg font-semibold text-[#3d4654] mb-1 block cursor-pointer"
              >
                Design Status
              </Label>
              <p className="text-sm text-gray-600">
                {formData.designReady
                  ? 'Design files are ready'
                  : 'Need custom design work'}
              </p>
            </div>
            <Switch
              id="design-ready"
              checked={formData.designReady}
              onCheckedChange={(checked) =>
                updateFormData({ designReady: checked })
              }
            />
          </div>
        </div>

        {/* CMS Toggle */}
        {!isRetainer && (
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label
                  htmlFor="needs-cms"
                  className="text-lg font-semibold text-[#3d4654] mb-1 block cursor-pointer"
                >
                  Content Management System
                </Label>
                <p className="text-sm text-gray-600">
                  Allow you to update content without a developer
                </p>
              </div>
              <Switch
                id="needs-cms"
                checked={formData.needsCMS}
                onCheckedChange={(checked) =>
                  updateFormData({ needsCMS: checked })
                }
              />
            </div>
          </div>
        )}
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
