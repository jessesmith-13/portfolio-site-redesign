import React from 'react'
import { FormData } from './EstimateForm'
import { Button } from '../ui/Button'
import Input from '../ui/Input'
import Textarea from '../ui/TextArea'
import { Label } from '../ui/label'
import { ArrowRight, ArrowLeft } from 'lucide-react'

interface LeadCaptureProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  onSubmit: () => void
  onBack: () => void
}

export function LeadCapture({
  formData,
  updateFormData,
  onSubmit,
  onBack,
}: LeadCaptureProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      formData.name &&
      formData.email &&
      formData.targetAudience &&
      formData.goals
    ) {
      onSubmit()
    }
  }

  const isValid =
    formData.name && formData.email && formData.targetAudience && formData.goals

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#3d4654] mb-3">
              Let&apos;s Make This Happen
            </h2>
            <p className="text-gray-600 text-lg">
              Share your details to receive your personalized estimate
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <Label
                htmlFor="name"
                className="text-base font-semibold text-[#3d4654] mb-2 block"
              >
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData({ name: e.target.value })}
                placeholder="John Doe"
                className="h-12 text-base"
                required
              />
            </div>

            {/* Email */}
            <div>
              <Label
                htmlFor="email"
                className="text-base font-semibold text-[#3d4654] mb-2 block"
              >
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData({ email: e.target.value })}
                placeholder="john@example.com"
                className="h-12 text-base"
                required
              />
            </div>

            {/* Company */}
            <div>
              <Label
                htmlFor="company"
                className="text-base font-semibold text-[#3d4654] mb-2 block"
              >
                Company (Optional)
              </Label>
              <Input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => updateFormData({ company: e.target.value })}
                placeholder="Acme Inc."
                className="h-12 text-base"
              />
            </div>

            {/* Current Website URL */}
            <div>
              <Label
                htmlFor="currentWebsiteUrl"
                className="text-base font-semibold text-[#3d4654] mb-2 block"
              >
                Current Website URL (Optional)
              </Label>
              <Input
                id="currentWebsiteUrl"
                type="url"
                value={formData.currentWebsiteUrl}
                onChange={(e) =>
                  updateFormData({ currentWebsiteUrl: e.target.value })
                }
                placeholder="https://example.com"
                className="h-12 text-base"
              />
              <p className="text-sm text-gray-500 mt-2">
                If you have an existing website, this helps me understand your
                current setup
              </p>
            </div>

            {/* Target Audience */}
            <div>
              <Label
                htmlFor="targetAudience"
                className="text-base font-semibold text-[#3d4654] mb-2 block"
              >
                Who are your customers? *
              </Label>
              <Input
                id="targetAudience"
                type="text"
                value={formData.targetAudience}
                onChange={(e) =>
                  updateFormData({ targetAudience: e.target.value })
                }
                placeholder="e.g., Small business owners looking to modernize their operations"
                className="h-12 text-base"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                A one-sentence description helps me understand your audience
              </p>
            </div>

            {/* Goals */}
            <div>
              <Label
                htmlFor="goals"
                className="text-base font-semibold text-[#3d4654] mb-2 block"
              >
                Project Goals *
              </Label>
              <Textarea
                id="goals"
                value={formData.goals}
                onChange={(e) => updateFormData({ goals: e.target.value })}
                placeholder="Tell me about your project goals and what you're hoping to achieve..."
                className="min-h-32 text-base"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                Share any additional details that will help me understand your
                vision
              </p>
            </div>

            {/* Privacy Notice */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                🔒 Your information is secure and will only be used to send you
                a personalized estimate. I&apos;ll never share your details with
                third parties.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="button"
                onClick={onBack}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                <ArrowLeft className="mr-2 w-5 h-5" />
                Back to Estimate
              </Button>
              <Button
                type="submit"
                disabled={!isValid}
                size="lg"
                className="flex-1 bg-[#FCBF28] hover:bg-[#e5ab1a] text-[#3d4654] font-semibold group"
              >
                Send My Estimate
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
