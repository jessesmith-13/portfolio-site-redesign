import React from 'react'
import { Button } from '../ui/Button'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

interface EstimateHeroProps {
  onStart: () => void
}

export function EstimateHero({ onStart }: EstimateHeroProps) {
  const benefits = [
    'Instant pricing estimate',
    'No obligation required',
    'Customized to your needs',
    'Get results in under 2 minutes',
  ]

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-[#3d4654] via-[#4a5568] to-[#3d4654] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FCBF28] rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#ff6b9d] rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-[#FCBF28] rounded-full animate-pulse"></span>
            <span className="text-sm">Free Project Estimate</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Get a Project Estimate
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
            Answer a few quick questions and receive an instant investment
            range.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-white/90 bg-white/5 backdrop-blur-sm rounded-lg p-4"
              >
                <CheckCircle2 className="w-5 h-5 text-[#FCBF28] flex-shrink-0" />
                <span className="text-left">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            onClick={onStart}
            size="lg"
            className="bg-[#FCBF28] hover:bg-[#e5ab1a] text-[#3d4654] font-semibold text-lg px-8 py-6 h-auto group"
          >
            Start Estimate
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Trust indicator */}
          <p className="text-white/60 text-sm mt-8">
            No credit card required • Takes less than 2 minutes
          </p>
        </div>
      </div>
    </section>
  )
}
