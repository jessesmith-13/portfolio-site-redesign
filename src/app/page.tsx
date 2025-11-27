// app/page.tsx
export const revalidate = 60; // optional: ISR, regenerate every 60 seconds

import Header from '../components/Header';
import Hero from '@/components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Technologies from '../components/Technologies';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import type { StrapiImage } from '../../types/strapi';
import qs from 'qs';

// Map Strapi block types to React components
const componentMap: Record<string, React.FC<any>> = {
  'blocks.hero-section': Hero,
  'blocks.about-section': About,
  'blocks.projects-section': Projects,
  'blocks.technologies-section': Technologies,
  'blocks.contact-section': Contact,
};

// Type definitions for Strapi response

interface Block {
  __component: string;
  id: number;
  [key: string]: unknown; // allows flexibility for all block fields
}

interface NavLink {
  order: number,
  id: number,
  label: string,
  href: string
}

interface StrapiHeader {
  id: number;
  documentId: string;
  logo: {
    image: StrapiImage
  };
  navLinks: NavLink[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Home {
  id: number;
  blocks: Block[];
}

interface Footer {
  id: number;
  documentId: string;
  heading: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

const query = qs.stringify(
  {
    populate: {
      blocks: {
        on: {
          "blocks.hero-section": {
            populate: {
              subtextWords: {
                fields: ["*"],
              },
            },
          },
          "blocks.about-section": {
            populate: {
              profileImage: {
                fields: ["*"]
              }
            }
          },
          "blocks.projects-section": {
            populate: {
              fields: ['*'],
              projectCards: {
                fields: ["*"],
                populate: {
                  projectImage: {
                    fields: ['*']
                  },
                  technologies: {
                    fields: ['*']
                  },
                  githubLink: {
                    fields: ['*']
                  },
                  projectLink: {
                    fields: ['*']
                  }
                }
              }
            }
          },
          "blocks.technologies-section": {
            populate: {
              technologyCards: {
                fields: ['*'],
                populate: {
                  technologies: {
                    fields: ['*']
                  }
                }
              }
            }
          },
          "blocks.contact-section": {
            populate: {
              fields: ['*']
            }
          }
        },
      },
    },
  },
  { encodeValuesOnly: true }
);

async function getHeader(): Promise<StrapiHeader> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/header?populate[logo][populate]=*&populate[navLinks]=*`);
  if (!res.ok) throw new Error('Failed to fetch header');
  const data = await res.json();
  return data.data; // direct, no attributes
}

async function getHome(): Promise<Home> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home?${query}`);
  if (!res.ok) {
    throw new Error('Failed to fetch home');
  }
  const data = await res.json();

  return data.data;
}

async function getFooter(): Promise<Footer> {
  const res = await fetch('http://localhost:1337/api/footer');
  if (!res.ok) throw new Error('Failed to fetch footer');
  const data = await res.json();
  return data.data; // direct, no attributes
}

export default async function HomePage() {

  const header = await getHeader();
  const home = await getHome();
  const footer = await getFooter();
  const blocks = home.blocks;
  
  return (
    <div className="min-h-screen">
        <Header
          logo={header.logo}
          navLinks={header.navLinks}
        />
      <main className="md:snap-y md:snap-mandatory overflow-y-scroll h-screen">
        {blocks.map((block: Block) => {
            const Component = componentMap[block.__component];
            if (!Component) return null;
            const uniqueKey = `${block.__component}-${block.id}`;
            return <Component key={uniqueKey} data={block} />;
          })}
      </main>
        <Footer
          heading={footer.heading}
        />
    </div>
  );
}
