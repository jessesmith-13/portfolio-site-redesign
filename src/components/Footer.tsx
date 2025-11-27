import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#3d4654] text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Copyright */}
          <p className="text-sm text-gray-300 flex items-center space-x-2">
            <span>© {currentYear} Jesse Smith</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-[#EFADAD] fill-current" />
              <span>and React</span>
            </span>
          </p>

          {/* Tech Stack Note */}
          <p className="text-xs text-gray-400">
            Powered by React, TypeScript, Tailwind CSS & Strapi
          </p>
        </div>
      </div>
    </footer>
  );
}
