/* eslint-disable @next/next/no-img-element */
'use client'

import { ExternalLink, Github } from 'lucide-react';
import type { StrapiImage } from '../../types/strapi';
import { ImageWithFallback } from '@/components/ImageWithFallback';

interface Technology {
  text: string
}

interface GithubLink {
  text: string,
  href: string,
}

interface ProjectCard {
  projectName: string,
  projectDescription: string,
  projectImage: StrapiImage,
  technologies: Technology[],
  githubLink: GithubLink,
  projectLink: GithubLink
  liveUrl: string
}

interface ProjectsProps {
  data: {
    projectCards: ProjectCard[],
    heading: string
  }
} 

export default function Projects({
  data
}: ProjectsProps) {
  const {
    projectCards,
    heading
  } = data;

  return (
    <section id="projects" className="min-h-screen bg-white py-16 sm:py-20 lg:py-24 snap-start snap-always">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#3d4654] mb-4 tracking-wide">
            {heading.toUpperCase()}
          </h2>
          <div className="w-24 h-1 bg-[#FCBF28] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto">
          {projectCards.map((project, index) => {


            return (
              <div
                key={index}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
              >
                {/* Project Image */}
                <div className="relative h-48 sm:h-56 bg-gradient-to-br from-[#FCBF28] to-[#EFADAD] overflow-hidden">
                  {project.projectImage ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${project.projectImage.url}`}
                      alt={project.projectName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop"
                      alt={project.projectName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl sm:text-2xl text-[#3d4654] mb-3">
                    {project.projectName}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-5">
                    {project.projectDescription}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#EFADAD] text-[#3d4654] rounded-full text-sm"
                      >
                        {tech.text}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex space-x-4">
                    {project.githubLink && (
                      <a
                        href={project.githubLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-[#7A95A8] hover:text-[#FCBF28] transition-colors duration-200"
                      >
                        <Github className="w-5 h-5 mr-1" />
                        {project.githubLink.text}
                      </a>
                    )}
                    {project.projectLink && (
                      <a
                        href={project.projectLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-[#7A95A8] hover:text-[#FCBF28] transition-colors duration-200"
                      >
                        <ExternalLink className="w-5 h-5 mr-1" />
                        {project.projectLink.text}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
