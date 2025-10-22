// app/page.tsx
export const revalidate = 60; // optional: ISR, regenerate every 60 seconds

import Header from '../components/Header';
import About from '../components/About';
import Project from '../components/Project';
import Technology from '../components/Technology';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

// Type definitions for Strapi response
interface HomeAttributes {
  Heading: string; // matches your Strapi field exactly
}

interface StrapiResponse {
  data: {
    id: number;
    Heading: string;
  };
}

interface Header {
  id: number;
  documentId: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface About {
  id: number;
  documentId: string;
  Title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Projects {
  data: Project[]
}

interface Project {
  id: number;
  documentId: string;
  heading: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Technologies {
  data: Technology[]
}

interface Technology {
  id: number;
  documentId: string;
  heading: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Contact {
  id: number;
  documentId: string;
  heading: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Footer {
  id: number;
  documentId: string;
  heading: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

async function getHeader(): Promise<Header> {
  const res = await fetch('http://localhost:1337/api/header');
  if (!res.ok) throw new Error('Failed to fetch header');
  const data = await res.json();
  return data.data; // direct, no attributes
}

async function getHome(): Promise<HomeAttributes> {
  const res = await fetch('http://localhost:1337/api/home');
  if (!res.ok) {
    throw new Error('Failed to fetch home');
  }
  const data: StrapiResponse = await res.json();
  return data.data; // now has .Heading
}

async function getAbout(): Promise<About> {
  const res = await fetch('http://localhost:1337/api/about');
  if (!res.ok) throw new Error('Failed to fetch about');
  const data = await res.json();
  return data.data; // direct, no attributes
}

async function getProjects(): Promise<Project[]> {
  const res = await fetch('http://localhost:1337/api/projects', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }

  const data: Projects = await res.json();
  return data.data; // returns array of projects
}

async function getTechnologies(): Promise<Project[]> {
  const res = await fetch('http://localhost:1337/api/technologies', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch technologies');
  }

  const data: Technologies = await res.json();
  return data.data; // returns array of technologies
}

async function getContact(): Promise<Contact> {
  const res = await fetch('http://localhost:1337/api/contact');
  if (!res.ok) throw new Error('Failed to fetch contact');
  const data = await res.json();
  return data.data; // direct, no attributes
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
  const about = await getAbout();
  const projects = await getProjects();
  const technologies = await getTechnologies();
  const contact = await getContact();
  const footer = await getFooter();
  
  return (
    <main>
      <Header
        logo={header.logo}
      >

      </Header>
      <ul>
        {home.Heading && (
        <section style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          <h2>About Me</h2>
          <p>{home.Heading}</p>
        </section>
        )}
      </ul>
      <About
        Title={about.Title}
      >
      </About>
      {projects.map((project) => (
        <Project
          heading={project.heading}
          key={project.id}
        >

        </Project>
      ))}
      {technologies.map((technology) => (
        <Technology
          heading={technology.heading}
          key={technology.id}
        >

        </Technology>
      ))}
      <Contact
        heading={contact.heading}
      >

      </Contact>
      <Footer
        heading={footer.heading}
      >

      </Footer>
    </main>
  );
}
