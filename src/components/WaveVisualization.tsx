import React, { useEffect, useRef } from 'react';
import styles from './WaveVisualization.module.css';

interface WaveVisualizationProps {
  className?: string;
}

export default function WaveVisualization({ className = '' }: WaveVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = [
      { r: 252, g: 191, b: 40, alpha: 0.7 },   // Gold
      { r: 239, g: 173, b: 173, alpha: 0.7 },  // Pink
      { r: 200, g: 230, b: 160, alpha: 0.7 },  // Green
      { r: 122, g: 149, b: 168, alpha: 0.7 },  // Blue
      { r: 245, g: 166, b: 35, alpha: 0.7 },   // Gold dark
      { r: 245, g: 201, b: 201, alpha: 0.7 },  // Pink light
    ];

    const waves = colors.map((color, i) => ({
      color,
      amplitude: 40 + Math.random() * 60,
      frequency: 0.003 + Math.random() * 0.002,
      speed: 0.01 + Math.random() * 0.015,
      offset: Math.random() * Math.PI * 2,
      baseY: 0.3 + i * 0.12,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x <= canvas.width; x += 5) {
          const y =
            Math.sin(x * wave.frequency + time * wave.speed + wave.offset) *
              wave.amplitude +
            canvas.height * wave.baseY;
          
          if (x === 0) {
            ctx.lineTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();

        ctx.fillStyle = `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, ${wave.color.alpha})`;
        ctx.fill();
      });

      time += 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
