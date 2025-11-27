interface Technology {
  text: string
}

interface TechnologyCard {
  title: string,
  technologies: Technology[]
}

interface TechnologiesProps {
  data: {
    technologyCards: TechnologyCard[],
    heading: string,
    subheading: string
  };
} 

import { Code2, Server, Rocket, Wrench } from 'lucide-react';

export default function Technologies({
  data
}: TechnologiesProps) {

  const {
    technologyCards,
    heading,
    subheading
  } = data;

  const categoryIcons = {
    'Front End': Code2,
    'Back End': Server,
    'Testing/Deployment': Rocket,
    'Dev Tools': Wrench,
  };

  const categoryColors = [
    { bg: '#FCBF28', hover: '#F5A623' }, // Gold
    { bg: '#C8E6A0', hover: '#B8D690' }, // Green
    { bg: '#7A95A8', hover: '#6A8598' }, // Blue
    { bg: '#F5C9C9', hover: '#EFADAD' }, // Pink
  ];

  return (
    <section id="technologies" className="min-h-screen bg-[#EFADAD] py-16 sm:py-20 lg:py-24 snap-start snap-always">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#3d4654] mb-4 tracking-wide">
            {heading.toUpperCase()}
          </h2>
          <p className="text-[#3d4654] max-w-2xl mx-auto opacity-80">
            {subheading}
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {technologyCards.map((category, index) => {
              const Icon = categoryIcons[category.title as keyof typeof categoryIcons] || Code2;
              const colors = categoryColors[index % categoryColors.length];
              
              return (
                <div
                  key={index}
                  className="rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
                  style={{ backgroundColor: colors.bg }}
                >
                  <div className="p-6 sm:p-8">
                    {/* Icon and Title */}
                    <div className="flex flex-col items-center mb-6">
                      <div className="p-4 rounded-full bg-white/30 backdrop-blur-sm mb-4 transition-transform duration-300 hover:scale-110">
                        <Icon className="w-8 h-8 text-[#3d4654]" />
                      </div>
                      <h3 className="text-xl sm:text-2xl text-[#3d4654] text-center tracking-wide">
                        {category.title}
                      </h3>
                    </div>

                    {/* Technologies List */}
                    <ul className="space-y-2.5">
                      {category.technologies.map((tech, techIndex) => (
                        <li
                          key={techIndex}
                          className="text-[#3d4654] text-center py-1.5 px-3 rounded-lg bg-white/20 backdrop-blur-sm transition-all duration-200 hover:bg-white/40 hover:scale-105"
                        >
                          {tech.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
