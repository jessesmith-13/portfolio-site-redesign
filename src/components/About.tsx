/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Twitter, Linkedin, Github, Code2 } from 'lucide-react';
import type { Profile, StrapiImage } from '../../types/strapi';


interface AboutProps {
  data: {
    aboutText: string,
    profileImage: StrapiImage,
  };
} 

// Mock data for development/demo
const profileData: Profile = {
  name: 'JESSE SMITH',
  title: 'FULL-STACK WEB DEVELOPER',
  email: 'hello@jessesmith.tech',
  profileImage: { data: null },
  socialLinks: [
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/jesselsmith713/', icon: 'linkedin' },
    { platform: 'GitHub', url: 'https://github.com/jessesmith-13', icon: 'github' },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  publishedAt: new Date().toISOString(),
};

export default function About({
  data
}: AboutProps) {
  const {
    aboutText,
    profileImage
  } = data;

  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const leftObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLeftVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const rightObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRightVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const currentLeftRef = leftRef.current;
    const currentRightRef = rightRef.current;

    if (currentLeftRef) {
      leftObserver.observe(currentLeftRef);
    }

    if (currentRightRef) {
      rightObserver.observe(currentRightRef);
    }

    return () => {
      if (currentLeftRef) {
        leftObserver.unobserve(currentLeftRef);
      }
      if (currentRightRef) {
        rightObserver.unobserve(currentRightRef);
      }
    };
  }, []);

  const socialIcons = {
    twitter: Twitter,
    linkedin: Linkedin,
    github: Github,
    stackoverflow: Code2,
  };

  return (
    <section id="about" className="min-h-screen flex items-center snap-start snap-always">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Profile Card */}
        <div 
          ref={leftRef}
          className={`bg-white flex items-center justify-center p-8 sm:p-12 lg:p-16 min-h-[50vh] lg:min-h-screen transition-all duration-1000 ease-out ${
            leftVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}
        >
          <div className="text-center max-w-md">
            <h2 className="text-2xl sm:text-3xl text-[#3d4654] mb-8 tracking-wide">
              {profileData.name}
            </h2>

            {/* Profile Image */}
            <div className="mb-8 flex justify-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden bg-[#C8E6A0] flex items-center justify-center">
                {profileImage ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${profileImage.url}`}
                    alt={profileData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#7A95A8] to-[#C8E6A0]" />
                )}
              </div>
            </div>

            {/* Title */}
            <p className="text-sm sm:text-base text-[#3d4654] mb-8 tracking-widest">
              {profileData.title}
            </p>

            {/* Social Icons */}
            <div className="flex justify-center space-x-6">
              {profileData.socialLinks?.map((link, index) => {
                const IconComponent = socialIcons[link.icon as keyof typeof socialIcons];
                return IconComponent ? (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7A95A8] hover:text-[#FCBF28] transition-colors duration-200"
                    aria-label={link.platform}
                  >
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                ) : null;
              })}
            </div>
          </div>
        </div>

        {/* Right Side - About Text */}
        <div 
          ref={rightRef}
          className={`bg-[#FCBF28] flex items-center justify-center p-8 sm:p-12 lg:p-16 min-h-[50vh] lg:min-h-screen transition-all duration-1000 ease-out ${
            rightVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}
        >
          <div className="max-w-2xl">
            <h3 className="text-3xl sm:text-4xl md:text-5xl text-white mb-8 tracking-wide">
              ABOUT
            </h3>
            <p className="text-white text-base sm:text-lg leading-relaxed">
              {aboutText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
