import { EstimatePageClient } from './EstimatePageClient'

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

async function getHeader(): Promise<StrapiHeader | null> {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL

  if (!baseUrl) {
    console.error('❌ NEXT_PUBLIC_STRAPI_URL is not defined')
    return null
  }

  const url = `${baseUrl}/api/header?populate[logo][populate]=*&populate[navLinks]=*&cb=${Date.now()}`

  try {
    const res = await fetch(url, {
      cache: 'no-store',
      next: { revalidate: 30 },
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('❌ Strapi responded with error:', res.status, text)
      return null
    }

    const json = await res.json()

    if (!json?.data) {
      console.error('❌ Strapi response did not include .data:', json)
      return null
    }

    return json.data
  } catch (err) {
    console.error('❌ Failed to fetch header from Strapi:', err)
    return null
  }
}

export default async function EstimatePage() {
  const header = await getHeader()

  return <EstimatePageClient header={header} />
}
