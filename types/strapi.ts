// TypeScript types for Strapi CMS data models

export interface StrapiImage {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string | null;
  url: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity<T> {
  id: number;
  attributes: T;
}

// Project model for Strapi
export interface Project {
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  image: {
    data: StrapiEntity<StrapiImage> | null;
  };
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  order?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Technology category model
export interface TechnologyCategory {
  name: string;
  technologies: string[];
  order?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Contact/Social Links model
export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
  order?: number;
}

// About/Profile model
export interface Profile {
  name: string;
  title: string;
  subtitle?: string;
  email?: string;
  profileImage: {
    data: StrapiEntity<StrapiImage> | null;
  };
  socialLinks?: SocialLink[];
  resumeUrl?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
