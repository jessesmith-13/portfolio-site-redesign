import React from 'react'
import { FormData } from './EstimateForm'
import { Button } from '../ui/Button'
import { CheckCircle2, Calendar, Mail, Home } from 'lucide-react'

interface ConfirmationScreenProps {
  formData: FormData
  onRestart: () => void
}

export function ConfirmationScreen({
  formData,
  onRestart,
}: ConfirmationScreenProps) {
  return (
    <div className="bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-br from-[#3d4654] to-[#2d3644] p-8 md:p-12 text-center text-white">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FCBF28] rounded-full mb-6 animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-[#3d4654]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Estimate Sent Successfully!
            </h2>
            <p className="text-white/90 text-lg">
              Check your inbox at <strong>{formData.email}</strong>
            </p>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            <div className="space-y-6 mb-8">
              {/* What's Next */}
              <div>
                <h3 className="text-2xl font-bold text-[#3d4654] mb-4">
                  What&apos;s Next?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 bg-gray-50 rounded-lg p-5">
                    <div className="w-10 h-10 rounded-full bg-[#FCBF28] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#3d4654]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#3d4654] mb-1">
                        1. Check Your Email
                      </h4>
                      <p className="text-gray-600 text-sm">
                        You&apos;ll receive a detailed summary of your
                        selections for reference.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-gray-50 rounded-lg p-5">
                    <div className="w-10 h-10 rounded-full bg-[#FCBF28] flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-[#3d4654]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#3d4654] mb-1">
                        2. I Review Your Project
                      </h4>
                      <p className="text-gray-600 text-sm">
                        I personally review each submission to refine scope,
                        assumptions, and feasibility.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-gray-50 rounded-lg p-5">
                    <div className="w-10 h-10 rounded-full bg-[#FCBF28] flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-[#3d4654]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#3d4654] mb-1">
                        3. Follow-Up Within 24 Hours
                      </h4>
                      <p className="text-gray-600 text-sm">
                        I&apos;ll reach out with clarifying questions and next
                        steps. If a quick call would help, we can schedule one
                        then.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <Button
                onClick={() => (window.location.href = '/')}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                <Home className="mr-2 w-5 h-5" />
                Back to Portfolio
              </Button>
              <Button
                onClick={onRestart}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                Get Another Estimate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
