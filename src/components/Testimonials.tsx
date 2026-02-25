'use client'

import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Testimonial {
  name: string
  role: string
  company: string
  quote: string
}
interface TestimonialsProps {
  data: {
    testimonials: Testimonial[]
  }
}

export function Testimonials({ data }: TestimonialsProps) {
  const { testimonials } = data

  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayedWords, setDisplayedWords] = useState<string[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  // Smooth word-by-word fade-in effect
  useEffect(() => {
    if (testimonials.length === 0) return

    const currentTestimonial = testimonials[currentIndex]
    const words = currentTestimonial.quote.split(' ')
    setDisplayedWords([])
    setIsAnimating(true)

    let wordIndex = 0
    const fadeSpeed = 60 // milliseconds per word

    const fadeInterval = setInterval(() => {
      if (wordIndex < words.length) {
        setDisplayedWords(words.slice(0, wordIndex + 1))
        wordIndex++
      } else {
        setIsAnimating(false)
        clearInterval(fadeInterval)
      }
    }, fadeSpeed)

    return () => clearInterval(fadeInterval)
  }, [currentIndex])

  // Auto-cycle through testimonials
  useEffect(() => {
    if (testimonials.length === 0 || isAnimating) return

    const pauseDuration = 4000 // 4 seconds after animation completes
    const cycleTimeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, pauseDuration)

    return () => clearTimeout(cycleTimeout)
  }, [isAnimating, testimonials.length])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    )
  }

  const goToSlide = (index: number) => {
    if (index === currentIndex) return
    setCurrentIndex(index)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section
      id="testimonials"
      className="min-h-screen bg-[#7A95A8] py-16 sm:py-20 lg:py-24 flex items-center snap-start snap-always"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-4 tracking-wide">
            TESTIMONIALS
          </h2>
          <div className="w-24 h-1 bg-white/40 mx-auto"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Main Testimonial Display */}
          <div className="relative min-h-[400px] sm:min-h-[350px] flex flex-col justify-center">
            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-200 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-200 hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            {/* Testimonial Content - No Card Background */}
            <div className="px-8 sm:px-16 text-center">
              {/* Quote with Smooth Word Fade-In Effect */}
              <p className="text-white text-2xl sm:text-3xl lg:text-4xl leading-relaxed mb-12 sm:mb-16 italic min-h-[200px] sm:min-h-[180px] flex items-center justify-center">
                <span className="inline">
                  {displayedWords.map((word, index) => (
                    <span
                      key={`${currentIndex}-${index}`}
                      className="animate-wordFadeIn inline-block mr-[0.3em]"
                      style={{
                        animationDelay: '0ms',
                        animationFillMode: 'both',
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              </p>

              {/* Author Info - Only show after animation is complete */}
              <div
                className={`transition-opacity duration-700 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
              >
                <h4 className="text-white text-xl sm:text-2xl mb-2">
                  {currentTestimonial.name}
                </h4>
                <p className="text-white/80 text-base sm:text-lg">
                  {currentTestimonial.role} at {currentTestimonial.company}
                </p>
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center items-center space-x-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-3 bg-white'
                    : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="text-center mt-4 text-white/60 text-sm">
            {currentIndex + 1} / {testimonials.length}
          </div>
        </div>
      </div>
    </section>
  )
}
