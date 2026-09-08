import React from 'react';
import { motion } from 'framer-motion';

interface AudioWaveIndicatorProps {
  isSpeaking: boolean;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AudioWaveIndicator: React.FC<AudioWaveIndicatorProps> = ({
  isSpeaking,
  color = 'bg-[#823CEB]',
  size = 'md',
  className = ''
}) => {
  const barHeights = {
    sm: 'h-3 w-0.5',
    md: 'h-4 w-1',
    lg: 'h-6 w-1.5'
  };

  const heights = barHeights[size] || barHeights.md;

  if (!isSpeaking) {
    return (
      <div className={`flex items-center gap-0.5 opacity-40 ${className}`} title="Audio listo">
        <span className={`${heights} ${color} rounded-full opacity-50`} />
        <span className={`${heights} ${color} rounded-full opacity-70`} />
        <span className={`${heights} ${color} rounded-full opacity-50`} />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1 ${className}`} title="Hablando...">
      {[0.4, 0.8, 0.5, 0.9].map((_, i) => (
        <motion.span
          key={i}
          className={`${heights} ${color} rounded-full shadow-sm`}
          animate={{
            scaleY: [0.3, 1.2, 0.4, 1.0, 0.3],
            opacity: [0.7, 1, 0.8, 1, 0.7]
          }}
          transition={{
            repeat: Infinity,
            duration: 0.65 + i * 0.12,
            ease: 'easeInOut',
            delay: i * 0.1
          }}
        />
      ))}
    </div>
  );
};
