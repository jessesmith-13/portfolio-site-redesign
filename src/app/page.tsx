// app/page.tsx
export const revalidate = 60; // optional: ISR, regenerate every 60 seconds

import Header from '../components/Header';
import Hero from '@/components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Technologies from '../components/Technologies';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

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

interface StrapiHeader {
  id: number;
  documentId: string;
  logo: any;
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

async function getHeader(): Promise<StrapiHeader> {
  const res = await fetch('http://localhost:1337/api/header?populate=*');
  if (!res.ok) throw new Error('Failed to fetch header');
  const data = await res.json();
  return data.data; // direct, no attributes
}

async function getHome(): Promise<Home> {
  const res = await fetch('http://localhost:1337/api/home?populate=*');
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
  
  return (
    <main>
      <Header
        logo={header.logo}
        navLinks={header.navLinks}
      />
  
     {home.blocks.map((block: Block) => {
        const Component = componentMap[block.__component];
        if (!Component) return null;
        const uniqueKey = `${block.__component}-${block.id}`;
        return <Component key={uniqueKey} data={block} />;
      })}

      <Footer
        heading={footer.heading}
      />
    </main>
  );
}
