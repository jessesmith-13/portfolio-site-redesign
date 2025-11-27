'use client'
import React, { useState, useEffect } from 'react';
import WaveVisualization from './WaveVisualization';

interface Text {
  text: string;
}

interface HeroProps {
  data: {
    subtextWords: Text[]
  }
} 


export default function Hero({
  data
}: HeroProps) {

  const { subtextWords } = data;

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const currentWord = subtextWords[currentWordIndex].text;

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing forward
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
          setTypingSpeed(150);
        } else {
          // Finished typing, pause before deleting
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentWord.substring(0, currentText.length - 1));
          setTypingSpeed(100);
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % subtextWords.length);
          setTypingSpeed(500);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed, subtextWords]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden snap-start snap-always">
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#3d4654] mb-8 tracking-wide">
          <span className="opacity-60">&lt;h1&gt;</span>
          <span className="mx-2 sm:mx-4">JESSE SMITH</span>
          <span className="opacity-60">&lt;/h1&gt;</span>
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-[#3d4654] tracking-wider min-h-[2.5rem] flex items-center justify-center" style={{ fontFamily: 'Titillium Web, sans-serif' }}>
          {currentText}
          <span className="animate-pulse ml-1">|</span>
        </p>
      </div>

      {/* Wave Visualization */}
      <div className="absolute bottom-0 left-0 right-0 h-2/3 pointer-events-none">
        <WaveVisualization />
      </div>
    </section>
  );
}
