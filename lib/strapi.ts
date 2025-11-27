// Strapi API utilities

import type {
  StrapiResponse,
  StrapiEntity,
  Project,
  TechnologyCategory,
  Profile,
} from '../types/strapi.ts';

// Configure your Strapi URL here
// For Vite/React, you can use import.meta.env.VITE_STRAPI_URL
// For Next.js, use process.env.NEXT_PUBLIC_STRAPI_URL
const STRAPI_URL = typeof import.meta !== 'undefined' && process.env.NEXT_PUBLIC_STRAPI_URL
  ? process.env.NEXT_PUBLIC_STRAPI_URL
  : '';
const STRAPI_API_TOKEN = typeof import.meta !== 'undefined' && process.env.NEXT_PUBLIC_STRAPI_URL
  ? process.env.NEXT_PUBLIC_STRAPI_URL
  : '';

// Flag to check if Strapi is configured
const isStrapiConfigured = Boolean(STRAPI_URL);

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

/**
 * Generic fetch function for Strapi API
 */
async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;

  // Build query string
  const queryString = params
    ? '?' +
      Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&')
    : '';

  const url = `${STRAPI_URL}/api${endpoint}${queryString}`;

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Add authorization header if token is available
  if (STRAPI_API_TOKEN) {
    defaultHeaders['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      ...defaultHeaders,
      ...fetchOptions.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get all projects from Strapi
 */
export async function getProjects(): Promise<StrapiEntity<Project>[]> {
  if (!isStrapiConfigured) {
    // Strapi not configured - will use mock data
    return [];
  }
  
  try {
    const response = await fetchAPI<StrapiResponse<StrapiEntity<Project>[]>>(
      '/projects',
      {
        params: {
          'populate': '*',
          'sort': 'order:asc',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching projects from Strapi:', error);
    return [];
  }
}

/**
 * Get featured projects only
 */
export async function getFeaturedProjects(): Promise<StrapiEntity<Project>[]> {
  if (!isStrapiConfigured) {
    return [];
  }
  
  try {
    const response = await fetchAPI<StrapiResponse<StrapiEntity<Project>[]>>(
      '/projects',
      {
        params: {
          'populate': '*',
          'filters[featured][$eq]': true,
          'sort': 'order:asc',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching featured projects from Strapi:', error);
    return [];
  }
}

/**
 * Get a single project by ID
 */
export async function getProject(id: number): Promise<StrapiEntity<Project> | null> {
  if (!isStrapiConfigured) {
    return null;
  }
  
  try {
    const response = await fetchAPI<StrapiResponse<StrapiEntity<Project>>>(
      `/projects/${id}`,
      {
        params: {
          'populate': '*',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching project ${id} from Strapi:`, error);
    return null;
  }
}

/**
 * Get technology categories
 */
export async function getTechnologyCategories(): Promise<
  StrapiEntity<TechnologyCategory>[]
> {
  if (!isStrapiConfigured) {
    return [];
  }
  
  try {
    const response = await fetchAPI<
      StrapiResponse<StrapiEntity<TechnologyCategory>[]>
    >('/technology-categories', {
      params: {
        'sort': 'order:asc',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching technology categories from Strapi:', error);
    return [];
  }
}

/**
 * Get profile/about information
 */
export async function getAbout(): Promise<StrapiEntity<Profile> | null> {
  if (!isStrapiConfigured) {
    return null;
  }
  
  try {
    const response = await fetchAPI<StrapiResponse<StrapiEntity<Profile>>>(
      '/profile',
      {
        params: {
          'populate': '*',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching profile from Strapi:', error);
    return null;
  }
}

/**
 * Helper function to get the full URL for a Strapi media file
 */
export function getStrapiMediaUrl(url: string | null | undefined): string {
  if (!url) return '';
  
  // If the URL is already absolute, return it
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Otherwise, prepend the Strapi URL
  return `${STRAPI_URL}${url}`;
}
