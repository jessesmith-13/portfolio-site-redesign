// app/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 60; // optional: ISR, regenerate every 60 seconds

import Header from '../components/Header';
import Hero from '@/components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Technologies from '../components/Technologies';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
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
    image: {
      url: string;
      alternativeText: string; // ❌ too strict
    }
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

async function getHeader(): Promise<StrapiHeader | null> {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  if (!baseUrl) {
    console.error("❌ NEXT_PUBLIC_STRAPI_URL is not defined");
    return null;
  }

  const url = `${baseUrl}/api/header?populate[logo][populate]=*&populate[navLinks]=*&cb=${Date.now()}`;

  try {
    const res = await fetch(url, {
      cache: "no-store", // prevents Vercel from caching stale failures
      next: { revalidate: 30 }, // allows Strapi warmups after cold starts
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Strapi responded with error:", res.status, text);
      return null;
    }

    const json = await res.json();

    if (!json?.data) {
      console.error("❌ Strapi response did not include .data:", json);
      return null;
    }

    return json.data;
  } catch (err) {
    console.error("❌ Failed to fetch header from Strapi:", err);
    return null; // prevents build crash!
  }
}

async function getHome(): Promise<Home | null> {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  if (!baseUrl) {
    console.error("❌ NEXT_PUBLIC_STRAPI_URL is not defined");
    return null;
  }

  const url = `${baseUrl}/api/home?${query}`;

  try {
    const res = await fetch(url, {
      cache: "no-store",             // avoid stale build errors
      next: { revalidate: 30 },      // optional: helps with cold starts
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Strapi responded with error (home):", res.status, text);
      return null;
    }

    const json = await res.json();

    if (!json?.data) {
      console.error("❌ Strapi home missing .data:", json);
      return null;
    }

    return json.data;
  } catch (err) {
    console.error("❌ Failed to fetch home from Strapi:", err);
    return null;
  }
}


export default async function HomePage() {

  const header = await getHeader();
  const home = await getHome();
  const blocks = home?.blocks ?? [];
  
  return (
    <div className="min-h-screen">
        {header &&
           <Header
            logo={header.logo}
            navLinks={header.navLinks}
          /> 
        }
      <main className="md:snap-y md:snap-mandatory overflow-y-scroll h-screen">
        {blocks.map((block: Block) => {
            const Component = componentMap[block.__component];
            if (!Component) return null;
            const uniqueKey = `${block.__component}-${block.id}`;
            return <Component key={uniqueKey} data={block} />;
          })}
      </main>
        <Footer/>
    </div>
  );
}
