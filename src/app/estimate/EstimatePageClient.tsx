'use client'

import { useState } from 'react'
import { EstimateHero } from '@/components/estimate/EstimateHero'
import { EstimateForm } from '@/components/estimate/EstimateForm'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface NavLink {
  order: number
  id: number
  label: string
  href: string
}

interface StrapiHeader {
  id: number
  documentId: string
  logo: {
    image: {
      url: string
      alternativeText: string
    }
  }
  navLinks: NavLink[]
  createdAt: string
  updatedAt: string
  publishedAt: string
}

interface EstimatePageClientProps {
  header: StrapiHeader | null
}

export function EstimatePageClient({ header }: EstimatePageClientProps) {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {header && <Header logo={header.logo} navLinks={header.navLinks} />}
      {!showForm ? (
        <EstimateHero onStart={() => setShowForm(true)} />
      ) : (
        <EstimateForm />
      )}
      <Footer />
    </div>
  )
}
