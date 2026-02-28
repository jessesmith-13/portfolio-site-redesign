import React from 'react'
import { FormData } from './EstimateForm'
import { Button } from '../ui/Button'
import { calculateEstimate } from '../../../lib/estimateCalculator'
import {
  CheckCircle2,
  Clock,
  TrendingUp,
  AlertCircle,
  ArrowRight,
} from 'lucide-react'

interface ResultScreenProps {
  formData: FormData
  onNext: () => void
  onBack: () => void
}

export function ResultScreen({ formData, onNext, onBack }: ResultScreenProps) {
  const estimate = calculateEstimate(formData)

  const getConfidenceColor = (level: string) => {
    switch (level) {
      case 'High':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'Medium':
        return 'text-amber-600 bg-amber-50 border-amber-200'
      case 'Low':
        return 'text-orange-600 bg-orange-50 border-orange-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#3d4654] to-[#2d3644] p-8 md:p-12 text-white text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FCBF28] rounded-full mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#3d4654]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Your Project Estimate
            </h2>
            <p className="text-white/80">
              Here&apos;s what we calculated based on your requirements
            </p>
          </div>

          {/* Price Range */}
          <div className="p-8 md:p-12 text-center border-b border-gray-200">
            <p className="text-gray-600 mb-2">Estimated Investment</p>
            <div className="text-5xl md:text-6xl font-bold text-[#3d4654] mb-4">
              ${estimate.minPrice.toLocaleString()} – $
              {estimate.maxPrice.toLocaleString()}
            </div>
            {formData.projectType === 'retainer' && (
              <p className="text-gray-600">per month</p>
            )}
          </div>

          {/* Details Grid */}
          <div className="p-8 md:p-12 grid md:grid-cols-2 gap-6">
            {/* Timeline */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#3d4654] flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#FCBF28]" />
                </div>
                <h3 className="text-lg font-semibold text-[#3d4654]">
                  Timeline
                </h3>
              </div>
              <p className="text-2xl font-bold text-[#3d4654]">
                {estimate.timeline}
              </p>
            </div>

            {/* Confidence */}
            <div
              className={`rounded-xl p-6 border-2 ${getConfidenceColor(estimate.confidence)}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold">Confidence</h3>
              </div>
              <p className="text-2xl font-bold">{estimate.confidence}</p>
              <p className="text-sm mt-2 opacity-80">
                {estimate.confidenceNote}
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="p-8 md:p-12 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-[#3d4654] mb-4">
              Project Summary
            </h3>
            <div className="space-y-3">
              {estimate.summary.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FCBF28] flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-8 md:p-12 bg-gray-50 border-t border-gray-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Note:</strong> This is an automated estimate based on
                  your selections. Final proposal will be provided after a
                  15-minute scoping call where we can discuss your specific
                  needs and requirements.
                </p>
                <p className="text-sm text-gray-600">
                  Price ranges account for project complexity and refinement
                  during discovery.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-8 md:p-12 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onBack}
              variant="outline"
              size="lg"
              className="flex-1 py-4 h-auto"
            >
              Adjust Selections
            </Button>
            <Button
              onClick={onNext}
              size="lg"
              className="flex-1 bg-[#FCBF28] hover:bg-[#e5ab1a] text-[#3d4654] font-semibold group py-4 h-auto"
            >
              Get Final Proposal
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
